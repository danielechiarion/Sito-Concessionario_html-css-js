import Showroom from '../js-backend/vehicle/Showroom.js';
import Slider from './slider-manager.js';
import Brand from '../js-backend/vehicle/Brand.js';

import * as sliderTools from './slider-manager.js';
import * as TemplateParts from './template-parts.js';
 
const sliders = [
    new Slider("input-power", "output-power", "KW"),
    new Slider("input-price", "output-price", "€"),
    new Slider("input-autonomy", "output-autonomy", "km"),
    new Slider("input-optional-price", "output-optional-price", "€")
];

export function printBrandSelect(brandList){
    /* print the car brands */
    document.getElementById("choice-brand").innerHTML = TemplateParts.getFormSelectOptions(brandList.map(brand => brand.getName()));
}

export function printCarOptionals(optionalList){
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

function getBrandPreview(){
    const name = document.getElementById("input-brand-name").value;
    let logo;
    if(!document.getElementById("url-brand-image").value && document.getElementById("file-brand-logo").files[0])
        logo = URL.createObjectURL(document.getElementById("file-brand-logo").files[0]);
    else if(document.getElementById("url-brand-image").value)
        logo = "https://"+document.getElementById("url-brand-image").value;
    else
        logo = "../../img/static/car.svg";

    const brand = new Brand(name, logo);
    document.getElementById("brand-card-preview-container").innerHTML = TemplateParts.getBrandCard(brand);
}

/* get the elements from the showroom */
let showroom;
if(localStorage.getItem("showroom") === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

document.getElementById("car-type-carousel").innerHTML = TemplateParts.getCarTypeCarousel(); //show the carousel of car types

printBrandSelect(showroom.getBrandList()); //change the selection of brands
printCarOptionals(showroom.getOptionalList()); //change the car optionals
printChoiceColors(); //manage the color selection
printChoiceCar(); //manage the car selection

document.getElementById("input-brand-name").addEventListener("input", getBrandPreview);
document.getElementById("file-brand-logo").addEventListener("change", getBrandPreview);
document.getElementById("url-brand-image").addEventListener("input", getBrandPreview);
window.addEventListener("resize", () => {
    document.getElementById("car-type-carousel").innerHTML = TemplateParts.getCarTypeCarousel();
});

/* manage sliders */
sliders.forEach(slider => {
    sliderTools.printSliderValue(slider);
});