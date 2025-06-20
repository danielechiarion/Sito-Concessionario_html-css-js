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

function hideCarChangeSections(){
    document.getElementById("car-preview-container").classList.add("d-none");
    document.getElementById("car-change-section").classList.add("d-none");
    document.getElementById("submit-car-section").classList.add("d-none");
}

function searchCarDoors(arrayCars, onFound){
    onFound(arrayCars[parseInt(document.getElementById("choice-doors").value, 10)]);
    return;
}

function searchCarEngine(arrayCars, arrayEngines, onFound){
    let finalResult = null;
    
    /* choose the engine and find 
    the corresponding cars */
    const engine = arrayEngines[parseInt(document.getElementById("choice-engine").value, 10)];
    let results = arrayCars.filter(currentCar => currentCar.getEngine() === engine);

    if(results.length === 1){
        onFound(results[0]);
        return;
    }

    const doorsNumber = results.map(car => car.getDoorsNumber());

    /* show the doors number and prepare for the return value */
    const oldSelect = document.getElementById("choice-doors");
    const newSelect = oldSelect.cloneNode(true);
    oldSelect.parentNode.replaceChild(newSelect, oldSelect);

    document.getElementById("choice-doors").classList.remove("d-none");
    document.getElementById("choice-doors").innerHTML = TemplateParts.getFormSelectOptions(doorsNumber);
    document.getElementById("choice-doors").addEventListener("click", () => {
        searchCarDoors(results, function(finalResult){
            onFound(finalResult);
        });
    });
    document.getElementById("choice-doors").addEventListener("change", () => {
        hideCarChangeSections();
        searchCarDoors(results, function(finalResult){
            onFound(finalResult);
        });
    });

    return finalResult;
}

function searchCarModel(arrayCars, arrayModels, onFound){
    let finalResult = null;

    /* get the model and filter the results */
    let model = arrayModels[parseInt(document.getElementById("car-choice-model").value, 10)];
    let results = arrayCars.filter(currentCar => currentCar.getModel() === model);

    /* if we already have the car
    the result is returned */
    if(results.length === 1){
        onFound(results[0]);
        return;
    }

    /* search the different engines */
    let engineTypes = results.map(car => car.getEngine());
    engineTypes = engineTypes.filter((currentEngine, index, array) => array.findIndex(e => e === currentEngine)===index); //remove repetition
    document.getElementById("choice-engine").innerHTML = TemplateParts.getFormSelectOptions(engineTypes);

    /* otherwise the program will continue 
    the research */
    const oldSelect = document.getElementById("choice-engine");
    const newSelect = oldSelect.cloneNode(true);
    oldSelect.parentNode.replaceChild(newSelect, oldSelect);

    document.getElementById("choice-engine").classList.remove("d-none");
    document.getElementById("choice-engine").addEventListener("click", () => {
        searchCarEngine(results, engineTypes, function(finalResult){
            onFound(finalResult);
        });
    });
    document.getElementById("choice-engine").addEventListener("change", () => {
        document.getElementById("choice-doors").classList.add("d-none");
        hideCarChangeSections();
        searchCarEngine(results, engineTypes, function(finalResult){
            onFound(finalResult);
        });
    });

    return finalResult;
}

function searchCar(onFound){
    /* variable declaration */
    let carShowroomBrands = [];
    let carSearch, brand, finalResult = null;
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
    results = showroom.getCarList().filter(currentCar => currentCar.getBrand().equals(carSearch.getBrand()));
    const modelNames = results.filter((currentCar, index, array) => array.findIndex(c => c.getModel() === currentCar.getModel()) === index).map(car => car.getModel()); // remove repetitions

    document.getElementById("label-car-model").classList.remove("d-none");
    document.getElementById("car-choice-model").classList.remove("d-none");
    document.getElementById("car-choice-model").innerHTML = TemplateParts.getFormSelectOptions(modelNames);

    if(results.size === 1){
        onFound(results[0]);
        return;
    }

    /* then find the car based on the model */
    const oldSelect = document.getElementById("car-choice-model");
    const newSelect = oldSelect.cloneNode(true);
    oldSelect.parentNode.replaceChild(newSelect, oldSelect);

    document.getElementById("car-choice-model").addEventListener("click", () => {
       searchCarModel(results, modelNames, function(finalResult){
            onFound(finalResult);
        });
    });
    document.getElementById("car-choice-model").addEventListener("change", () => {
        /* hide all the other fields to be sure they won't be displayed */
        document.getElementById("choice-engine").classList.add("d-none");
        document.getElementById("choice-doors").classList.add("d-none");
        hideCarChangeSections();

        searchCarModel(results, modelNames, function(finalResult){
            onFound(finalResult);
        });
    });

    return finalResult;
}

