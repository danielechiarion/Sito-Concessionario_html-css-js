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
        super(null, null, CarType.CarType.NOTHING, Engine.Engine.NOTHING, -2, -2, -1, -1, -1, -1, null, null, null, null, -1);
    }
}