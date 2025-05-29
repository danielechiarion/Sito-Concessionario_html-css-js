import Brand from './Brand.js';
import Optional from './Optional.js';
import * as CarType from './CarType.js';
import * as Engine from './Engine.js';

/* Class to manage a Car */
export default class Car{
    /* define static attritute for ID counter */
    static IDCounter = localStorage.getItem("CarIDCounter");

    /**
     * Returns a new ID and uploads the counter on the 
     * local memory
     * @returns 
     */
    static newID(){
        if(Car.IDCounter == null)
            Car.IDCounter == 1;
        const newID = Car.IDCounter++;
        localStorage.setItem("CarIDCounter", Car.IDCounter);
        return newID;
    }

    /* define private attributes */
    #brand;
    #model;
    #minPower;
    #engine;
    #initialValue;
    #engineAutonomy;
    #seats;
    #doorsNumber;
    #type;
    #optionalList;
    #mainImage
    #detailsImage;
    #carDetailsPath;
    #quantityAvailable;
    #ID;
    #colorsAvailable;
    #htmlDetailsPage;

    /**
     * Constructor of a car
     * @param {Brand} brand 
     * @param {string} model 
     * @param {CarType} type 
     * @param {Engine} engine 
     * @param {number} minPower 
     * @param {number} engineAutonomy 
     * @param {number} initialValue 
     * @param {number} seats 
     * @param {number} doorsNumber 
     * @param {number} quantityAvailable 
     * @param {string} mainImage 
     * @param {string[]} detailsImage 
     * @param {Optional[]} optionalList 
     * @param {string[]} colorsAvailable
     * @param {number} ID 
     */
    constructor(brand, model, type, engine, minPower, engineAutonomy, initialValue, seats, doorsNumber, quantityAvailable, mainImage, detailsImage, optionalList, colorsAvailable, ID){
        this.#setBrand(brand);
        this.#model = model;
        this.setType(type);
        this.#setEngine(engine);
        this.setMinPower(minPower);
        this.setEngineAutonomy(engineAutonomy);
        this.setInitialValue(initialValue);
        this.setSeats(seats);
        this.#setDoorsNumber(doorsNumber);
        this.setQuantityAvailable(quantityAvailable);
        this.#mainImage = mainImage;
        this.#detailsImage = detailsImage;
        this.setID(ID);
        this.#optionalList = optionalList;
        this.#colorsAvailable = colorsAvailable;
    }

    /* private setters to check possible errors */
    #setBrand(newBrand){
        if(!(newBrand instanceof Brand) && newBrand !== null)
            throw new TypeError("brand requires an object of type Brand");

