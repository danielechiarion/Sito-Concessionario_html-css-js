import Car from '../js-backend/vehicle/Car.js';
import Brand from '../js-backend/vehicle/Brand.js';
import Optional from '../js-backend/vehicle/Optional.js';
import * as Engine from '../js-backend/vehicle/Engine.js';
import * as CarType from '../js-backend/vehicle/CarType.js';
import Showroom from '../js-backend/vehicle/Showroom.js';
import * as FilePath from '../js-backend/file/FilePath.js';

import * as TemplateParts from './template-parts.js';
import * as PrintPage from './print-items_admin-add-items.js';
import * as Spreadsheet from '../js-backend/file/Spreadsheets.js';

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
    const engineSelect = document.getElementById("choice-engine").value;
    if(engineSelect == 0)
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima selezionare il motore dell'auto");
    const engineIndex = parseInt(engineSelect) - 1; // -1 perché la prima è "Scegli il motore"
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
    if (!document.getElementById("file-main-image").files[0] && !document.getElementById("url-car-main-image").value)
        document.getElementById("add-car-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire l'immagine principale dell'auto");
    let mainImage;
    if(document.getElementById("url-car-main-image").value)
        mainImage = "https://"+document.getElementById("url-car-main-image").value;
    else
        mainImage = await FilePath.fileToBase64(document.getElementById("file-main-image").files[0]);

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
    if(!document.getElementById("file-brand-logo").files[0] && !document.getElementById("url-brand-image").value){
        document.getElementById("add-brand-message").innerHTML = TemplateParts.getErrorMessage("Devi prima inserire il logo del brand");
        return;
    }

    /* get the data of the brand */
    const name = document.getElementById("input-brand-name").value;
    let logo;
    if(!document.getElementById("url-brand-image").value)
        logo = await FilePath.fileToBase64(document.getElementById("file-brand-logo").files[0]);
    else
        logo = "https://"+document.getElementById("url-brand-image").value;

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

function manageBrandByFile(){
    /* manage the download of the template file */
    document.getElementById("download-brands-spreadsheet").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = Spreadsheet.getBrandTemplate();
        a.download = "brand-template.xlsx";
        a.click();
        document.removeChild(a);
    });

    let downloadMode = false;
    let fileError; // declare the variable to store the file errors
    /* manage the control of brands spreadsheet
    and return the possible errors */
    document.getElementById("add-brands-spreadsheet").addEventListener("click", async() => {
        if(!document.getElementById("file-spreadsheet-brands").files[0])
            return;

        if(!downloadMode){
            const workbook = await Spreadsheet.readExcelFile(document.getElementById("file-spreadsheet-brands").files[0]);
            const fileContent = Spreadsheet.getSheetCells(workbook);
            fileError = JSON.parse(JSON.stringify(fileContent)); //copy of the file content for errors
            const brandList = Spreadsheet.getBrandData(fileContent, fileError);
            if(brandList.length < fileContent.length -1){
                document.getElementById("alert-brands-spreadsheet").innerHTML = TemplateParts.getErrorMessage("Ci sono degli errori nel file. Scaricalo per visualizzarli"); //alert of possible errors
                document.getElementById("add-brands-spreadsheet").innerText = "Vedi gli errori";
                downloadMode = true;
            }else{
                /* copy all the brands into the showroom */
                for(const singleBrand of brandList){
                    try{
                        showroom.addBrand(singleBrand);
                    }catch(error){}
                }
                showroom.saveToLocalStorage();
                /* output of a success message */
                document.getElementById("alert-brands-spreadsheet").innerHTML = TemplateParts.getSuccessMessage("Marchi aggiunti con successo");
                PrintPage.printBrandSelect(showroom.getBrandList());
            }
        }else{
            /* download the file */
            const a = document.createElement("a");
            a.href = Spreadsheet.generateDownloadLinkFile(fileError);
            a.download = "brand-errors.xlsx";
            a.click();
            //document.removeChild(a);

            /* change the download mode and the name
            of the button */
            document.getElementById("add-brands-spreadsheet").innerText = "Carica risorse";
            downloadMode = false;
        }
    });
}

