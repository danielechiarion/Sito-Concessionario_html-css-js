import CarSearch from '../js-backend/vehicle/CarSearch.js';
import Showroom from '../js-backend/vehicle/Showroom.js';
import * as CarType from '../js-backend/vehicle/CarType.js';
import * as Engine from '../js-backend/vehicle/Engine.js';

import * as TemplateParts from './template-parts.js';

let showroom;

function getCar(){
    /* get the input element */
    const brand = document.getElementById("input-brand").value;
    const model = document.getElementById("input-model").value;
    const minPower = parseInt(document.getElementById("input-min-power").value);
    const maxPower = parseInt(document.getElementById("input-max-power").value);
    const minPrice = parseInt(document.getElementById("input-min-price").value);
    const maxPrice = parseInt(document.getElementById("input-max-price").value);
    let engine;
    if(document.getElementById("choice-engine").value == 0)
        engine = Engine.Engine.NOTHING;
    else
        engine = Engine.Engine[parseInt(document.getElementById("choice-engine").value)];

    const autonomy = parseInt(document.getElementById("input-autonomy").value);
    const seats = parseInt(document.getElementById("choice-seats").value);
    const doors = parseInt(document.getElementById("choice-doors").value);

    /* car type*/
    const carTypeCards = document.querySelectorAll(".card-car-type .btn-secondary-clicked");
    let carType = CarType.CarType.NOTHING;
    if (carTypeCards.length > 0) {
        const carTypeIndex = Array.from(document.querySelectorAll(".card-car-type .btn-card-details")).findIndex(btn =>
            btn.classList.contains("btn-secondary-clicked")
        );
        const carTypeKeys = Object.keys(CarType.CarType);
        if (carTypeIndex >= 0) carType = CarType.CarType[carTypeKeys[carTypeIndex]];
    }

    /* colors */
    const colorElements = document.querySelectorAll(".color-option-clicked");
    const colorsAvailable = Array.from(colorElements).map(el => el.dataset.color);

    /* optionals */
    const optionalSwitches = document.querySelectorAll(".optional-switch");
    const optionalList = [];
    showroom.getOptionalList().forEach((opt, i) => {
        if (optionalSwitches[i] && optionalSwitches[i].checked) {
            optionalList.push(opt);
        }
    });    

    return new CarSearch(brand, model, carType, engine, minPower, maxPower, autonomy, minPrice, maxPrice, seats, doors, optionalList, colorsAvailable);
}

if(localStorage.getItem("showroom") === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage();

let car;
let carResults;
document.getElementById("result-section").innerHTML = TemplateParts.getResultGridView(showroom.getCarList().map(currentCar => TemplateParts.getCarCard(currentCar)), 12, 6, 3);
document.getElementById("input-submit").addEventListener("click", () => {
    car = getCar();
    carResults = showroom.searchSimilarCars(car);
    if(carResults.length === 0){
        document.getElementById("result-section").innerHTML = TemplateParts.getErrorMessage("Nessuna auto trovata");
        return null;
    }

    document.getElementById("result-section").innerHTML = TemplateParts.getResultGridView(carResults.map(currentCar => TemplateParts.getCarCard(currentCar)), 12, 6, 3);
});
