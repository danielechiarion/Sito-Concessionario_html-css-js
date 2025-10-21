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
    if(name === "" && surname === ""){
        document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Devi inserire almeno il nome o il cognome");
        return;
    }
    if(password === "" || passwordConfirm === ""){
        document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Non puoi inserire una password vuota");
        return;
    }
    if(password !== passwordConfirm) {
        document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Le password non coincidono");
        return;
    }
    if(!document.getElementById("input-conditions").checked){
        document.getElementById("signup-message").innerHTML = TemplateParts.getErrorMessage("Devi accettare i termini le condizioni d'uso del sito");
        return;
    }

    const user = new User(name, surname, username, password, AccountRole.AccountRole.CLIENT);
    try{
        accountManager.addAccount(user);
        accountManager.saveLocalStorage();
        /* set also the sign-up user as the current one and 
        jump into it */
        localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
        document.getElementById("signup-message").innerHTML = TemplateParts.getSuccessMessage("Account creato con successo");
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 3000);
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