import * as TemplateParts from './template-parts.js';

import Showroom from '../js-backend/vehicle/Showroom.js';

let showroom;

function printOptionals(){
    if(showroom.getOptionalList().length === 0){
        document.getElementById("optional-table-container").innerHTML = TemplateParts.getErrorMessage("Nessun optional ancora aggiunto");
        return;
    }

    document.getElementById("optional-table-container").innerHTML = TemplateParts.getTableOptionals(showroom.getOptionalList());
}

function manageButtons(){
    const buttons = Array.from(document.querySelectorAll(".button-card-exhibition"));
    buttons.forEach(button => button.addEventListener("click", () => {
        if(button.classList.contains("card-button-selected"))
            button.classList.remove("card-button-selected");
        else
            button.classList.add("card-button-selected");
    }));
}

showroom = Showroom.loadFromLocalStorage(); //read the showroom

/* manage the items in the guide page */
printOptionals();
manageButtons();