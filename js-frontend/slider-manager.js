export default class Slider{
    constructor(inputId, outputID, unit){
        this.input = inputId;
        this.output = outputID;
        this.unit = unit;
    }
}

export function printSliderValue(slider){
    document.getElementById(slider.input).addEventListener('input', () => {
        document.getElementById(output).innerHTML = document.getElementById(slider.input).value + slider.unit;
    });
}