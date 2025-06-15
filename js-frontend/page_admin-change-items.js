import Showroom  from "../js-backend/vehicle/Showroom.js";
import Brand from "../js-backend/vehicle/Brand.js";
import Optional from "../js-backend/vehicle/Optional.js";
import Car from "../js-backend/vehicle/Car.js";
import * as FilePath from "../js-backend/file/FilePath.js";

import * as TemplateParts from "./template-parts.js";

let showroom;

function printBrandCard(brand){
    document.getElementById("brand-card-preview").innerHTML = TemplateParts.getBrandCard(brand);
}

function changeBrand(){
    /* show the different parts of the form before hidden */
    document.getElementById("brand-change-section").classList.remove("d-none");
    document.getElementById("brand-card-preview").classList.remove("d-none");
    document.getElementById("submit-brand-section").classList.remove("d-none");

    /* get the brandList and print the brand in the 
    preview card */
    const brandList = showroom.getBrandList();
    const indexSelected = parseInt(document.getElementById("brand-choice-brand").value, 10);

    printBrandCard(brandList[indexSelected]); //print the actual brand

    /* change the brand card every time a new path has been 
    given */
    document.getElementById("file-brand-logo").addEventListener("change", async () => {
        const newPath = await FilePath.fileToBase64(document.getElementById("file-brand-logo").files[0]);
        brandList[indexSelected].setLogoPath(newPath);
        printBrandCard(brandList[indexSelected]);
    });

    document.getElementById("url-brand-image").addEventListener("input", () => {
        brandList[indexSelected].setLogoPath("https://"+document.getElementById("url-brand-image").value);
        printBrandCard(brandList[indexSelected]);
    });

    /* add actions based on which button has been clicked */
    document.getElementById("btn-change-brand").addEventListener("click", () => {
        showroom.setBrandList(brandList);
    })
}

showroom = Showroom.loadFromLocalStorage(); //read the showroon from local storage
/* hide some parts of the input before a brand is chosen */
document.getElementById("brand-change-section").classList.add("d-none");
document.getElementById("brand-card-preview").classList.add("d-none");
document.getElementById("submit-brand-section").classList.add("d-none");

/* add event listener when a brand is selected */
document.getElementById("brand-choice-brand").addEventListener("change", changeBrand);
document.getElementById("brand-choice-brand").addEventListener("click", changeBrand);