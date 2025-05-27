/**
 * Class used to manage different optionals
 */
export default class Optional{
    /* define private attributes */
    #name;
    #description;
    #status;
    #price;

    /**
     * Constructor of an optional
     * @param {String} name
     * @param {String} description 
     * @param {number} price 
     * @param {boolean} status 
     */
    constructor(name, description, price, status){
        this.#name = name;
        this.#description = description;
        this.setPrice(price);
        this.setStatus(status);
    }

    /**
     * Returns the name of the optional
     * @returns name of the optional
     */
    getName(){
        return this.#name;
    }

    /**
     * Sets a new name for the optional
     * @param {string} newName new name of the optional
     */
    setName(newName){
        this.#name = newName;
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
            throw new TypeError("Price must be a number");
        
        if(newPrice < 0)
            throw new RangeError("the price must be >=0");

        this.#price = newPrice;
    }

    /**
     * Sets a new status
     * @param {boolean} newStatus 
     * @throws TypeError if status is not a boolean
     */
    setStatus(newStatus){
        if(typeof newStatus !== "boolean")
            throw new TypeError("status must be a boolean");
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

        return this.#name.toLowerCase() === anotherOptional.#name.toLowerCase();
    }
    
    /**
     * Returns a clone of the optional
     * @returns clone of the optional
     */
    clone(){
        return new Optional(this.#name, this.#description, this.#price, this.#status);
    }

    /**
     * Creates an Optional object from a JSON object.
     * @param {object} json 
     * @returns Optional object
     */
    static fromJson(json) {
        return new Optional(json.name, json.description, json.price, json.status);
    }

    /**
     * Converts the Optional object to a JSON object.
     * @returns {object} JSON object representing the Optional
     */
    toJson() {
        return {
            name: this.#name,
            description: this.#description,
            price: this.#price,
            status: this.#status
        };
    }
}