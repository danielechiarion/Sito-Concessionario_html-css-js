import User from '../models/User.js';

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
     * Return the accoun by the index given.
     * @param {number} index 
     * @returns {User} The account at the specified index.
     * @throws {TypeError} If the index is not a number.
     * @throws {RangeError} If the index is out of range.
     */
    getAccount(index){
        if(typeof index !== 'number')
            throw new TypeError("index must be a number");
        if(index < 0 || index >= this.#accountList.length)
            throw new RangeError("index out of range");

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
        const accountManagerData = this.#accountList.map(account => {
            return {
                name: account.getName(),
                surname: account.getSurname(),
                username: account.getUsername(),
                password: account.getPassword(),
                role: account.getRole(),
                wishList: account.getWishList().map(car => {
                    return {
                        ...car,
                        __className: 'Car'
                    }
                }),
                purchaseList: account.getPurchaseList().map(purchase => {
                     return {
                        ...purchase,
                        __className: 'Purchase'
                    }
                })
            };
        });
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
            accountManager.#accountList = accountList.map(accountData => {
                const user = new User(
                    accountData.name,
                    accountData.surname,
                    accountData.username,
                    accountData.password,
                    accountData.role
                );
                user.setWishList(accountData.wishList.map(carData => {
                    return Object.assign(new Car(), carData);
                }));
                user.setPurchaseList(accountData.purchaseList.map(purchaseData => {
                    return Object.assign(new Purchase(), purchaseData);
                }));
                return user;
            });
        }

        return accountManager;
    }
}