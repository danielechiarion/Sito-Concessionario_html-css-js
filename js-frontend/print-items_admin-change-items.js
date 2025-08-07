import Showroom from '../js-backend/vehicle/Showroom.js';
import Optional from '../js-backend/vehicle/Optional.js';
import Brand from '../js-backend/vehicle/Brand.js';

import * as TemplateParts from './template-parts.js';
import * as SliderTools from './slider-manager.js';
import Slider from './slider-manager.js';
import { useSyncExternalStore } from 'react';

let showroom; 

function printOptionals(){
    const outputOptional = showroom.getOptionalList().map(singleOptional => singleOptional.getName());

    if(outputOptional.length !== 0)
        document.getElementById("optional-choice-optional").innerHTML = TemplateParts.getFormSelectOptions(outputOptional);
    else
        document.getElementById("optional-change-alert").innerHTML = TemplateParts.getErrorMessage("Nessun optional ancora inserito");
    document.getElementById("car-optional-available").innerHTML = TemplateParts.getSwitchOption(showroom.getOptionalList().map(singleOptional => singleOptional.getName()), "car-single-optional");
}

function printCarBrands(){
    const outputBrands = showroom.getBrandList().map(singleBrand => singleBrand.getName());
    let carShowroomBrands = [];

    /* collect all the brands it's possible to find in the showroom */
    for(let singleCar of showroom.getCarList()){
        if(carShowroomBrands.length === 0 || !carShowroomBrands.find(currentBrand => currentBrand.equals(singleCar.getBrand())))
            carShowroomBrands.push(singleCar.getBrand());
    }

    if(carShowroomBrands.length === 0)
        document.getElementById("car-change-alert").innerHTML = TemplateParts.getErrorMessage("Nessuna auto ancora inserita");
    else
        document.getElementById("car-choice-brand").innerHTML = TemplateParts.getFormSelectOptions(carShowroomBrands.map(singleBrand => singleBrand.getName()));

    if(outputBrands.length === 0)
        document.getElementById("brand-change-alert").innerHTML = TemplateParts.getErrorMessage("Nessun marchio ancora inserito");
    else
        document.getElementById("brand-choice-brand").innerHTML = TemplateParts.getFormSelectOptions(outputBrands);
}


function printChoiceColors(){
    const colorPicker = document.getElementById("choice-color");

    colorPicker.addEventListener("click", (event) => {
        const target = event.target;

        /* verify is the element is a color-option */
        if (target.classList.contains("color-option")) {
            const color = target.getAttribute("data-color");

            /* add or remove class select */
            if (target.classList.contains("color-option-clicked")) {
                target.classList.remove("color-option-clicked");
            } else {
                target.classList.add("color-option-clicked");
            }
        }
    });
}

function printChoiceCar(){
    const carTypes = document.querySelectorAll(".card-car-type .btn-card-details");

    carTypes.forEach(choice => choice.addEventListener("click", () => {
        if(choice.classList.contains("btn-secondary-clicked"))
            choice.classList.remove("btn-secondary-clicked");
        else{
            carTypes.forEach(c => c.classList.remove("btn-secondary-clicked"));
            choice.classList.add("btn-secondary-clicked");
        }
    }));
}

export function printSliders(){
    /* print all the sliders and use the function
    to update the value the input changes */
    sliders.forEach(slider => SliderTools.printSliderValue(slider));
}

/* instantiate the sliders to print the value */
const sliders = [
    new Slider("input-optional-price", "output-optional-price", "€"),
    new Slider("input-car-power", "output-car-power", "KW"),
    new Slider("input-car-price", "output-car-price", "€"),
    new Slider("input-car-autonomy", "output-car-autonomy", "km")
];
/* read the values from the showroom */
showroom = Showroom.loadFromLocalStorage();

printSliders();

document.getElementById("car-type-carousel").innerHTML = TemplateParts.getCarTypeCarousel();

/* print the optionals and the changed brands */
printOptionals();
printCarBrands();
printChoiceColors();
printChoiceCar();

/* add event listeners */
window.addEventListener("resize", () => {
    document.getElementById("car-type-carousel").innerHTML = TemplateParts.getCarTypeCarousel();
});