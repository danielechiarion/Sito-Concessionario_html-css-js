import Showroom from '../js-backend/vehicle/Showroom.js';
import Optional from '../js-backend/vehicle/Optional.js';
import Brand from '../js-backend/vehicle/Brand.js';

import * as TemplateParts from './template-parts.js';
import * as SliderTools from './slider-manager.js';
import Slider from './slider-manager.js';

let showroom; 

function printOptionals(){
    const outputOptional = showroom.getOptionalList().map(singleOptional => singleOptional.getName());

    document.getElementById("optional-choice-optional").innerHTML = TemplateParts.getFormSelectOptions(outputOptional);
}

function printCarBrands(){
    const outputBrands = showroom.getBrandList().map(singleBrand => singleBrand.getName());

    document.getElementById("brand-choice-brand").innerHTML = TemplateParts.getFormSelectOptions(outputBrands);
}

export function printSliders(){
    /* print all the sliders and use the function
    to update the value the input changes */
    sliders.forEach(slider => SliderTools.printSliderValue(slider));
}

/* instantiate the sliders to print the value */
const sliders = [
    new Slider("input-optional-price", "output-optional-price", "€")
];
/* read the values from the showroom */
showroom = Showroom.loadFromLocalStorage();

printSliders();

/* print the optionals and the changed brands */
printOptionals();
printCarBrands();