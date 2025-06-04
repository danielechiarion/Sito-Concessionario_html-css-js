import Car from '../js-backend/vehicle/Car.js';
import Brand from '../js-backend/vehicle/Brand.js';
import Optional from '../js-backend/vehicle/Optional.js';
import * as Engine from '../js-backend/vehicle/Engine.js';
import * as CarType from '../js-backend/vehicle/CarType.js';
import Showroom from '../js-backend/vehicle/Showroom.js';
import * as FilePath from '../js-backend/file/FilePath.js';

import * as TemplateParts from './template-parts.js';
import * as PrintPage from './print-items_admin-add-items.js';

let showroom;

async function addCar() {
    /* brand */
    const brandIndex = parseInt(document.getElementById("choice-brand").value, 10);
    const brand = showroom.getBrandList()[brandIndex];

    /* model */
    const model = document.getElementById("input-model").value;
    if(model === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il modello dell'auto");
        return;
    }

    /* check if all the number inputs are typed */
    if(document.getElementById("input-power").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire la potenza dell'auto");
        return null;
    }
    if(document.getElementById("input-price").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il prezzo dell'auto");
        return null;
    }
    if(document.getElementById("input-autonomy").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire l'autonomia dell'auto");
        return null;
    }
    if(document.getElementById("choice-seats").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire i posti dell'auto");
        return null;
    }
    if(document.getElementById("choice-doors").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire le porte dell'auto");
        return null;
    }
    if(document.getElementById("input-car-quantity").value === ""){
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il numero di vetture disponibili");
        return null;
    }    
    
    /* power, price, quantity,
    all number inputs */
    const power = parseInt(document.getElementById("input-power").value, 10);
    const price = parseInt(document.getElementById("input-price").value, 10);
    const engineAutonomy = parseInt(document.getElementById("input-autonomy").value, 10);
    const seats = parseInt(document.getElementById("choice-seats").value, 10);
    const doors = parseInt(document.getElementById("choice-doors").value, 10);
    const quantity = parseInt(document.getElementById("input-car-quantity").value, 10);

    /* engine selection */
    const engineSelect = document.getElementById("choice-engine");
    if(engineSelect == 0)
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima selezionare il motore dell'auto");
    const engineIndex = engineSelect.selectedIndex - 1; // -1 perché la prima è "Scegli il motore"
    const engineKeys = Object.keys(Engine.Engine);
    const engine = engineIndex >= 0 ? Engine.Engine[engineKeys[engineIndex]] : Engine.Engine.NOTHING;

    /* car type*/
    const carTypeCards = document.querySelectorAll(".card-car-type .btn-secondary-clicked");
    let carType = CarType.CarType.NOTHING;
    if (carTypeCards.length > 0) {
        const carTypeIndex = Array.from(document.querySelectorAll(".card-car-type .btn-card-details")).findIndex(btn =>
            btn.classList.contains("btn-secondary-clicked")
        );
        const carTypeKeys = Object.keys(CarType.CarType);
        if (carTypeIndex >= 0) carType = CarType.CarType[carTypeKeys[carTypeIndex]];
        else document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima selezionare il tipo di auto");
    }

    /* colors */
    const colorElements = document.querySelectorAll(".color-option-clicked");
    if(colorElements.length === 0)
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima selezionare almeno un colore per l'auto");
    const colorsAvailable = Array.from(colorElements).map(el => el.dataset.color);

    /* optionals */
    const optionalSwitches = document.querySelectorAll(".optional-switch");
    const optionalList = [];
    showroom.getOptionalList().forEach((opt, i) => {
        if (optionalSwitches[i] && optionalSwitches[i].checked) {
            optionalList.push(opt);
        }
    });

    /* main image */
    const mainImageInput = document.getElementById("file-main-image");
    if (!mainImageInput.files[0])
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire l'immagine principale dell'auto");
    const mainImage = mainImageInput.files[0] ? await FilePath.fileToBase64(mainImageInput.files[0]) : "";

    /* secondary images */
    const secondaryImagesInput = document.getElementById("file-secondary-images");
    const detailsImage = await Promise.all(Array.from(secondaryImagesInput.files).map(file => FilePath.fileToBase64(file)));

    const car = new Car(
        brand,
        model,
        carType,
        engine,
        power,
        engineAutonomy,
        price,
        seats,
        doors,
        quantity,
        mainImage,
        detailsImage,
        optionalList,
        colorsAvailable,
        -1
    );
    
    /* save and show messages */
    try {
        showroom.addCar(car);
        showroom.saveToLocalStorage();
        document.getElementById("add-car-message").innerHTML = TemplateParts.getSuccessMessage("Auto aggiunta con successo");
    } catch (error) {
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage(error);
    }
}

async function addBrand(){
    if(document.getElementById("input-brand-name").value === ""){
        document.getElementById("add-brand-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il nome del brand");
        return;
    }
    if(!document.getElementById("file-brand-logo").files[0]){
        document.getElementById("add-brand-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il logo del brand");
        return;
    }

    /* get the data of the brand */
    const name = document.getElementById("input-brand-name").value;
    const logo = await FilePath.fileToBase64(document.getElementById("file-brand-logo").files[0]);

    /* create the brand and check if 
    it's possible to add it */
    try{
        const brand = new Brand(name, logo);
        showroom.addBrand(brand);
        showroom.saveToLocalStorage();
        document.getElementById("add-brand-message").innerHTML = TemplateParts.getSuccessMessage("Marchio aggiunto con successo");
        PrintPage.printBrandSelect(showroom.getBrandList());
    }catch(error){
        if(!(error instanceof TypeError))
            document.getElementById("add-brand-message").innerHTML = TemplateParts.getErrorMessage("Marchio già esistente");
        else
            document.getElementById("add-brand-message").innerHTML = TemplateParts.getErrorMessage(error);
    }
}

function addOptional(){
    /* check if all data have been given */
    if(document.getElementById("input-optional-name").value === ""){
        document.getElementById("add-optional-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il nome dell'optional");
        return;
    }

    /* pick up the data */
    const name = document.getElementById("input-optional-name").value;
    const description = document.getElementById("input-optional-description").value;
    console.log(document.getElementById("input-optional-price").value);
    const price = parseInt(document.getElementById("input-optional-price").value, 10);

    /* create a new optional and try to
    add it to the shoowroom */
    try{
        const optional = new Optional(name, description, price, false);
        showroom.addOptional(optional);
        showroom.saveToLocalStorage();
        document.getElementById("add-optional-message").innerHTML = TemplateParts.getSuccessMessage("Optional aggiunto con successo");
        PrintPage.printCarOptionals(showroom.getOptionalList());
    }catch(error){
        if(!(error instanceof TypeError))
            document.getElementById("add-optional-message").innerHTML = TemplateParts.getErrorMessage("Optional già esistente");
        else
            document.getElementById("add-optional-message").innerHTML = TemplateParts.getErrorMessage(error);
    }
}

/* check if the showroom already exists */
if(localStorage.getItem("showroom") === null)
    showroom = new Showroom();
else
    showroom = Showroom.loadFromLocalStorage(JSON.parse(localStorage.getItem("showroom")));

/* add eventListener for all items
to be added by the admin */
document.getElementById("add-car-submit").addEventListener("click", addCar);
document.getElementById("add-brand-submit").addEventListener("click", addBrand);
document.getElementById("add-optional-submit").addEventListener("click", addOptional);