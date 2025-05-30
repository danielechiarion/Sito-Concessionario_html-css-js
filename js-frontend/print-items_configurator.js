import Slider from './slider-manager.js';
import * as sliderTools from './slider-manager.js';
import * as TemplateParts from './template-parts.js';

import Showroom from '../js-backend/vehicle/Showroom.js';

function printCarOptionals(optionalList){
    /* print the optional options */
    document.getElementById("optional-container").innerHTML = TemplateParts.getSwitchOption(optionalList.map(optional => optional.getName()), "optional-switch");
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
 
const sliders = [
    new Slider("input-min-power", "output-min-power", "KW"),
    new Slider("input-max-power", "output-max-power", "KW"),
    new Slider("input-min-price", "output-min-price", "€"),
    new Slider("input-max-price", "output-max-price", "€"),
    new Slider("input-autonomy", "output-autonomy", "km"),
];

sliders.forEach(slider => {
    sliderTools.printSliderValue(slider);
});

/* get the elements from the showroom */
let showroom;
if(localStorage.getItem("showroom") === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

let optionalList = showroom.getOptionalList();

printCarOptionals(optionalList);
printChoiceCar();
printChoiceColors();
