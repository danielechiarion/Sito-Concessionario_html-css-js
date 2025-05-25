import Car from '../vehicle/Car.js';

/**
 * Class used for representing a purchase of a car.
 */
export default class Purchase {
    #car;
    #date;

    /**
     * Constructor for the Purchase class.
     * @param {Car} car 
     * @param {Date} date 
     */
    constructor(car, date){
        this.#setCar(car);
        this.#setDate(date);
    }

    #setCar(car){
        if(!(car instanceof Car)) {
            throw new TypeError("Invalid car object");
        }
        this.#car = car;
    }

    #setDate(date) {
        if(!(date instanceof Date)) {
            throw new TypeError("Invalid date object");
        }
        this.#date = date;
    }

    /**
     * Returns a clone of the purchase made.
     * @returns clone of the purchase
     */
    clone() {
        return new Purchase(this.#car.clone(), new Date(this.#date.getTime()));
    }
}