function displayCarSection(car){
    /* than display alla the sections 
    in order to change the car */
    document.getElementById("car-preview-container").classList.remove("d-none");
    document.getElementById("submit-car-section").classList.remove("d-none");
    document.getElementById("car-change-section").classList.remove("d-none");
        
    document.getElementById("car-card-container").innerHTML = TemplateParts.getCarCardAdminChanges(car); //display the changes
    localStorage.setItem("carDetails", JSON.stringify(car.toJson())); //force car details
    
    /* in the change value display the current values
    so as to see where it's possible to change */
    const carTypes = Array.from(document.querySelectorAll(".card-car-type .btn-card-details"));
    carTypes.forEach(singleCarType => singleCarType.classList.remove("btn-secondary-clicked"));
    if(CarType.getPositionCarType(car.getType())>=0)
        carTypes[CarType.getPositionCarType(car.getType())].classList.add("btn-secondary-clicked"); //change the car-type

    /* select the colors */
    const colorsAvailable = car.getColorsAvailable();
    document.querySelectorAll(".color-option").forEach(option => {
        if(colorsAvailable.includes(option.getAttribute("data-color")))
            option.classList.add("color-option-clicked");
        else
            option.classList.remove("color-option-clicked");
    });

    /* print all the sliders values */
    document.getElementById("input-car-price").value = car.getInitialValue();
    document.getElementById("input-car-power").value = car.getMinPower();
    document.getElementById("input-car-autonomy").value = car.getEngineAutonomy();
    PrintPage.printSliders(); //refresh the slider to display the current values

    /* change the quantity available
    and the numbers of seats */
    document.getElementById("input-car-quantity").value = car.getQuantityAvailable();
    document.getElementById("choice-seats").value = car.getSeats();

    /* select the optionals that have been
    activated before */
    const carOptionals = car.getOptionalList();
    const optionalSwitches = Array.from(document.querySelectorAll(".car-single-optional"));
    showroom.getOptionalList().forEach((optional, index) => {
        if(carOptionals.find(singleOptional => singleOptional.equals(optional)))
            optionalSwitches[index].checked = true;
        else
            optionalSwitches[index].checked = false;
    });
}

