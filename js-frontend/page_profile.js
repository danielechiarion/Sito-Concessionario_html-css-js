import User from "../js-backend/account/User.js";
import AccountManager from "../js-backend/account/AccountManager.js";
import * as AccountRole from "../js-backend/account/AccountRole.js";

import * as TemplateParts from "./template-parts.js";

let user;
let accountManager;

function printAccountData(){
    document.getElementById("profile-name").innerText = user.getName();
    document.getElementById("profile-surname").innerText = user.getSurname();
    document.getElementById("profile-username").innerText = user.getUsername();

    document.getElementById("input-part-delete-account").classList.add("d-none");
}

function changeData(){
    const name = document.getElementById("input-name").value;
    const surname = document.getElementById("input-surname").value;
    const oldPassword = document.getElementById("input-old-password").value;
    const newPassword = document.getElementById("input-new-password").value;

    /* clear alert */
    document.getElementById("alert-success").classList.add("d-none");
    document.getElementById("alert-error").classList.add("d-none");

    /* verify the password */
    if(oldPassword !== "" && oldPassword !== user.getPassword()){
        document.getElementById("alert-error").innerHTML = TemplateParts.getErrorMessage("La password attuale non corrisponde");
        document.getElementById("alert-error").classList.remove("d-none");
        return;
    }

    if(newPassword !== "" && oldPassword === ""){
        document.getElementById("alert-error").innerHTML = TemplateParts.getErrorMessage("Per inserire una nuova password devi digitare quella attuale");
        document.getElementById("alert-error").classList.remove("d-none");
        return;
    }

    /* update the user data */
    if(name) user.setName(name);
    if(surname) user.setSurname(surname);
    if(newPassword) user.setPassword(newPassword);

    /* save and show the message */
    localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    printAccountData();
    document.getElementById("alert-success").innerHTML = TemplateParts.getSuccessMessage("Dati aggiornati con successo");
    document.getElementById("alert-success").classList.remove("d-none");
}

function removeAccount(){
    if(user.getRole() === AccountRole.AccountRole.ADMIN){
        document.getElementById("delete-account-error").innerHTML = TemplateParts.getErrorMessage("Non puoi eliminare un account amministratore");
        return;
    }

    document.getElementById("input-part-delete-account").classList.remove("d-none");
    
    /* wait till the password isn't typed */
    document.getElementById("submit-delete-account").addEventListener("click", () => {
        const password = document.getElementById("input-password-delete").value;

        if(password !== user.getPassword()){
            document.getElementById("delete-account-error").innerHTML = TemplateParts.getErrorMessage("La password non corrisponde");
            return;
        }

        accountManager.removeAccount(user); // delete the account
        accountManager.saveLocalStorage();
        localStorage.removeItem("loggedUser"); // remove the user from local storage
        window.location.href = "login.html"; // return to the login page
    });
}    

user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));
accountManager = AccountManager.loadLocalStorage();

printAccountData();
document.getElementById("input-submit-changes").addEventListener("click", changeData);
document.getElementById("submit-delete-account").addEventListener("click", removeAccount);