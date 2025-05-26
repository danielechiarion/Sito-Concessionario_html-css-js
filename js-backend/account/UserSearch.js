import User from "./User.js";

export default class UserSearch extends User {
    /**
     * Constructor that requires only username and password.
     * This is used for searching users in the system.
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, password){
        super("", "", username, password, null);
    }

    /**
     * Checks if the user can log in with the username and password.
     * This method checks if the username and password match.
     * @param {User} otherUser 
     * @returns TRUE if the username and password match, FALSE otherwise.
     * @throws {TypeError} If the argument is not an instance of User.
     */
    equals(otherUser){
        return super.equals(otherUser) && this.getPassword() === otherUser.getPassword();
    }

}