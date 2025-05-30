import User from '../js-backend/account/User.js';

import * as TemplateParts from './template-parts.js';

let user;

/* Check if the user logged. 
If it's not the page will open the login page, 
otherwise it will be possible to access for the user */
if(localStorage.getItem("loggedUser") === null){
    window.location.href = "login.html";
}

user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser"))); //gets the user

/* if the user has no purchases the program will return an error message,
otherwise all the purchases will be displayed */
if(user.getPurchaseList().length === 0)
    document.getElementById("table-container").innerHTML = TemplateParts.getErrorMessage("Nessun acquisto effettuato. Continua con la navigazione!");
else
    document.getElementById("table-container").innerHTML = TemplateParts.getTablePurchaseList(user.getPurchaseList());