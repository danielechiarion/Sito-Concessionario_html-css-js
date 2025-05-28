import User from '../js-backend/account/User.js';
import CarByID from '../js-backend/vehicle/CarByID.js';
import Car from '../js-backend/vehicle/Car.js';
import Showroom from '../js-backend/vehicle/Showroom.js';

let user = null;
let cards;
let showroom;

function manageShoppingCartButton(user, currentCar, button){
    if(user !== null && user.getShoppingCart().some(car => carSearch.equals(car)))
        button.classList.add("card-button-selected");
    else
        button.classList.remove("card-button-selected");

    button.addEventListener("click", () => {
        /* check if the user is logged */
        if(user === null)
            window.open("login.html");

        if(button.classList.contains("card-button-selected")) //continue only if the car hasn't been added
            return;

        /* then add the car to the shopping cart */
        button.classList.add("card-button-selected");
        user.addToShoppingCart(currentCar);
    });
}

function manageWishListButton(user, currentCar, button){
    if(user !== null && user.getWishList().some(car => carSearch.equals(car)))
        button.classList.add("card-button-selected");
    else
        button.classList.remove("card-button-selected");

    button.addEventListener("click", () => {
        /* check if the user is logged */
        if(user === null)
            window.open("login.html");

        if(button.classList.contains("card-button-selected")) //continue only if the car hasn't been added
            return;

        /* then add the car to the wish-list */
        button.classList.add("card-button-selected");
        user.addWish(currentCar);
    });
}

cards = Array.from(document.querySelectorAll(".car-card")); //get the cards to do the research
if(cards === null)
    return;

if(localStorage.getItem("loggedUser")!==null)
    user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));
showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

cards.forEach(card => {
    /* if the card-details button is clicked, 
    the page where the botton was clicked in kept
    to go back after the page visit */
    card.querySelector(".btn-card-details").addEventListener("click", () => {
        localStorage.setItem("previousPage", window.location.href);
    });

    const cardID = parseInt(card.getAttribute("data-car-id"), 10);
    const carSearch = new CarByID(id); //get the car by the id
    const currentCar = showroom.getCarList()[showroom.getCarList().findIndex(car => carSearch.equals(car))]; //get the car by the showroom

    /* if there is a button to add the car to the shopping-cart,
    manage all the function, such as click and save the status */
    if(card.querySelector(".shopping-cart-button") !== null)
        manageShoppingCartButton(user, currentCar, card.querySelector(".shopping-cart-button"));
    /* do the same for the others */
    if(card.querySelector(".wish-list-button")!== null)
        manageWishListButton(user, currentCar, card.querySelector(".wish-list-button"));
});