        this.#brand = newBrand;
    }

    #setEngine(newEngine){
        this.#engine = newEngine;
    }

    #setDoorsNumber(newDoorsNumber){
        if(typeof newDoorsNumber !== "number")
            throw new TypeError("doors number must be a number");

        this.#doorsNumber = newDoorsNumber;
    }

    /* public setters */
    /**
     * Sets a new type of car
     * @param {CarType} newType 
     */
    setType(newType){
        this.#type = newType;
    }

    /**
     * Sets a new ID for the car
     * @param {number} newID 
     * @throws {TypeError} if the ID is not a number
     */
    setID(newID){
        if(typeof newID !== "number")
            throw new TypeError("ID must be a number");
        this.#ID = newID;
    }

    /**
     * Sets a new engine autonomy
     * @param {number} newAutonomy 
     */
    setEngineAutonomy(newAutonomy){
        if(typeof newAutonomy !== "number")
            throw new TypeError("autonomy must be a number");

        this.#engineAutonomy = newAutonomy;
    }

    /**
     * Sets a new power of the car
     * @param {number} newPower
     */
    setMinPower(newPower){
        if(typeof newPower !== "number")
            throw new TypeError("power must be a number");

        this.#minPower = newPower;
    }

    /**
     * Sets a new intial value of the car
     * @param {number} newValue
     */
    setInitialValue(newValue){
        if(typeof newValue !== "number")
            throw new TypeError("car value must be a number");

        this.#initialValue = newValue;
    }

    /**
     * Sets a new number of seats
     * @param {number} newSeats
     */
    setSeats(newSeats){
        if(typeof newSeats !== "number")
            throw new TypeError("car seats must be a number");

        this.#seats = newSeats;
    }

    /**
     * Sets a new quantity available for cars
     * @param {number} newQuantity
     */
    setQuantityAvailable(newQuantity){
        if(typeof newQuantity !== "number")
            throw new TypeError("quantity available must be a number");

        this.#quantityAvailable = newQuantity;
    }

    /**
     * Sets a new optional List
     * @param {Optional[]} newOptionalList 
     */
    setOptionalList(newOptionalList){
        this.#optionalList = newOptionalList;
    }

    /**
     * Set the color of the car
     * @param {string} color 
     */
    setColor(color){
        this.#colorsAvailable = color;
    }

    /**
     * sets a new main image
     * @param {string} newMainImage 
     */
    setMainImage(newMainImage){
        this.#mainImage = newMainImage;
    }

    /**
     * sets new details image for the car
     * @param {string[]} newDetailsImage 
     */
    setDetailsImage(newDetailsImage){
        this.#detailsImage = newDetailsImage;
    }

    /* getters */

    /**
     * Returns the car brand.
     * @returns {Brand}
     */
    getBrand() {
        return this.#brand;
    }

    /**
     * Returns the car model.
     * @returns {string}
     */
    getModel() {
        return this.#model;
    }

    /**
     * Returns html details page with
     * all the information about the car
     * @returns html page name
     */
    getHtmlNamePage(){
        if(this.#htmlDetailsPage === null)
            this.#htmlDetailsPage = this.#brand.getName()+"-"+this.#model+"_"+this.#ID;
        return this.#htmlDetailsPage;
    }

    /**
     * Returns the minimum power of the car.
     * @returns {number}
     */
    getMinPower() {
        return this.#minPower;
    }

    /**
     * Returns the engine type of the car.
     * @returns {Engine}
     */
    getEngine() {
        return this.#engine;
    }

    /**
     * Returns the initial value of the car.
     * @returns {number}
     */
    getInitialValue() {
        const value = Number(this.#initialValue);
        return parseFloat(value.toFixed(2));
    }

    /**
     * Returns the engine autonomy.
     * @returns {number}
     */
    getEngineAutonomy() {
        return this.#engineAutonomy;
    }

    /**
     * Returns the number of seats.
     * @returns {number}
     */
    getSeats() {
        return this.#seats;
    }

    /**
     * Returns the number of doors.
     * @returns {number}
     */
    getDoorsNumber() {
        return this.#doorsNumber;
    }

    /**
     * Returns the car type.
     * @returns {CarType}
     */
    getType() {
        return this.#type;
    }

    /**
     * Returns the list of optionals cloned.
     * @returns {Optional[]}
     */
    getOptionalList() {
        return this.#optionalList.map(optional => optional.clone());
    }

    /**
     * Returns the main image path.
     * @returns {string}
     */
    getMainImage() {
        return this.#mainImage;
    }

    /**
     * Returns the details image path.
     * @returns {string}
     */
    getDetailsImage() {
        return this.#detailsImage;
    }

    /**
     * Returns the car details path.
     * @returns {string}
     */
    getCarDetailsPath() {
        return this.#carDetailsPath;
    }

    /**
     * Returns the available quantity.
     * @returns {number}
     */
    getQuantityAvailable() {
        return this.#quantityAvailable;
    }

    /**
     * Returns the car ID.
     * @returns {number}
     */
    getID() {
        return this.#ID;
    }

    /**
     * Returns the list of colors available
     * @returns list of colors available
     */
    getColorsAvailable(){
        return this.#colorsAvailable;
    }


    /* other methods */
    /**
     * Returns the path for the car details page.
     * The path is composed by the brand name, model, and ID.
     * @param {string} newOptional 
     */
    getDetailsPath(){
        return this.#brand.getName().trim()+"-"+this.#model.trim()+"_"+this.#ID.paddingStart(5, '0')+".html";
    }

    /**
     * change the status of an optional
     * @param {number} index 
     * @throws {TypeError} if the index is not a number
     */
    changeStatusOptional(index){
        if(typeof index !== "number")
            throw new TypeError("index must be a number");

        this.#optionalList[index].setStatus(!this.#optionalList[index].getStatus());
    }

    /**
     * Returns the total price of the car, 
     * starting from the initial value and adding the price of the active optionals.
     * @returns {number} the total price of the car
     */
    getPrice(){
        let price = this.#initialValue;
        for(const optional of this.#optionalList){
            if(optional.getStatus())
                price += optional.getPrice();
        }
        return parseFloat(price.toFixed(2));
    }

    /**
     * Returns if two cars are equals based on:
     * - ID (if available)
     * or
     * - brand
     * - model
     * - engine 
     * - doors number
     * @param {Car} otherCar 
     * @returns {boolean} true if the two cars are equals, false otherwise
     */
    equals(otherCar){
        if(!(otherCar instanceof Car))
            return false;

        /* first control if the ID is the same */
        if(otherCar.#ID>0 && otherCar.#ID !== this.#ID)
            return false;

        /* if the ID is not availble the method check if
        the brand, model, engine and doors number are equal
        between the two cars */
        if(otherCar.#brand.getName() !== this.#brand.getName())
            return false;
        if(otherCar.#model !== this.#model)
            return false;
        if(otherCar.#engine !== this.#engine)
            return false;   
        if(otherCar.#doorsNumber !== this.#doorsNumber)
            return false;  

        return true;
    }

    /**
     * Returns a clone of the car.
     * @returns {Car} clone of the car
     */
    clone() {
        return new Car(
            this.#brand.clone(),
            this.#model,
            this.#type,
            this.#engine,
            this.#minPower,
            this.#engineAutonomy,
            this.#initialValue,
            this.#seats,
            this.#doorsNumber,
            this.#quantityAvailable,
            this.#mainImage,
            this.getDetailsImage(),
            this.getOptionalList(),
            this.getColorsAvailable(), // aggiunto
            this.#ID
        );
    }

    /**
     * Creates a Car object from a JSON object.
     * @param {object} json 
     * @returns Car object
     */
    static fromJson(json) {
        return new Car(
            Brand.fromJson(json.brand),
            json.model,
            json.type,
            json.engine,
            json.minPower,
            json.engineAutonomy,
            json.initialValue,
            json.seats,
            json.doorsNumber,
            parseInt(json.quantityAvailable),
            json.mainImage,
            json.detailsImage,
            json.optionalList.map(optional => Optional.fromJson(optional)),
            json.colorsAvailable || [], // aggiunto
            json.ID
        );
    }

    /**
     * Converts the Car object to a JSON object.
     * @returns {object} JSON object representing the Car
     */
    toJson() {
        return {
            brand: this.#brand.toJson(),
            model: this.#model,
            type: this.#type,
            engine: this.#engine,
            minPower: this.#minPower,
            engineAutonomy: this.#engineAutonomy,
            initialValue: this.#initialValue,
            seats: this.#seats,
            doorsNumber: this.#doorsNumber,
            quantityAvailable: this.#quantityAvailable,
            mainImage: this.#mainImage,
            detailsImage: this.#detailsImage,
            optionalList: this.#optionalList.map(optional => optional.toJson()),
            colorsAvailable: this.#colorsAvailable, // aggiunto
            ID: this.#ID
        };
    }

    /**
     * Method to compare both cars using the 
     * available quantity of the cars
     * @param {Car} carA 
     * @param {Car} carB 
     * @returns result of comparison using reverse order
     */
    static compare(carA, carB){
        if(!(carA instanceof Car) || !(carB instanceof Car))
            throw new TypeError("Both arguments must be of the car type");

        return carB.getQuantityAvailable()-carA.getQuantityAvailable();
    }

}