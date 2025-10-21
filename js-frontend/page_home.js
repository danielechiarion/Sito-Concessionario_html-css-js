import Car from "../js-backend/vehicle/Car.js";
import Showroom from "../js-backend/vehicle/Showroom.js";
import Brand from "../js-backend/vehicle/Brand.js";
import User from "../js-backend/account/User.js";
import * as AccountRole from "../js-backend/account/AccountRole.js";

import * as TemplateParts from "./template-parts.js";

let showroom;
let user;

/* function to print the most sold cars */
function printMostSoldCars(){
    const elements = showroom.getMostSoldCars(12).map(car => TemplateParts.getCarCard(car));

    if(elements.length === 0)
        document.getElementById("most-sold-car-section").innerHTML = TemplateParts.getErrorMessage("Nessuna macchina disponibile");
    else
        document.getElementById("most-sold-car-section").innerHTML = TemplateParts.getCarouselItems(elements, 1, 2, 4, "most-sold-cars");
}

/* function to print the cars the user could like */
function printPreferredUserCars(){
    if(user === null){
        document.getElementById("advice-container").classList.add("d-none");
        return;
    }else
        document.getElementById("advice-container").classList.remove("d-none");

    const elements = showroom.findCarsForUser(user.findUserPreferences(), 12).map(car => TemplateParts.getCarCard(car));
    if(elements.length === 0)
        document.getElementById("advice-section").innerHTML = TemplateParts.getErrorMessage("Nessuna macchina disponibile");
    else
        document.getElementById("advice-section").innerHTML = TemplateParts.getCarouselItems(elements, 1,2,4, "advice");
}

/* function to print the brands registered
in the showroom */
function printBrands(){
    const elements = showroom.getBrandList().map(brand => TemplateParts.getBrandCard(brand));
    if(elements.length === 0)
        document.getElementById("brand-section").innerHTML = TemplateParts.getErrorMessage("Nessun marchio disponibile");
    else
        document.getElementById("brand-section").innerHTML = TemplateParts.getCarouselItems(elements, 1, 3, 4, "brands");
}

/* read the showroom and the account */
showroom = localStorage.getItem("showroom");
if(showroom === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(showroom));

user = localStorage.getItem("loggedUser");
if(user !== null){
    user = User.fromJson(JSON.parse(user));
}

/* add function to add most sold cards to
the carousel */
printMostSoldCars();
window.addEventListener("resize", printMostSoldCars);

/* add function show cars
the user could like */
printPreferredUserCars();
window.addEventListener("resize", printPreferredUserCars);

/* add function to print the brands of the showroom */
printBrands();
window.addEventListener("resize", printBrands);

/* manage link to other pages */
if(user === null || user.getRole() === AccountRole.AccountRole.CLIENT)
    document.getElementById("home-link-pages").innerHTML = TemplateParts.getHomeLinkPagesNormal();
else
    document.getElementById("home-link-pages").innerHTML = TemplateParts.getHomeLinkPagesAdmin();