import Showroom  from "../js-backend/vehicle/Showroom.js";
import Car from "../js-backend/vehicle/Car.js";
import * as FilePath from "../js-backend/file/FilePath.js";
import * as CarType from "../js-backend/vehicle/CarType.js";
import * as Engine from "../js-backend/vehicle/Engine.js";

import * as TemplateParts from "./template-parts.js";
import * as PrintPage from "./print-items_admin-change-items.js";

let showroom;

function printBrandCard(brand){
    document.getElementById("brand-card-preview").innerHTML = TemplateParts.getBrandCard(brand);
}

function changeBrand(){
    if(showroom.getBrandList().length === 0)
        return;

    /* show the different parts of the form before hidden */
    document.getElementById("brand-change-section").classList.remove("d-none");
    document.getElementById("brand-card-preview").classList.remove("d-none");
    document.getElementById("submit-brand-section").classList.remove("d-none");

    /* get the brandList and print the brand in the 
    preview card */
    const brandList = showroom.getBrandList();
    const indexSelected = parseInt(document.getElementById("brand-choice-brand").value, 10);

    printBrandCard(brandList[indexSelected]); //print the actual brand

    /* remove old event listeners to avoid problems */
    const buttonChange = document.getElementById("btn-change-brand");
    const buttonCancel = document.getElementById("btn-cancel-brand");
    const buttonDelete = document.getElementById("btn-delete-brand");

    buttonChange.replaceWith(buttonChange.cloneNode(true));
    buttonCancel.replaceWith(buttonCancel.cloneNode(true));
    buttonDelete.replaceWith(buttonDelete.cloneNode(true));

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
        showroom.changeBrand(brandList[indexSelected]); //change the brand
        showroom.saveToLocalStorage(); //save the changes

        /* success output message and reload the page */
        document.getElementById("brand-change-alert").innerHTML = TemplateParts.getSuccessMessage("Marchio modificato con successo!");
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    });

    document.getElementById("btn-cancel-brand").addEventListener("click", () => {
        window.location.reload(); //the only thing I can do is realoading the page
    });

    document.getElementById("btn-delete-brand").addEventListener("click", () => {
        /* change the showroom removing the brand */
        showroom.removeBrand(brandList[indexSelected]);
        showroom.saveToLocalStorage();
        /* output of the message
        and then reload the page */
        document.getElementById("brand-change-alert").innerHTML = TemplateParts.getSuccessMessage("Marchio rimosso con successo!");
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    });
}

function changeOptional(){
    if(showroom.getOptionalList().length === 0)
        return;

    /* display the parts of the optional
    form for changing it */
    document.getElementById("optional-change-section").classList.remove("d-none");
    document.getElementById("submit-optional-section").classList.remove("d-none");

    /* get the optionalList and the index of the value */
    const optionalList = showroom.getOptionalList();
    const indexSelected = parseInt(document.getElementById("optional-choice-optional").value, 10);

    /* fill the parts of the form with the current
    data of the optional */
    document.getElementById("input-optional-description").value = optionalList[indexSelected].getDescription();
    document.getElementById("input-optional-price").value = optionalList[indexSelected].getPrice();
    PrintPage.printSliders();

    /* delete previous event listeners to
    avoid the amount of many event listeners */
    const buttonChange = document.getElementById("btn-change-optional");
    const buttonCancel = document.getElementById("btn-cancel-optional");
    const buttonDelete = document.getElementById("btn-delete-optional");

    buttonChange.replaceWith(buttonChange.cloneNode(true));
    buttonCancel.replaceWith(buttonCancel.cloneNode(true));
    buttonDelete.replaceWith(buttonDelete.cloneNode(true));

    /* add event listener for every button is clicked */
    document.getElementById("btn-change-optional").addEventListener("click", () => {
        /* change the value of the optional */
        optionalList[indexSelected].setDescription(document.getElementById("input-optional-description").value);
        optionalList[indexSelected].setPrice(parseInt(document.getElementById("input-optional-price").value, 10));

        /* save it on the showroom */
        showroom.changeOptional(optionalList[indexSelected]);
        showroom.saveToLocalStorage();

        /* success message */
        document.getElementById("optional-change-alert").innerHTML = TemplateParts.getSuccessMessage("Optional modificato con successo!");
        setTimeout(function(){
            window.location.reload();
        }, 5000);
    });

    document.getElementById("btn-cancel-optional").addEventListener("click", () => {
        window.location.reload();
    });

    document.getElementById("btn-delete-optional").addEventListener("click", () => {
        /* remove the optional and save the showroom */
        showroom.removeOptional(optionalList[indexSelected]);
        showroom.saveToLocalStorage();

        /* output message */
        /* success message */
        document.getElementById("optional-change-alert").innerHTML = TemplateParts.getSuccessMessage("Optional eliminato con successo!");
        setTimeout(function(){
            window.location.reload();
        }, 5000);
    });
}

