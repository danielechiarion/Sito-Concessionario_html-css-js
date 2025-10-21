import AccountManager from "../js-backend/account/AccountManager.js";
import UserSearch from "../js-backend/account/UserSearch.js";
import User from "../js-backend/account/User.js";
import * as AccountRole from "../js-backend/account/AccountRole.js";

import * as TemplateParts from "./template-parts.js";

let accountManager = null;

function login() {
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    const userAttempt = new UserSearch(username, password);
    const userFound = accountManager.getAccount(userAttempt);
    if(userFound === null) {
        document.getElementById("login-message").innerHTML = TemplateParts.getErrorMessage("Username o password errati");
        return;
    }else{
        localStorage.setItem("loggedUser", JSON.stringify(userFound.toJson()));
        document.getElementById("login-message").innerHTML = TemplateParts.getSuccessMessage("Login effettuato con successo");
        window.location.href = "profile.html";
    }
}


/* add a default account for the administrator
of the site */
if(localStorage.getItem("accountManager") === null){
    accountManager = new AccountManager();
    accountManager.addAccount(new User("Administrator", "", "admin", "admin", AccountRole.AccountRole.ADMIN));
    accountManager.saveLocalStorage();
}

/* Check if a current user is logged, 
in that case it means the user want to log out */
accountManager = AccountManager.loadLocalStorage();
if(localStorage.getItem("loggedUser") !== null) {
    accountManager.logoutAccount(User.fromJson(JSON.parse(localStorage.getItem("loggedUser"))));
    document.getElementById("login-message").innerHTML = TemplateParts.getSuccessMessage("Logout effettuato con successo");
    localStorage.removeItem("loggedUser");
}

/* event listener for the login */
document.getElementById("input-submit").addEventListener("click", login);