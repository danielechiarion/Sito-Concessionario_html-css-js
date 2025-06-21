import * as CarDetailsTools from './car-details_tools.js';
import * as TemplateParts from './template-parts.js';

import Car from '../js-backend/vehicle/Car.js';
import User from '../js-backend/account/User.js';

let car;
let user;

function printCarDetails(){
    document.getElementById("brand-name").innerText = car.getBrand().getName();
    document.getElementById("model").innerText = car.getModel();
    document.getElementById("power").innerText = car.getMinPower();
    document.getElementById("price").innerText = car.getInitialValue();
    document.getElementById("quantity-available").innerText = car.getQuantityAvailable();
    document.getElementById("engine").innerHTML = car.getEngine();
    document.getElementById("engine-autonomy").innerText = car.getEngineAutonomy();
    document.getElementById("colors-available").innerHTML = TemplateParts.getColorPicker(car.getColorsAvailable());
    document.getElementById("seats").innerText = car.getSeats();
    document.getElementById("doors").innerText = car.getDoorsNumber();
    document.getElementById("car-type").innerText = car.getType();
    document.getElementById("optionals-available").innerHTML = TemplateParts.getUL(car.getOptionalList().map(optional => optional.getName()));
}

function manageShoppingCartButton(){
    const button = document.getElementById("shopping-cart-button"); //find the button

    if(user!==null && user.getShoppingCart()!= null && user.getShoppingCart().some(currentCar => car.equals(currentCar))){
        button.classList.add("command-button-selected");
        document.getElementById("shopping-cart-button-text").innerText = "Aggiunto al carrello"
    }else{
        button.classList.remove("command-button-selected");
        document.getElementById("shopping-cart-button-text").innerText = "Aggiungi al carrello";
    }

    button.addEventListener("click", () => {
        if(user === null)
            window.location.href = "../pages/login.html";
        if(button.classList.contains("command-button-selected"))
            return;

        user.addToShoppingCart(car);
        localStorage.setItem('loggedUser', JSON.stringify(user.toJson()));
    });
}

function manageWishListButton(){
    const button = document.getElementById("wish-list-button"); //find the button

    if(user !== null && user.getWishList().length !== 0 && user.getWishList().some(currentCar => car.equals(currentCar))){
        button.classList.add("command-button-selected");
        document.getElementById("wish-list-button-text").innerText = "Aggiunto ai desideri"
    }else{
        button.classList.remove("command-button-selected");
        document.getElementById("wish-list-button-text").innerText = "Lista dei desideri";
    }

    button.addEventListener("click", () => {
        if(user === null)
            window.location.href = "../pages/login.html";

        if(button.classList.contains("command-button-selected"))
            return;

        user.addWish(car);
        localStorage.setItem('loggedUser', JSON.stringify(user.toJson()));
    });
}

/* read all possible data useful
for the car details page */
car = CarDetailsTools.getCar();
user = localStorage.getItem('loggedUser');
if (user !== null)
    user = User.fromJson(JSON.parse(user));

/* fuctions to manage the different
car function on the page */
document.getElementById("carousel-container").innerHTML = TemplateParts.getMiniCarouselForCarDetails(car.getMainImage(), car.getDetailsImage());
printCarDetails();
CarDetailsTools.previousPage();
manageShoppingCartButton();
manageWishListButton();