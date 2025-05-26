import Showroom from '../js-backend/vehicle/Showroom.js';
import Slider from './slider-manager.js';

import * as sliderTools from './slider-manager.js';
import * as TemplateParts from './template-parts.js';
 
const sliders = [
    new Slider("input-power", "output-power", "KW"),
    new Slider("input-price", "output-price", "€"),
    new Slider("input-optional-price", "output-optional-price", "€")
];

/* get the elements from the showroom */
let showroom;
if(localStorage.getItem("showroom") === null){
    showroom = new Showroom();
    showroom.saveToLocalStorage();
}else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

/* print the car brands */
document.getElementById("choice-brand").innerHTML = TemplateParts.getFormSelectOptions(showroom.getBrandList().map(brand => brand.getName()));

/* print the optional options */
document.getElementById("optional-container").innerHTML = TemplateParts.getSwitchOption(showroom.getOptionalList().map(optional => optional.getDescription()));

/* manage sliders */
sliders.forEach(slider => {
    sliderTools.printSliderValue(slider);
});