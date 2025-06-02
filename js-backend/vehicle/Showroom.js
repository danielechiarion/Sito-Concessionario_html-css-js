import Car from './Car.js';
import Brand from './Brand.js';
import Optional from './Optional.js';
import CarSearch from './CarSearch.js';

/**
 * Class representing a showroom that contains cars, brands, and optionals. 
 * This class is managed by the administrator.
 */
export default class Showroom {
    /* define private attributes */
    #carList;
    #brandList;
    #optionalList;

    /**
     * Constructor for the Showroom class.
     */
    constructor() {
        this.#carList = [];
        this.#brandList = [];
        this.#optionalList = [];
    }

    /* getter for the showroom lists */
    /**
     * Returns a clone of the cars in the showroom.
     * @returns {Car[]} A list of all cloned cars the showroom.
     */
    getCarList() {
        return this.#carList.map(car => car.clone());
    }

    /**
     * Returns a clone of the brands in the showroom.
     * @returns {Brand[]} A list of all cloned brands in the showroom.
     */
    getBrandList() {
        return this.#brandList.map(brand => brand.clone());
    }

    /**
     * Returns a clone of the optionals in the showroom.
     * @returns {Optional[]} A list of all cloned optionals in the showroom.
     */
    getOptionalList() {
        return this.#optionalList.map(optional => optional.clone());
    }

    /**
     * Add a car to the showroom.
     * @param {Car} car 
     * @throws {TypeError} If the argument is not an instance of Car.
     */[Car]
    addCar(car) {
        if(!(car instanceof Car)) {
            throw new TypeError("Argument must be an instance of Car");
        }
        const index = this.#carList.findIndex(c => c.equals(car));
        if(index !== -1) {
            /* if the car already exists, 
            the quantity of the new car is added to the old one */
            this.#carList[index].setQuantityAvailable(this.#carList[index].getQuantityAvailable() + car.getQuantityAvailable());
        }else{
            /* create a new car with a new index 
            and push it into the car list */
            car.setID(Car.newID());
            this.#carList.push(car);
        }
    }

    /**
     * Removes a car from the showroom.
     * @param {Car} car 
     * @throws {Error} If the car is not found in the showroom.
     */
    removeCar(car){
        const index = this.#carList.findIndex(c => c.equals(car));
        if(index === -1) {
            throw new Error("Car not found in showroom");
        }

        this.#carList.splice(index, 1);
    }

    /**
     * Change the quantity of a car in the showroom after a purchase.
     * @param {Car} car array of cars to purchase
     * @throws {Error} If the car is not found in the showroom.
     * @throws {RangeError} If the quantity is greater than the available quantity.
     * @throws {TypeError} If the arguments are not of the expected types.
     */
    purchaseCars(car) {
        if(!Array.isArray(car) || !car.every(c => c instanceof Car)) {
            throw new TypeError("Arguments required are Car[]");
        }

        for(const currentCar of car){
            const index = this.#carList.findIndex(c => c.equals(currentCar));
            if(index === -1) {
                throw new Error("Car not found in showroom");
            }

            if(this.#carList[index].getQuantityAvailable() < currentCar.getQuantityAvailable()) {
                throw new RangeError("Not enough cars available");
            }

            this.#carList[index].setQuantityAvailable(this.#carList[index].getQuantityAvailable() - currentCar.getQuantityAvailable());
        }  
    }

    /**
     * Add a brand to the showroom.
     * @param {Brand} brand 
     * @throws {TypeError} If the argument is not an instance of Brand.
     * @throws {Error} If the brand already exists in the showroom.
     */
    addBrand(brand) {
        if(!(brand instanceof Brand)) {
            throw new TypeError("Argument must be an instance of Brand");
        }
        const index = this.#brandList.findIndex(b => b.equals(brand));
        if(index !== -1)
            throw new Error("Brand already exists in showroom");
        

        this.#brandList.push(brand);
    }

    /**
     * Remove a brand from the showroom.
     * @param {Brand} brand 
     * @throws {TypeError} If the argument is not an instance of Brand.
     * @throws {Error} If the brand is not found in the showroom.
     */
    removeBrand(brand) {
        if(!(brand instanceof Brand)) {
            throw new TypeError("Argument must be an instance of Brand");
        }
        const index = this.#brandList.findIndex(b => b.equals(brand));
        if(index === -1) {
            throw new Error("Brand not found in showroom");
        }

        this.#brandList.splice(index, 1);
    }

    /**
     * Add an optional to the showroom.
     * @param {Optional} optional 
     * @throws {TypeError} If the argument is not an instance of Optional.
     * @throws {Error} If the optional already exists in the showroom.
     */
    addOptional(optional) {
        if(!(optional instanceof Optional)) {
            throw new TypeError("Argument must be an instance of Optional");
        }
        const index = this.#optionalList.findIndex(o => o.equals(optional));
        if(index !== -1)
            throw new Error("Optional already exists in showroom");

        this.#optionalList.push(optional);
    }

