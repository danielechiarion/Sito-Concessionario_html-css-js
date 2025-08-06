import * as CarDetailsTools from './car-details_tools.js';
import * as TemplateParts from './template-parts.js';

import User from '../js-backend/account/User.js';

let car;
let user;

function printCarDetails() {
    document.getElementById("brand-name").innerText = car.getBrand().getName();
    document.getElementById("model").innerText = car.getModel();
    document.getElementById("power").innerText = car.getMinPower();
    document.getElementById("price").innerText = car.getPrice();
    document.getElementById("quantity").innerText = car.getQuantityAvailable();
    document.getElementById("engine").innerHTML = car.getEngine();
    document.getElementById("engine-autonomy").innerText = car.getEngineAutonomy();
    document.getElementById("color").innerHTML = TemplateParts.getColorPicker(car.getColorsAvailable());
    document.getElementById("seats").innerText = car.getSeats();
    document.getElementById("doors").innerText = car.getDoorsNumber();
    document.getElementById("car-type").innerText = car.getType();
    document.getElementById("optionals-activated").innerHTML = TemplateParts.getUL(car.getOptionalList().map(optional => optional.getName()));    
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