async function getNewCar(car){
    /* generate a car clone */
    let carClone = car;

    /* read the data from the car.
    It's too difficult to verify if something has changed.
    So all the data will be read for a second time and set a the new values, 
    no matter if they are already in the car. 
    
    The only things the program will check are possible errors */
    
    /* get the car type */
    const carTypeIndex = Array.from(document.querySelectorAll(".card-car-type .btn-card-details")).findIndex(button => button.classList.contains("btn-secondary-clicked"));
    const carTypeValues = Object.values(CarType.CarType);
    if(carTypeIndex>=0 && carTypeIndex<carTypeValues.length)
        carClone.setType(carTypeValues[carTypeIndex]);

    /* get car colors */
    const colorsSelected = Array.from(document.querySelectorAll(".color-option-clicked"));
    if(colorsSelected.length === 0){
        document.getElementById("car-change-alert").innerHTML = TemplateParts.getErrorMessage("Devi prima selezionare almeno un colore");
        throw new Error("invalid colors selected");
    }
    carClone.setColorsAvailable(colorsSelected.map(el => el.dataset.color));

    /* read if there are some files to be changed */
    if(document.getElementById("file-main-image").files.length !== 0)
        carClone.setMainImage(await FilePath.fileToBase64(document.getElementById("file-main-image").files[0]));

    if(document.getElementById("url-car-main-image").value)
        carClone.setMainImage("https://"+document.getElementById("url-car-main-image").value);

    if(document.getElementById("file-secondary-images").files.length !== 0){
        const files = Array.from(document.getElementById("file-secondary-images").files);
        const secondaryImagesPaths = await Promise.all(files.map(singleFile => FilePath.fileToBase64(singleFile)));
        carClone.setDetailsImage(secondaryImagesPaths);
    }
    /* set the sliders value */
    carClone.setInitialValue(parseInt(document.getElementById("input-car-price").value, 10));
    carClone.setMinPower(parseInt(document.getElementById("input-car-power").value, 10));
    carClone.setEngineAutonomy(parseInt(document.getElementById("input-car-autonomy").value, 10));

    /* read the quantity available and the number of seats */
    if(parseInt(document.getElementById("input-car-quantity").value, 10)<0){
        document.getElementById("car-change-alert").innerHTML = TemplateParts.getErrorMessage("Non è possibile inserire una quantità negativa");
        throw new Error("invalid car quantity");
    }
    carClone.setQuantityAvailable(parseInt(document.getElementById("input-car-quantity").value, 10));

    carClone.setSeats(parseInt(document.getElementById("choice-seats").value, 10));

    /* read the optionals */
    const switchOptionals = Array.from(document.querySelectorAll(".car-single-optional"));
    const showroomOptionals = showroom.getOptionalList();
    let carOptionals = [];

    for(let i=0;i<switchOptionals.length;i++){
        if(switchOptionals[i].checked)
            carOptionals.push(showroomOptionals[i]);
    }

    carClone.setOptionalList(carOptionals);

    return carClone;
}

function changeCar(){
    searchCar(function(car){
        displayCarSection(car);

        /* delete previous event listeners to
        avoid the amount of many event listeners */
        const buttonChange = document.getElementById("btn-change-car");
        const buttonCancel = document.getElementById("btn-cancel-car");
        const buttonDelete = document.getElementById("btn-delete-car");

        buttonChange.replaceWith(buttonChange.cloneNode(true));
        buttonCancel.replaceWith(buttonCancel.cloneNode(true));
        buttonDelete.replaceWith(buttonDelete.cloneNode(true));

        /* add event listeners for different buttons */
        document.getElementById("btn-cancel-car").addEventListener("click", () => {
            window.location.reload();
        });

        document.getElementById("btn-delete-car").addEventListener("click", () => {
            showroom.removeCar(car); //delete the car
            showroom.saveToLocalStorage(); //save the changes

            /* successful message and reload of the page */
            document.getElementById("car-change-alert").innerHTML = TemplateParts.getSuccessMessage("Auto rimossa con successo!");
            setTimeout(function(){
                window.location.reload();
            }, 5000);
        });

        document.getElementById("btn-change-car").addEventListener("click", async () => {
            car = await getNewCar(car); //read the data of the car
            showroom.changeCar(car); //change the car
            showroom.saveToLocalStorage(car); //save the results
            localStorage.setItem("carDetails", JSON.stringify(car.toJson())); //force car details value

            document.getElementById("car-card-container").innerHTML = TemplateParts.getCarCardAdminChanges(car); //display the results
            document.getElementById("car-change-alert").innerHTML = TemplateParts.getSuccessMessage("Macchina modificata con successo!"); //get success message
            setTimeout(function(){
                window.location.reload() //reload the page after a timeout
            }, 5000);
        });
    });
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
hideCarChangeSections();

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
    /* hide all the other fields to be sure they won't be displayed */
    document.getElementById("car-choice-model").classList.add("d-none");
    document.getElementById("label-car-model").classList.add("d-none");
    document.getElementById("choice-engine").classList.add("d-none");
    document.getElementById("choice-doors").classList.add("d-none");

    hideCarChangeSections();
    changeCar();
});
document.getElementById("car-choice-brand").addEventListener("click", changeCar);