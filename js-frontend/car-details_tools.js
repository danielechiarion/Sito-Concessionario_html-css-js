import Car from '../js-backend/vehicle/Car.js';

import * as TemplateParts from './template-parts.js';

export function getCar(){
    let car = localStorage.getItem('carDetails');
    if(car === null)
        throw new Error('Car not found');
    car = Car.fromJson(JSON.parse(car));
    return car;
}

export function clearMemory(){
    localStorage.removeItem('carDetails');
    localStorage.removeItem('previousPage');
}

export function previousPage(){
    const path = localStorage.getItem('previousPage');
    if(path === null || path === undefined || path === "")
        throw new Error('Previous page not found');

    document.getElementById('previous-page-button').addEventListener('click', () => {
        clearMemory();
        window.location.href = path;
    });
}

export function getCarousel(car){
    document.getElementById('mini-carousel-car-details').innerHTML = TemplateParts.getMiniCarouselForCarDetails(car.getMainImage(), car.getDetailsImage());
}