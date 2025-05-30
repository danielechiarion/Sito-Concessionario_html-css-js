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
     * Return a clone of the car in the purchase list
     * @returns clone of the car
     */
    getCar(){
        return this.#car.clone();
    }

    /**
     * Returns a formatted string for the date in Italian
     * @returns formatted string with dd month yyyy Italian date
     */
    toStringDate(){
        const options = {day: 'numeric', month: 'long', year: 'numeric'};
        return new Intl.DateTimeFormat("it-IT", options).format(this.#date);
    }

    /**
     * Returns a clone of the purchase made.
     * @returns clone of the purchase
     */
    clone() {
        return new Purchase(this.#car.clone(), new Date(this.#date.getTime()));
    }

    /**
     * Creates a Purchase object from a JSON object.
     * @param {object} json 
     * @returns Purchase object
     */
    static fromJson(json) {
        return new Purchase(
            Car.fromJson(json.car),
            new Date(json.date)
        );
    }

    /**
     * Converts the Purchase object to a JSON object.
     * @returns {object} JSON object representing the Purchase
     */
    toJson() {
        return {
            car: this.#car.toJson(),
            date: this.#date.toISOString()
        };
    }
}