    /**
     * Remove an optional from the showroom.
     * @param {Optional} optional 
     * @throws {TypeError} If the argument is not an instance of Optional.
     * @throws {Error} If the optional is not found in the showroom.
     */
    removeOptional(optional) {
        if(!(optional instanceof Optional)) {
            throw new TypeError("Argument must be an instance of Optional");
        }
        const index = this.#optionalList.findIndex(o => o.equals(optional));
        if(index === -1) {
            throw new Error("Optional not found in showroom");
        }

        this.#optionalList.splice(index, 1);
    }

    /**
     * Returns the most sold cars 
     * @param {number} carsNumber 
     * @returns most sold cars
     */
    getMostSoldCars(carsNumber){
        if(typeof carsNumber !== "number")
            throw new TypeError("carsNumber must be a number");

        const soldCars = this.getCarList().sort(Car.compare).slice(0,carsNumber);
        return soldCars;
    }

    /**
     * Finds the cars based on the preferences of the user
     * If preferences are not specified, the program will return the first cars available in the showroom.
     * @param {object} userPreferences
     * @param {number} number number of cars to show
     * @returns {Car[]} Car list with the suggested cars for the user
     */
    findCarsForUser(userPreferences, number) {
        const { preferredEngine, preferredDoorsNumber, preferredColors, preferredOptionals, preferredType } = userPreferences;

        /* filter of the car based on the preferences */
        let filteredCars = this.getCarList().filter(car =>
            (!preferredEngine || car.getEngine() === preferredEngine) &&
            (!preferredDoorsNumber || car.getDoorsNumber() === preferredDoorsNumber) &&
            (!preferredColors || preferredColors.length === 0 || preferredColors.some(color => car.getColorsAvailable().includes(color))) &&
            (!preferredOptionals || preferredOptionals.length === 0 || preferredOptionals.every(opt => car.getOptionalList().map(o => o.getName()).includes(opt))) &&
            (!preferredType || car.getType() === preferredType)
        );

        /* if any car corresponds, the first cars available
        will be chosen */
        if (filteredCars.length === 0) {
            return this.getCarList().slice(0, number);
        }

        /* otherwise the program will return the first filtered cars */
        return filteredCars.slice(0, number);
    }

    /**
     * Calculate the point a car will score
     * based on the user preferences
     * @param {Car} car - car to evaluate
     * @param {object} userPreferences - user preferences
     * @returns {number} corresponding score
     */
    calculateMatchScore(car, userPreferences) {
        const { preferredEngine, preferredDoorsNumber, preferredColors, preferredOptionals, preferredType } = userPreferences;
        let score = 0;

        if (preferredEngine && car.getEngine() === preferredEngine) score += 3;
        if (preferredDoorsNumber && car.getDoorsNumber() === preferredDoorsNumber) score += 2;
        if (preferredColors && preferredColors.includes(car.getColorsAvailable())) score += 1;
        if (preferredOptionals && preferredOptionals.some(optional =>
            car.getOptionalList().some(carOptional => carOptional.getName() === optional))) score += 2;
        if (preferredType && car.getType() === preferredType) score += 3;

        return score;
    }

    /**
     * Search similar cars in the car list
     * @param {CarSearch} carSearch 
     * @returns array with the results given
     */
    searchSimilarCars(carSearch){
        let results = []; //create an array where to save the results

        for(const car of this.#carList){
            if(carSearch.isSimilarTo(car))
                results.push(car.clone());
        }

        return results;
    }

    /**
     * Saves the showroom data to local storage.
     */
    saveToLocalStorage() {
        const showroomData = {
            carList: this.#carList.map(car => car.toJson()),
            brandList: this.#brandList.map(brand => brand.toJson()),
            optionalList: this.#optionalList.map(optional => optional.toJson())
        };
        localStorage.setItem('showroom', JSON.stringify(showroomData));
    }

    /**
     * Loads the showroom data from local storage.
     * @returns {Showroom} A new Showroom instance populated with data from local storage.
     */
    static loadFromLocalStorage() {
        let showroom = new Showroom();
        const showroomString = localStorage.getItem('showroom');
        if (showroomString) {
            const showroomData = JSON.parse(showroomString);

            showroom.#carList = showroomData.carList.map(carData => Car.fromJson(carData));
            showroom.#brandList = showroomData.brandList.map(brandData => Brand.fromJson(brandData));
            showroom.#optionalList = showroomData.optionalList.map(optionalData => Optional.fromJson(optionalData));
        }

        return showroom;
    }
}