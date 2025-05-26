import * as AccountRole from "../js-backend/account/AccountRole.js";
import User from "../js-backend/account/User.js";
import AccountManager from "../js-backend/account/AccountManager.js";

import * as TemplateParts from "./template-parts.js";

let accountManager;

function createAccount(){
    const name = document.getElementById("input-name").value;
    const surname = document.getElementById("input-surname").value;
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-first-password").value;
    const passwordConfirm = document.getElementById("input-second-password").value;

    /* check if the password are equal */
    if(password !== passwordConfirm) {
        document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Le password non coincidono");
        return;
    }

    const user = new User(name, surname, username, password, AccountRole.AccountRole.CLIENT);
    try{
        accountManager.addAccount(user);
        accountManager.saveLocalStorage();
        document.getElementById("signup-message").innerHTML = TemplateParts.getSuccessMessage("Account creato con successo");
    }catch(error){
        if(error.name !== "TypeError")
            document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Username già in uso");
        else
            document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage(error.message);
    }
}

/* add a default account for the administrator
of the site */
if(localStorage.getItem("accountManager") === null){
    accountManager = new AccountManager();
    accountManager.addAccount(new User("Administrator", "", "admin", "admin", AccountRole.AccountRole.ADMIN));
    accountManager.saveLocalStorage();
}

accountManager = AccountManager.loadLocalStorage();
document.getElementById("input-submit").addEventListener("click", createAccount);