function manageOptionalByFile(){
    /* manage the download of the template file */
    document.getElementById("download-optionals-spreadsheet").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = Spreadsheet.getOptionalTemplate();
        a.download = "optional-template.xlsx";
        a.click();
        document.removeChild(a);
    });

    let downloadMode = false;
    let fileError; // declare the variable to store the file errors
    /* manage the control of optionals spreadsheet
    and return the possible errors */
    document.getElementById("add-optionals-spreadsheet").addEventListener("click", async() => {
        if(!document.getElementById("file-spreadsheet-optionals").files[0])
            return;

        if(!downloadMode){
            const workbook = await Spreadsheet.readExcelFile(document.getElementById("file-spreadsheet-optionals").files[0]);
            const fileContent = Spreadsheet.getSheetCells(workbook);
            fileError = JSON.parse(JSON.stringify(fileContent)); //copy of the file content for errors
            const optionalList = Spreadsheet.getOptionalData(fileContent, fileError);
            if(optionalList.length < fileContent.length -1){
                document.getElementById("alert-optionals-spreadsheet").innerHTML = TemplateParts.getErrorMessage("Ci sono degli errori nel file. Scaricalo per visualizzarli"); //alert of possible errors
                document.getElementById("add-optionals-spreadsheet").innerText = "Vedi gli errori";
                downloadMode = true;
            }else{
                /* copy all the optionals into the showroom */
                for(const singleOptional of optionalList){
                    try{
                        showroom.addOptional(singleOptional);
                    }catch(error){}
                }
                showroom.saveToLocalStorage();
                /* output of a success message */
                document.getElementById("alert-optionals-spreadsheet").innerHTML = TemplateParts.getSuccessMessage("Optional aggiunti con successo");
                PrintPage.printCarOptionals(showroom.getOptionalList());
            }
        }else{
            /* download the file */
            const a = document.createElement("a");
            a.href = Spreadsheet.generateDownloadLinkFile(fileError);
            a.download = "optional-errors.xlsx";
            a.click();
            //document.removeChild(a);

            /* change the download mode and the name
            of the button */
            document.getElementById("add-optionals-spreadsheet").innerText = "Carica risorse";
            downloadMode = false;
        }
    });
}

function manageCarByFile(){
    /* manage the download of the template file */
    document.getElementById("download-cars-spreadsheet").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = Spreadsheet.getCarTemplate();
        a.download = "car-template.xlsx";
        a.click();
        document.removeChild(a);
    });

    let downloadMode = false;
    let fileError; // declare the variable to store the file errors
    /* manage the control of optionals spreadsheet
    and return the possible errors */
    document.getElementById("add-cars-spreadsheet").addEventListener("click", async() => {
        if(!document.getElementById("file-spreadsheet-cars").files[0])
            return;

        if(!downloadMode){
            const workbook = await Spreadsheet.readExcelFile(document.getElementById("file-spreadsheet-cars").files[0]);
            const fileContent = Spreadsheet.getSheetCells(workbook);
            fileError = JSON.parse(JSON.stringify(fileContent)); //copy of the file content for errors
            const carList = Spreadsheet.getCarData(fileContent, fileError, showroom);
            if(carList.length < fileContent.length -1){
                document.getElementById("alert-cars-spreadsheet").innerHTML = TemplateParts.getErrorMessage("Ci sono degli errori nel file. Scaricalo per visualizzarli"); //alert of possible errors
                document.getElementById("add-cars-spreadsheet").innerText = "Vedi gli errori";
                downloadMode = true;
            }else{
                /* copy all the cars into the showroom */
                for(const singleCar of carList){
                    showroom.addCar(singleCar);
                }
                showroom.saveToLocalStorage();
                /* output of a success message */
                document.getElementById("alert-cars-spreadsheet").innerHTML = TemplateParts.getSuccessMessage("Macchine aggiunte con successo");
            }
        }else{
            /* download the file */
            const a = document.createElement("a");
            a.href = Spreadsheet.generateDownloadLinkFile(fileError);
            a.download = "car-errors.xlsx";
            a.click();
            //document.removeChild(a);

            /* change the download mode and the name
            of the button */
            document.getElementById("add-cars-spreadsheet").innerText = "Carica risorse";
            downloadMode = false;
        }
    });
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
manageBrandByFile();
manageOptionalByFile();
manageCarByFile();