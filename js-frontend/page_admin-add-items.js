import Car from '../js-backend/vehicle/Car.js';
import Brand from '../js-backend/vehicle/Brand';
import Optional from '../js-backend/vehicle/Optional.js';
import * as Engine from '../js-backend/vehicle/Engine.js';
import * as CarType from '../js-backend/vehicle/CarType.js';
import Showroom from '../js-backend/vehicle/Showroom.js';

import * as TemplateParts from './template-parts.js';
import * as PrintPage from '.print-items_admin-add-items.js';

let showroom;

function getColor(){
    const colors = document.querySelectorAll(".color-option-clicked").map(color => color.value);
    return colors();
}

function getCarType(){
    const carTypes = document.querySelectorAll(".card-car-type .btn-secondary-clicked");
    for(let i=0;i<carTypes.length;i++){
        if(carTypes[i].classList.contains("btn-secondary-clicked")){
            return CarType.CarType[i];
        }
    }
}

function getOptionals(){
    const optionals = document.querySelectorAll(".optional-switch");
    let optionalSelected = [];

    for(let i=0;i<showroom.getOptionalList().length;i++){
        if(optionals[i].checked){
            optionalSelected.push(showroom.getOptionalList()[i]);
        }
    }
}

function addCar(){
    /* get car data */
    const brand = showroom.getBrandList()[document.getElementById("choice-brand").value];
    const model = document.getElementById("input-model").value;
    const power = document.getElementById("input-power").value;
    const price = document.getElementById("input-price").value;
    const engine = Engine.Engine[document.getElementById("choice-engine").value];
    const engineAutonomy = document.getElementById("input-autonomy").value;
    const colorsAvailable = getColor();
    const seats = document.getElementById("choice-seats").value;
    const doors = document.getElementById("choice-doors").value;
    const carType = document.getCarType();
    const optionalList = getOptionals();
    const mainImage = URL.createObjectURL(document.getElementById("file-main-image").files[0]);
    const detailsImage = document.getElementById("file-details-image").files.map(file => URL.createObjectURL(file));
    const quantity = document.getElementById("input-car-quantity").value;

    /* create a new car */
    const car = new Car(brand, model, carType, engine, power, engine, price, seats, doors, quantity, mainImage, detailsImage, optionalList, colorsAvailable, null);

    /* add it to the car manager and check if the car already exists */
    try{
        showroom.addCar(car);
        showroom.saveToLocalStorage();
        document.getElementById("message").innerHTML = TemplateParts.getSuccessMessage("Auto aggiunta con successo");
    }catch(error){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage(error);
    }
}

/* check if the showroom already exists */
if(localStorage.getItem("showroom") === null)
    showroom = new Showroom();
else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

document.getElementById("add-car-submit").addEventListener("click", addCar);
