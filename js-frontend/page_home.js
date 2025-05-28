import Car from "../js-backend/vehicle/Car.js";
import Showroom from "../js-backend/vehicle/Showroom.js";
import Brand from "../js-backend/vehicle/Brand.js";
import User from "../js-backend/account/User.js";

import * as TemplateParts from "./template-parts.js";

/* function to print the most sold cars */
function printMostSoldCars(){
    const elements = showroom.getMostSoldCars(12).map(car => TemplateParts.getCarCard(car));

    document.getElementById("most-sold-car-section").innerHTML = TemplateParts.getCarouselItems(elements, 1, 2, 4);
}

/* read the showroom and the account */
let showroom = localStorage.getItem("showroom");
if(showroom === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(showroom));

let user = localStorage.getItem("loggedUser");
if(user !== null){
    user = User.fromJson(JSON.parse(user));
}

/* add function to add most sold cards to
the carousel */
printMostSoldCars();
document.addEventListener("resize", printMostSoldCars);