import User from "../js-backend/account/User.js";
import CarByID from "../js-backend/vehicle/CarByID.js";
import Car from "../js-backend/vehicle/Car.js";
import Showroom from "../js-backend/vehicle/Showroom.js";

import * as TemplateParts from "./template-parts.js";

let user;
let shoppingCart;
let carRows;
let showroom;

function printShoppingCart(){
    document.getElementById("output-total-price").innerText = user.getShoppingCartPrice();
    if(user.getShoppingCart().length === 0){
        document.getElementById("shopping-cart-container").innerHTML = TemplateParts.getErrorMessage("Carrello acquisti vuoto. Continua la tua ricerca!");
        return;
    }

    const elements = user.getShoppingCart().map(car => TemplateParts.getCarCardShoppingCart(car));
    document.getElementById("shopping-cart-container").innerHTML = TemplateParts.getResultGridView(elements, 12, 6, 3);    
}

function printCarsTable(){
    if(user.getShoppingCart().length == 0)
        return;
    
    document.getElementById("table-container").innerHTML = TemplateParts.getTableShoppingCart(user.getShoppingCart());

    /* add graphic for color-picker */
    const colorPickers = Array.from(document.querySelectorAll(".color-picker"));

    colorPickers.forEach(row => {
        row.addEventListener("click", (event) => {
            const target = event.target;

            /* verify is the element is a color-option */
            if (target.classList.contains("color-option")) {
                const color = target.getAttribute("data-color");

                /* add or remove class select */
                if (target.classList.contains("color-option-clicked")) {
                    target.classList.remove("color-option-clicked");
                } else {
                    Array.from(row.querySelectorAll(".color-option")).forEach(colorInput => colorInput.classList.remove("color-option-clicked"));
                    target.classList.add("color-option-clicked");
                }
            }
        });
    });

    carRows = Array.from(document.querySelectorAll("table tbody tr")); //get the rows with the data of the cars

    /* change the price of the single car and the total price
    after changing the optionals */
    for(let i=0;i<carRows.length;i++){
        const optionals = Array.from(carRows[i].querySelectorAll(".car-optionals input"));
        for(let j = 0; j<optionals.length;j++){
            optionals[j].addEventListener("change", () => {
                shoppingCart[i].changeStatusOptional(j);
                user.setShoppingCart(shoppingCart);
                carRows[i].querySelector(".car-price").textContent = shoppingCart[i].getPrice();
                document.getElementById("output-total-price").innerText = user.getShoppingCartPrice();
            });
        }
    }
}

function buyCars(){
    if(shoppingCart.length == 0)
        return;

    for(let i=0;i<carRows.length;i++){
        /* look to a new color and check if it's available */
        const colorPicker = carRows[i].querySelector(".color-option-clicked");
        const index = showroom.getCarList().findIndex(car => car.equals(shoppingCart[i]));
        if(colorPicker === null){
            document.getElementById("buy-message").innerHTML = TemplateParts.getErrorMessage("Auto #"+(i+1)+": devi scegliere almeno un colore");
            return;
        }

        shoppingCart[i].setColor(colorPicker.dataset.color); //set a new color to the car
        console.log(colorPicker.dataset.color);

        /* input of the car number and
        check it's not over the quantity available */
        const quantityAvailable = showroom.getCarList()[index].getQuantityAvailable();
        const quantityInput = parseInt(carRows[i].querySelector(".input-car-quantity").value);
        if(quantityInput === "" || quantityInput<1)
            quantityInput = 1;
        if(quantityInput>quantityAvailable){
            document.getElementById("buy-message").innerHTML = TemplateParts.getErrorMessage("Auto #"+(i+1)+": il massimo disponibile è "+quantityAvailable);
            return;
        }

        shoppingCart[i].setQuantityAvailable(quantityInput);
    }

    /* set the user shopping cart and complete the purchase */
    user.setShoppingCart(shoppingCart);
    user.purchaseCars();
    showroom.purchaseCars(shoppingCart); //update the showroom with the new cars purchased
    
    /* save the data into the local storage and
    return the messages */
    localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    showroom.saveToLocalStorage();
    document.getElementById("buy-message").innerHTML = TemplateParts.getSuccessMessage("Acquisto completato");
    setTimeout(() => {
        location.reload();
    }, 5000);
}

function emptyShoppingCart(){
    if(shoppingCart.length === 0)
        return;

    user.emptyShoppingCart();
    localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    location.reload();
}

/* first check if the user is available */
if(localStorage.getItem("loggedUser") === null)
    window.location.href = "login.html";

/* otherwise read the user */
user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));
shoppingCart = user.getShoppingCart();
showroom = Showroom.loadFromLocalStorage(); //load showroom to check quantity available for cars

printShoppingCart();
printCarsTable();

/* add event listeners for buttons */
document.getElementById("input-buy").addEventListener("click", buyCars);
document.getElementById("input-empty").addEventListener("click", emptyShoppingCart);
