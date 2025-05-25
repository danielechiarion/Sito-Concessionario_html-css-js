/**
 * Class used to manage different optionals
 */
export default class Optional{
    /* define private attributes */
    #description;
    #status;
    #price;

    /**
     * Constructor of an optional
     * @param {String} description 
     * @param {number} price 
     * @param {boolean} status 
     */
    constructor(description, price, status){
        this.#description = description;
        this.setPrice(price);
        this.setStatus(status);
    }

    /**
     * Gets the description of the optional
     * @returns description of the optional
     */
    getDescription(){
        return this.#description;
    }

    /**
     * Gets the status of the optional
     * @returns TRUE if the optional is active
     */
    getStatus(){
        return this.#status;
    }

    /**
     * Gets the price of the optional
     * @returns price of the optional
     */
    getPrice(){
        return this.#price;
    }

    /**
     * Sets a new description
     * @param {String} newDescription 
     */
    setDescription(newDescription){
        this.#description = newDescription;
    }

    /**
     * Sets a new price
     * @param {number} newPrice 
     * @throws Errors if the price is not a number or is less than 0
     */
    setPrice(newPrice){
        if(typeof newPrice !== "number")
            throw new TypeError("price requires a number");
        if(typeof newPrice < 0)
            throw new RangeError("the price must be >=0");

        this.#price = newPrice;
    }

    /**
     * Sets a new status
     * @param {boolean} newStatus 
     * @throws Errors if the param is not a boolean
     */
    setStatus(newStatus){
        if(typeof newStatus !== "boolean")
            throw new TypeError("status requires a boolean");

        this.#status = newStatus;
    }

    /**
     * Checks if two objects are equal
     * using their descriptions
     * @param {Optional} anotherOptional 
     * @returns TRUE if the objects are equal
     */
    equals(anotherOptional){
        if(!(anotherOptional instanceof Optional))
            return false;

        return this.#description.toLowerCase() === anotherOptional.#description.toLowerCase();
    }
    
    /**
     * Returns a clone of the optional
     * @returns clone of the optional
     */
    clone(){
        return new Optional(this.#description, this.#price, this.#status);
    }
}