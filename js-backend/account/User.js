import Car from '../vehicle/Car.js';
import Purchase from '../operation/Purchase.js';

export default class User {
    /* define private attributes */
    #name;
    #surname;
    #username;
    #password;
    #role;
    #wishList;
    #purchaseList;
    #shoppingCart;

    /**
     * Constructor for the User class.
     * @param {string} name 
     * @param {string} surname 
     * @param {string} username 
     * @param {string} password 
     * @param {AccountRole} role 
     */
    constructor(name, surname, username, password, role){
        this.#name = name;
        this.#surname = surname;
        this.#username = username;
        this.#password = password;
        this.#purchaseList = [];
        this.#wishList = [];
        this.#shoppingCart = [];
        this.#role = role;
    }

    #setRole(roleName) {
        const role = AccountRole.getAccountRole(roleName);
        if(role === null) {
            throw new TypeError("Invalid role name");
        }

        this.#role = role;
    }

    /**
     * Returns the user's name.
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    /**
     * Sets the user's name.
     * @param {string} name
     */
    setName(name) {
        this.#name = name;
    }

    /**
     * Returns the user's surname.
     * @returns {string}
     */
    getSurname() {
        return this.#surname;
    }

    /**
     * Sets the user's surname.
     * @param {string} surname
     */
    setSurname(surname) {
        this.#surname = surname;
    }

   /**
     * Returns the user's username.
     * @returns {string}
     */
    getUsername() {
        return this.#username;
    }

    /**
     * Returns the user's password.
     * @returns {string}
     */
    getPassword() {
        return this.#password;
    }

    /**
     * Returns a deep clone of the user's shopping cart.
     * @returns {Car[]}
     */
    getShoppingCart(){
        return this.#shoppingCart.map(car => car.clone());
    }

    /**
     * Sets the user's shopping cart.
     * @param {Car[]} shoppingCart
     */
    setShoppingCart(shoppingCart) {
        this.#shoppingCart = shoppingCart;
    }

    /**
     * Sets the user's password.
     * @param {string} password
     */
    setPassword(password) {
        this.#password = password;
    }

    /**
     * Returns the user's role.
     * @returns {AccountRole}
     */
    getRole() {
        return this.#role;
    }

    /**
     * Returns a deep clone of the user's wish list.
     * Each car in the list is cloned.
     * @returns {Car[]}
     */
    getWishList() {
        return this.#wishList.map(car => car.clone());
    }

    /**
     * Returns a deep clone of the user's purchase list.
     * Each purchase in the list is cloned.
     * @returns {Purchase[]}
     */
    getPurchaseList() {
        this.#purchaseList.map(purchase => purchase.clone());
    }
    

    /**
     * Add a new car to the shopping cart
     * @param {Car} car
     * @throws {TypeError} if the car is not an instance of Car
     * @throws {Error} if the car has already been added 
     */
    addToShoppingCart(car){
        if(!(car instanceof Car))
            throw new TypeError("car must be an instance of Car");
        if(this.#shoppingCart.some(currentCar => currentCar.equals(car)))
            throw new Error("Card has already been added in the shopping cart");

        this.#shoppingCart.push(car);
    }

    /**
     * Remove a car from the user shopping cart
     * @param {Car} car
     * @throws {TypeError} if the car is not a Car instance
     * @throws {Error} if the car hasn't been found in the shopping cart 
     */
    removeFromShoppingCart(car){
        if(!(car instanceof Car))
            throw new TypeError("car must be a Car instance");
        
        const index = this.#shoppingCart.findIndex(currentCar => currentCar.equals(car));
        if(index === -1)
            throw new Error("car wasn't in the shopping cart");

        this.#shoppingCart.splice(index, 1);
    }

    /**
     * Add a new car to the wish list
     * @param {Car} car 
     * @throws {Error} If the car is already in the wish list.
     */
    addWish(car){
        if(!(car instanceof Car))
            throw new TypeError("car must be an instance of Car")
        if(this.#wishList.some(currentCar => currentCar.equals(car)))
            throw new Error("Car already in wish list");

        this.#wishList.push(car);
    }

    /**
     * Removes a car from the wish list.
     * @param {Car} car 
     * @throws {Error} If the car is not found in the wish list.
     */
    removeWish(car){
        const index = this.#wishList.findIndex(currentCar => currentCar.equals(car));
        if(index === -1) {
            throw new Error("Car not found in the wish list");
        }

        this.#wishList.splice(index, 1);
    }

    /**
     * Adds a purchase to the user's purchase list.
     * @param {Purchase} purchase 
     */
    addPurchase(purchase) {
        this.#purchaseList.push(purchase);
    }

    /**
     * Sets the user's wish list.
     * @param {Car[]} wishList 
     */
    setWishList(wishList) {
        this.#wishList = wishList;
    }
    
    /**
     * Sets the user's purchase list.
     * @param {Purchase} purchaseList 
     */
    setPurchaseList(purchaseList) {
        this.#purchaseList = purchaseList;
    }

    /**
     * Function to empty the user's shopping cart
     */
    emptyShoppingCart(){
        this.#shoppingCart = [];
    }

    
    /**
     * Method to purchase cars and move them
     * from the shopping cart to the purchase list
     */
    purchaseCars(){
        /* copy a clone of the cars in the purchase list */
        for(const car of this.#shoppingCart)
            this.addPurchase(new Purchase(car.clone(), new Date()));

        this.emptyShoppingCart();
    }

    /**
     * Method that returns the overall price
     * of the shopping cart
     * @returns {number} price of the cars
     */
    getShoppingCartPrice(){
        let price = 0;
        for(const car of this.#shoppingCart)
            price += car.getPrice();

        return price;
    }

    /**
     * Finds the preferences based on the purchases.
     * If the user hasn't bought preferences
     * @returns {object} Preferenze dell'utente.
     */
    findUserPreferences() {
        const allCars = [...this.#purchaseList, ...this.#wishList, ...this.#shoppingCart];

        if (!Array.isArray(allCars) || allCars.length === 0) {
            /* if there are no purchases, the code will return 
            null */
            const firstCars = this.getShoppingCart().slice(0, 5); // take the first five cars
            return {
                preferredEngine: firstCars[0]?.getEngine() || null,
                preferredDoorsNumber: firstCars[0]?.getDoorsNumber() || null,
                preferredColors: firstCars[0]?.getColorsAvailable() || [],
                preferredOptionals: firstCars[0]?.getOptionalList().map(optional => optional.getName()) || [],
                preferredType: firstCars[0]?.getType() || null
            };
        }

        /* calculate preferences based on the frequence
        of the different items */
        const preferredEngine = this.#findMostCommon(allCars.map(car => car.getEngine()));
        const preferredDoorsNumber = this.#findMostCommon(allCars.map(car => car.getDoorsNumber()));
        const preferredColors = this.#findMostCommonArray(allCars.flatMap(car => car.getColorsAvailable()));
        const preferredOptionals = this.#findMostCommonArray(
            allCars.flatMap(car => car.getOptionalList().map(optional => optional.getName()))
        );
        const preferredType = this.#findMostCommon(allCars.map(car => car.getType()));

        return {
            preferredEngine,
            preferredDoorsNumber,
            preferredColors,
            preferredOptionals,
            preferredType
        };
    }

    /**
     * Find the most common element in an
     * array
     * @param {Array} array - arry of elemets
     * @returns {any} most common element
     */
    #findMostCommon(array) {
        const frequency = array.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
    }

    /**
     * Find the most common element in an array
     * @param {Array} array array of elements
     * @returns {Array} most common elements
     */
    #findMostCommonArray(array) {
        const frequency = array.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(frequency).filter(key => frequency[key] === Math.max(...Object.values(frequency)));
    }    

    /**
     * Checks if this user is equal to another user based on their username.
     * @param {User} otherUser 
     * @returns {boolean} TRUE if the usernames are the same, FALSE otherwise.
     */
    equals(otherUser) {
        if(!(otherUser instanceof User)) {
            throw new TypeError("Argument must be an instance of User");
        }

        return this.#username === otherUser.#username;
    }

    /**
     * Method to clone the user.
     * @returns {User} A clone of the user.
     */
    clone(){
        const clonedUser = new User(this.#name, this.#surname, this.#username, this.#password, this.#role);
        clonedUser.#wishList = this.getWishList();
        clonedUser.#purchaseList = this.getPurchaseList();
        clonedUser.#shoppingCart = this.getShoppingCart();
        return clonedUser;
    }

    /**
     * Creates a User object from a JSON object.
     * @param {object} json 
     * @returns User object
     */
    static fromJson(json) {
        const user = new User(
            json.name,
            json.surname,
            json.username,
            json.password,
            json.role
        );
        user.setWishList(json.wishList.map(car => Car.fromJson(car)));
        user.setPurchaseList(json.purchaseList.map(purchase => Purchase.fromJson(purchase)));
        
        if (Array.isArray(json.shoppingCart)) {
            user.setShoppingCart(json.shoppingCart.map(car => Car.fromJson(car)));
        } else {
            user.setShoppingCart([]);
            console.warn("json.shoppingCart non è un array valido, inizializzato come array vuoto.");
        }
        
        return user;
    }

    /**
     * Converts the User object to a JSON object.
     * @returns {object} JSON object representing the User
     */
    toJson() {
        return {
            name: this.#name,
            surname: this.#surname,
            username: this.#username,
            password: this.#password,
            role: this.#role,
            wishList: this.#wishList.map(car => car.toJson()),
            purchaseList: this.#purchaseList.map(purchase => purchase.toJson()),
            shoppingCart: this.#shoppingCart.map(car => car.toJson())
        };
    }
}