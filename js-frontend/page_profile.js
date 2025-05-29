import User from "../js-backend/account/User.js";
import AccountManager from "../js-backend/account/AccountManager.js";

import * as TemplateParts from "./template-parts.js";

let user;
let accountManager;

function printAccountData(){
    document.getElementById("profile-name").innerText = user.getName();
    document.getElementById("profile-surname").innerText = user.getName();
    document.getElementById("profile-username").innerText = user.getUsername();
}

function changeData(){
    const name = document.getElementById("input-name").value;
    const surname = document.getElementById("input-surname").value;
    const oldPassword = document.getElementById("input-old-password").value;
    const newPassword = document.getElementById("input-new-password").value;

    if(name !== null)
        user.setName(name);
    if(surname !== null)
        user.setSurname(surname);

    /* check the passwords to see if they are
    good enough and correct */
    if(oldPassword !== null && oldPassword !== user.getPassword()){
        document.getElementById("alert-error").innerHTML = TemplateParts.getSuccessMessage("La password attuale non corrisponde");
        return;
    }
    if(newPassword !== null && oldPassword !== null){
        document.getElementById("alert-error").innerHTML = TemplateParts.getSuccessMessage("Prima di inserire una nuova password devi digitare quella attuale");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user.toJson()));
    printAccountData();
}

user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));
accountManager = AccountManager.loadLocalStorage();

printAccountData();
document.getElementById("input-submit-changes").addEventListener("click", changeData);