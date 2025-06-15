import User from "../js-backend/account/User.js";
import * as AccountRole from "../js-backend/account/AccountRole.js";

import * as TemplateParts from "./template-parts.js";

/* file to have a custom navbar based 
on the type of user */
let currentAccount = localStorage.getItem("loggedUser");
if(currentAccount !== null) 
    currentAccount = User.fromJson(JSON.parse(currentAccount));

if(currentAccount !== null && currentAccount.getRole() === AccountRole.AccountRole.ADMIN && !window.location.href.includes("/pages/"))
    document.getElementById("navbar-container").innerHTML = TemplateParts.getNavbarAdminPosts();
else if(currentAccount !== null && currentAccount.getRole() === AccountRole.AccountRole.ADMIN)
    document.getElementById("navbar-container").innerHTML = TemplateParts.getNavbarAdmin();
else if(!window.location.href.includes("/pages/"))
    document.getElementById("navbar-container").innerHTML = TemplateParts.getNavbarCostumerPosts();
else    
    document.getElementById("navbar-container").innerHTML = TemplateParts.getNavbarCostumer();
