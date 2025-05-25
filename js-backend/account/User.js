import Car from '../vehicle/Car.js';
import Purchase from '../operation/Purchase.js';
import * as AccountRole from './AccountRole.js';

/**
 * Class representing a user in the system.
 */
export default class User {
    /* define private attributes */
    #name;
    #surname;
    #username;
    #password;
    #role;
    #wishList;
    #purchaseList;

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
     * Add a new car to the wish list
     * @param {Car} car 
     * @throws {Error} If the car is already in the wish list.
     */
    addWish(car){
        if(this.#wishList.some(currentCar => currentCar.equals(car)))
            throw new Error("Car already in wish list");

        this.#wishList.push(car.clone());
    }

    /**
     * Removes a car from the wish list.
     * @param {Car} car 
     * @throws {Error} If the car is not found in the wish list.
     */
    removeWish(car){
        const index = this.#wishList.findIndex(currentCar => currentCar.equals(car));
        if(index === -1) {
            throw new Error("Car not found in wish list");
        }

        this.#wishList.splice(index, 1);
    }

    /**
     * Adds a purchase to the user's purchase list.
     * @param {Purchase} purchase 
     */
    addPurchase(purchase) {
        this.#purchaseList.push(purchase.clone());
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
     * Checks if the user can log in with the username and password.
     * This method checks if the username and password match.
     * @param {User} otherUser 
     * @returns TRUE if the username and password match, FALSE otherwise.
     * @throws {TypeError} If the argument is not an instance of User.
     */
    login(otherUser){
        return this.equals(otherUser) && this.#password === otherUser.#password;
    }

    /**
     * Method to clone the user.
     * @returns {User} A clone of the user.
     */
    clone(){
        const clonedUser = new User(this.#name, this.#surname, this.#username, this.#password, this.#role);
        clonedUser.#wishList = this.getWishList();
        clonedUser.#purchaseList = this.getPurchaseList();
        return clonedUser;
    }
}