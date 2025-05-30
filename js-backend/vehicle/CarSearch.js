import Car from './Car.js';
import Brand from './Brand.js';
import * as CarType from './CarType.js';
import * as Engine from './Engine.js';

/**
 * Class used for searching cars.
 */
export default class CarSearch extends Car {
    /* declaration of private attributes */
    #maxPower;
    #maxPrice;

    /**
     * Constructor for the CarSearch class.
     * @param {string} brand 
     * @param {string} model 
     * @param {CarType} type 
     * @param {Engine} engine 
     * @param {number} minPower 
     * @param {number} maxPower 
     * @param {number} engineAutonomy 
     * @param {number} initialValue 
     * @param {number} maxPrice 
     * @param {number} seats 
     * @param {number} doorsNumber 
     * @param {Optional[]} optionalList
     * @param {string} color 
     */
    constructor(brandName, model, type, engine, minPower, maxPower, engineAutonomy, initialValue, maxPrice, seats, doorsNumber, optionalList, colors){
        super(new Brand(brandName, null), model, type, engine, minPower, engineAutonomy, initialValue, seats, doorsNumber, -1, null, null, optionalList, colors, -1);
        this.#setMaxPower(maxPower);
        this.#setMaxPrice(maxPrice);
    }

    #setMaxPower(maxPower) {
        if(typeof maxPower !== 'number') {
            throw new TypeError("Invalid max power value");
        }
        this.#maxPower = maxPower;
    }

    #setMaxPrice(maxPrice) {
        if(typeof maxPrice !== 'number') {
            throw new TypeError("Invalid max price value");
        }
        this.#maxPrice = maxPrice;
    }

    
    /**
     * Compares this car search with another car to see if they are similar.
     * @param {Car} anotherCar 
     * @returns TRUE if the cars are similar, FALSE otherwise.
     * @throws {TypeError} If the argument is not an instance of Car.
     */
    isSimilarTo(anotherCar){
        if(!(anotherCar instanceof Car))
            throw new TypeError("Argument must be an instance of CarSearch");

        if(this.getBrand().getName() !=="" && this.getBrand().getName() !== anotherCar.getBrand().getName())
            return false;
        if(this.getModel() !== "" && this.getModel() !== anotherCar.getModel())
            return false;
        if(this.getType() !== CarType.CarType.NOTHING && this.getType() !== anotherCar.getType())
            return false;
        if(this.getEngine() !== Engine.Engine.NOTHING && this.getEngine() !== anotherCar.getEngine())
            return false;
        if(this.getMinPower()>0 && anotherCar.getMinPower() < this.getMinPower())
            return false;
        if(this.#maxPower > 0 && this.#maxPower>=this.getMinPower() && anotherCar.getMinPower() > this.#maxPower)
            return false;
        if(this.engineAutonomy>0 && anotherCar.getEngineAutonomy() < this.engineAutonomy)
            return false;
        if(this.getInitialValue() > 0 && anotherCar.getInitialValue() < this.getInitialValue()) 
            return false;
        if(this.#maxPrice > 0 && this.#maxPrice>=this.getInitialValue() && anotherCar.getInitialValue() > this.#maxPrice)
            return false;
        if(this.getSeats() > 0 && anotherCar.getSeats() !== this.getSeats())
            return false;
        if(this.getDoorsNumber() > 0 && anotherCar.getDoorsNumber() !== this.getDoorsNumber())
            return false;
        if(this.getOptionalList().length != 0 && !this.getOptionalList().every(optional =>  anotherCar.getOptionalList().some(optional2 => optional2.equals(optional))))
            return false;
        if (this.getColorsAvailable().length !== 0 && this.getColorsAvailable().some(color => anotherCar.getColorsAvailable().includes(color)))
            return false;

        return true;
    }
}