/**
 * Class for the brands of the cars
 */
export default class Brand{
    /* define private attributes */
    #name;
    #logoPath;

    /**
     * Constructor of a brand
     * @param {String} name name of the brand
     * @param {String} logoPath path of the brand icon
     */
    constructor(name, logoPath){
        this.#name = name;
        this.#logoPath = logoPath;
    }

    /**
     * Returns the name of the brand
     * @returns name of the brand
     */
    getName(){
        return this.#name;
    }

    /**
     * Returns the path of the logo
     * @returns logo path
     */
    getLogoPath(){
        return this.#logoPath;
    }

    /**
     * Sets a new path for the brand logo
     * @param {string} newPath 
     */
    setLogoPath(newPath){
        this.#logoPath = newPath;
    }

    /**
     * Checks if two objects are equal using the
     * name of the brand
     * @param {Brand} anotherBrand 
     * @returns TRUE if the brands are equal
     */
    equals(anotherBrand){
        if(!(anotherBrand instanceof Brand))
            return false;
        return this.#name.toLowerCase() === anotherBrand.#name.toLowerCase();
    }

    /**
     * Returns a clone of the Brand
     * @returns clone of the brand
     */
    clone(){
        return new Brand(this.#name, this.#logoPath);
    }

    /**
     * Creates a Brand object from a JSON object.
     * @param {object} json 
     * @returns Brand object
     */
    static fromJson(json) {
        return new Brand(json.name, json.logoPath);
    }

    /**
     * Converts the Brand object to a JSON object.
     * @returns {object} JSON object representing the Brand
     */
    toJson() {
        return {
            name: this.#name,
            logoPath: this.#logoPath
        };
    }
}