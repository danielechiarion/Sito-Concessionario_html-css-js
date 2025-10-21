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
const purchaseList = user.getPurchaseList();

/* if the user has no purchases the program will return an error message,
otherwise all the purchases will be displayed */
if(purchaseList.length === 0){
    document.getElementById("table-container").innerHTML = TemplateParts.getErrorMessage("Nessun acquisto effettuato. Continua con la navigazione!");
    throw new Error("no car available"); //throw an error to interrupt the execution of the script
}
else
    document.getElementById("table-container").innerHTML = TemplateParts.getTablePurchaseList(purchaseList);

/* check for each row if the the details button
is clicked and upload the car to be viewed on the local storage */
Array.from(document.querySelectorAll("table tbody .btn-secondary")).forEach((button, index) => {
    button.addEventListener("click", () => {
        localStorage.setItem("carDetails", JSON.stringify(purchaseList[index].getCar().toJson()));
        localStorage.setItem("previousPage", window.location.href);
    });
});