function searchCar(){
    /* variable declaration */
    let carShowroomBrands = [];
    let carSearch, brand, model, seats, engine;
    let results = [];

    /* collect all the brands it's possible to find in the showroom */
    for(let singleCar of showroom.getCarList()){
        if(carShowroomBrands.length === 0 || !carShowroomBrands.find(currentBrand => currentBrand.equals(singleCar.getBrand())))
            carShowroomBrands.push(singleCar.getBrand());
    }

    /* get the brand and do the first search */
    /* first find the cars with the same brand */
    brand = carShowroomBrands[parseInt(document.getElementById("car-choice-brand").value, 10)];
    carSearch = new Car(brand, "", CarType.CarType.NOTHING, Engine.Engine.NOTHING, -1, -1, -1, -1, -1, -1, "", null, null, null, -1);
    results = showroom.getCarList().filter(currentCar => currentCar.equals(carSearch));

    document.getElementById("label-car-model").classList.remove("d-none");
    document.getElementById("car-choice-model").classList.remove("d-none");
    document.getElementById("car-choice-model").innerHTML = TemplateParts.getFormSelectOptions(results.map(currentCar => currentCar.getModel()));

    if(results.size === 1)
        return results[0];

    /* then find the car based on the model */
}

showroom = Showroom.loadFromLocalStorage(); //read the showroon from local storage
/* hide some parts of the input before a brand is chosen */
document.getElementById("brand-change-section").classList.add("d-none");
document.getElementById("brand-card-preview").classList.add("d-none");
document.getElementById("submit-brand-section").classList.add("d-none");

/* hide some part of the optional
before some of them is chosen */
document.getElementById("optional-change-section").classList.add("d-none");
document.getElementById("submit-optional-section").classList.add("d-none");

/* hide some part of the car before nothing is chosen */
document.getElementById("label-car-model").classList.add("d-none");
document.getElementById("car-choice-model").classList.add("d-none");
document.getElementById("choice-engine").classList.add("d-none");
document.getElementById("choice-doors").classList.add("d-none");
document.getElementById("car-preview-container").classList.add("d-none");
document.getElementById("car-change-section").classList.add("d-none");
document.getElementById("submit-car-section").classList.add("d-none");

/* add event listener when a brand is selected */
document.getElementById("brand-choice-brand").addEventListener("change", changeBrand);
document.getElementById("brand-choice-brand").addEventListener("click", changeBrand);

/* add event listener when an optional is selected */
document.getElementById("optional-choice-optional").addEventListener("change", changeOptional);
document.getElementById("optional-choice-optional").addEventListener("click", changeOptional);

/* add all action when a car
has some attributes to be changed */
let car;
document.getElementById("car-choice-brand").addEventListener("change", () => {
    car = searchCar();
});
document.getElementById("car-choice-brand").addEventListener("click", () => {
    car = searchCar();
});