import User from "../js-backend/account/User.js";

import * as TemplateParts from "./template-parts.js";

let user;

function printWishList(){
    if(user.getWishList().length === 0){
        document.getElementById("wish-list-container").innerHTML = TemplateParts.getErrorMessage("Lista dei desideri vuota. Continua la tua ricerca!");
        return null;
    }

    const elements = user.getWishList().map(car => TemplateParts.getCarCardWish(car));
    document.getElementById("wish-list-container").innerHTML = TemplateParts.getResultGridView(elements, 12, 6, 3);
}

/* first check if the user is available */
if(localStorage.getItem("loggedUser") === null)
    window.location.href = "login.html";

/* otherwise read the user */
user = User.fromJson(JSON.parse(localStorage.getItem("loggedUser")));

printWishList();