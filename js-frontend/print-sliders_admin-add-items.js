import Slider from './slider-manager.js';
import * as sliderTools from './slider-manager.js';
 
const sliders = [
    new Slider("input-power", "output-power", "KW"),
    new Slider("input-price", "output-price", "€")
];

sliders.forEach(slider => {
    sliderTools.printSliderValue(slider);
});