export default class Slider{
    constructor(inputID, outputID, unit){
        this.input = inputID;
        this.output = outputID;
        this.unit = unit;
    }
}

function printData(slider){
    document.getElementById(slider.output).innerHTML = document.getElementById(slider.input).value + slider.unit;
}

export function printSliderValue(slider){
    document.getElementById(slider.input).addEventListener('input', () => {
        printData(slider);
    });
    printData(slider);
}