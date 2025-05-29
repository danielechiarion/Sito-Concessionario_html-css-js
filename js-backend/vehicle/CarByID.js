import Car from "./Car.js";
import * as CarType from "./CarType.js";
import * as Engine from "./Engine.js";

/**
 * Class to manage ID for researches inside
 * car list
 */
export default class CarByID extends Car{
    /**
     * Constructor of the car using only the ID
     * for a research inside the car list
     * @param {number} id 
     */
    constructor(id){
        super(null, null, CarType.CarType.NOTHING, Engine.Engine.NOTHING, -2, -2, -1, -1, -1, -1, null, null, null, null, id);
    }

    /**
     * Equals method comparing only the ID
     * to search the car. 
     * It's used for cards and find quickly the object 
     * associated to it
     * @param {Car} anotherCar car to be compared
     * @returns TRUE if the cars have the same ID, FALSE otherwise
     */
    equals(anotherCar){
        if(!(anotherCar instanceof Car))
            throw new TypeError("anotherCar must be a Car instance");

        return this.getID() === anotherCar.getID();
    }
}