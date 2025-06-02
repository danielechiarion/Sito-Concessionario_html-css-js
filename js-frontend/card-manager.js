import User from '../js-backend/account/User.js';
import CarByID from '../js-backend/vehicle/CarByID.js';
import Showroom from '../js-backend/vehicle/Showroom.js';
import Car from '../js-backend/vehicle/Car.js';

let user = null;
let cards;
let showroom;

function manageShoppingCartButton(user, currentCar, button){
    if(user !== null && user.getShoppingCart().some(car => currentCar.equals(car)))
        button.classList.add("card-button-selected");
    else
        button.classList.remove("card-button-selected");

    button.addEventListener("click", () => {
        /* check if the user is logged */
        if(user === null){
            window.location.href = "login.html";
            return;
        }

        if(button.classList.contains("card-button-selected")) //continue only if the car hasn't been added
            return;

        /* then add the car to the shopping cart */
        button.classList.add("card-button-selected");
        currentCar.setQuantityAvailable(1);
        user.addToShoppingCart(currentCar);

        localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    });
}

function manageWishListButton(user, currentCar, button){
    if(user !== null && user.getWishList().some(car => currentCar.equals(car)))
        button.classList.add("card-button-selected");
    
    else
        button.classList.remove("card-button-selected");

    button.addEventListener("click", () => {
        /* check if the user is logged */
        if(user === null){
            window.location.href="login.html";
            return;
        }

        if(button.classList.contains("card-button-selected")) //continue only if the car hasn't been added
            return;

        /* then add the car to the wish-list */
        button.classList.add("card-button-selected");
        user.addWish(currentCar);

        localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    });
}

function manageRemoveWishButton(user, currentCar, button){
    /* if the button is clicked the car
    has to be removed from the list */
    button.addEventListener("click", () =>{
        user.removeWish(currentCar);
        localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
        location.reload();
    });
}

function manageRemoveShoppingCartButton(user, currentCar, button){
    /* if the button is clicked the car
    has to be removed from the list */
    button.addEventListener("click", () =>{
        user.removeFromShoppingCart(currentCar);
        localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
        location.reload();
    });
}

cards = Array.from(document.querySelectorAll(".car-card")); //get the cards to do the research
if(cards === null)
    throw new Error("no card found");

if(localStorage.getItem("loggedUser")!==null)
    user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));
showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

cards.forEach(card => {
    const cardID = parseInt(card.getAttribute("data-car-id"), 10);
    const carSearch = new CarByID(cardID); //get the car by the id
    const carList =  showroom.getCarList()
    const currentCar = carList[carList.findIndex(car => carSearch.equals(car))]; //get the car by the showroom

    /* if the card-details button is clicked, 
    the page where the botton was clicked in kept
    to go back after the page visit */
    card.querySelector(".btn-card-details").addEventListener("click", () => {
        localStorage.setItem("previousPage", window.location.href);
        localStorage.setItem("carDetails", JSON.stringify(currentCar.toJson()));
    });

    /* if there is a button to add the car to the shopping-cart,
    manage all the function, such as click and save the status */
    if(card.querySelector(".shopping-cart-button") !== null)
        manageShoppingCartButton(user, currentCar, card.querySelector(".shopping-cart-button"));
    /* do the same for the others */
    if(card.querySelector(".wish-list-button") !== null)
        manageWishListButton(user, currentCar, card.querySelector(".wish-list-button"));

    if(card.querySelector(".remove-wish-button") !== null)
        manageRemoveWishButton(user, currentCar, card.querySelector(".remove-wish-button"));
    if(card.querySelector(".remove-shopping-cart-button") !== null)
        manageRemoveShoppingCartButton(user, currentCar, card.querySelector(".remove-shopping-cart-button"));
});