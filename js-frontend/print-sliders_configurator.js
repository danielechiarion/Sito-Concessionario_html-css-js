import Slider from './slider-manager.js';
import * as sliderTools from './slider-manager.js';
 
const sliders = [
    new Slider("input-min-power", "output-min-power", "KW"),
    new Slider("input-max-power", "output-max-power", "KW"),
    new Slider("input-min-price", "output-min-price", "€"),
    new Slider("input-max-price", "output-max-price", "€"),
    new Slider("input-displacement", "output-displacement", "km"),
];

sliders.forEach(slider => {
    sliderTools.printSliderValue(slider);
});