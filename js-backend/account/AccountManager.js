import User from './User.js';
import UserSearch from './UserSearch.js';

/* class for the account management */
export default class AccountManager {
    /* define private attributes */
    #accountList;

    /**
     * Costructor for the AccountManager class.
     * Initializes an empty list of accounts.
     */
    constructor() {
        this.#accountList = [];
    }

    /**
     * Add a new account to the account list.
     * @param {User} account 
     * @throws {TypeError} If the argument is not an instance of User.
     * @throws {Error} If the account already exists in the list.
     */
    addAccount(account) {
        if (!(account instanceof User)) {
            throw new TypeError("Argument must be an instance of User");
        }
        const index = this.#accountList.findIndex(acc => acc.equals(account));
        if (index !== -1) 
            throw new Error("Account already exists");
        else {
            /* otherwise, add the new account */
            this.#accountList.push(account);
        }
    }

    /**
     * Remove an account from the account list.
     * @param {User} account 
     * @throws {TypeError} If the argument is not an instance of User.
     * @throws {Error} If the account is not found in the list.
     */
    removeAccount(account) {
        if (!(account instanceof User)) {
            throw new TypeError("Argument must be an instance of User");
        }
        const index = this.#accountList.findIndex(acc => acc.equals(account));
        if (index === -1) {
            throw new Error("Account not found");
        } else {
            /* otherwise, remove the account */
            this.#accountList.splice(index, 1);
        }
    }

    /**
     * Sets new credentials for an existing account.
     * @param {User} currentAccount 
     * @param {User} newAccount with the modified fields
     */
    setNewAccountCredentials(currentAccount, newAccount) {
        if(account.getName() !== "")
            currentAccount.setName(newAccount.getName());
        if(account.getSurname() !== "")
            currentAccount.setSurname(newAccount.getSurname());
        if(account.getPassword() !== "")
            currentAccount.setPassword(newAccount.getPassword());
    }

    /**
     * Return the accoun by the account given
     * @param {UserSearch} account account to be searched
     * @returns {User} The account at the specified index.
     * @return {null} if the account is not found.
     * @throws {TypeError} if it's not an instance of UserSearch.
     */
    getAccount(account){
        if(!(account instanceof UserSearch))
            throw new TypeError("index must be a user");
        
        const index = this.#accountList.findIndex(acc => account.equals(acc));
        if(index === -1) 
            return null;
        
        return this.#accountList[index];
    }

    /**
     * Returns the deep clone of the account list.
     * @returns {User[]} A cloned list of all accounts.
     */
    getAccountList(){
        return this.#accountList.map(account => account.clone());
    }

    /**
     * Saves the current account list to local storage.
     */
    saveLocalStorage() {
        const accountManagerData = this.#accountList.map(account => account.toJson());
        localStorage.setItem('accountManager', JSON.stringify(accountManagerData));
    }

    /**
     * Loads the account list from local storage.
     * @returns {AccountManager} A new AccountManager instance populated with data from local storage.
     */
    static loadLocalStorage() {
        let accountManager = new AccountManager();
        const StringAccountManager = localStorage.getItem('accountManager');
        if (StringAccountManager) {
            const accountList = JSON.parse(StringAccountManager);
            accountManager.#accountList = accountList.map(accountData => User.fromJson(accountData));
        }

        return accountManager;
    }
}