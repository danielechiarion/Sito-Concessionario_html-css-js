import Brand from '../vehicle/Brand.js';
import Car from '../vehicle/Car.js';
import Optional from '../vehicle/Optional.js';
import * as CarType from '../vehicle/CarType.js';
import * as Engine from '../vehicle/Engine.js';
import Showroom from '../vehicle/Showroom.js';

import * as FilePath from './FilePath.js';

/* declare constants to decide the number of attributes
to be read for each object */
export const BRANDATTRIBUTES = 2;
export const OPTIONALATTRIBUTES = 3;
export const CARATTRIBUTES = 14;

/* declare constants as headers of the input files
of the object, which has to be followed for a right
input of the data */
const BRANDHEADER = ['Nome marchio', 'Logo'];
const OPTIONALHEADER = ['Nome', 'Descrizione', 'Prezzo'];
const CARHEADER = ['Marca', 'Modello', 'Tipo', 'Alimentazione', 'Potenza', 'Prezzo', 'Autonomia', 'Posti', 'Porte', 'Optional', 'Colori', 'Quantità', 'Immagini principale', 'Dettagli auto'];

/**
 * Function to read the conten of an Excel file
 * @param {File} file 
 * @returns content of the file
 * @throws {TypeError} if the file is not an Excel file
 */
export function readExcelFile(file){
    if(!file.name.toLocaleLowerCase().endsWith('.xlsx') && !file.name.toLocaleLowerCase().endsWith('.xls'))
        throw new TypeError("Invalid file type. Only .xlsx and .xls files are supported.");

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                resolve(workbook);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Generate a link to download a file with
 * the content given
 * @param {string[][]} fileContent content of the spreadsheet 
 * @returns {URL} URL to download the file
 */
export function generateDownloadLinkFile(fileContent){
    /* create a worksheet and a workbook */
    const ws = XLSX.utils.aoa_to_sheet(fileContent);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Foglio1");

    /* write a  file and generate a blob */
    const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
    const blob = new Blob([wbout], {type: "application/octet-stream"});

    /* create a link to download the file */
    const url = URL.createObjectURL(blob);
    return url;
}

/**
 * Function that returns all the cell of the
 * spreadsheet
 * @param {string} fileContent 
 * @returns {string[][]} array of arrays with the content of the cells
 */
export function getSheetCells(fileContent){
    const firstSheet = fileContent.SheetNames[0];
    const worksheet = fileContent.Sheets[firstSheet];
    return XLSX.utils.sheet_to_json(worksheet, {header:1});
}

/**
 * Returns a template file for the brand
 * @returns {URL} URL to download the brand template file
 */
export function getBrandTemplate(){
    return generateDownloadLinkFile([BRANDHEADER]);
}

/**
 * Returns a template file for the car
 * @returns {URL} URL to download the car template file
 */
export function getCarTemplate(){
    return generateDownloadLinkFile([CARHEADER]);
}

/**
 * Returns a template file for the car
 * @returns {URL} URL to download the optional template file 
 */
export function getOptionalTemplate(){
    return generateDownloadLinkFile([OPTIONALHEADER]);
}

/**
 * Get the data brand and checks if they're correct
 * @param {string[][]} content content of the file
 * @param {string[][]} fileErrors file errors to be updated
 * @returns {Brand[]} brands read with this function
 */
export function getBrandData(content, fileErrors){
    let status; //check if the brand contains any errors
    let brands = [];

    for(let i=1; i<content.length; i++){
        /* when the program comes to an empty row, 
        it will stop the program */
        if (!content[i] || content[i].every(cell => cell === undefined || cell === null || cell.toString().trim() === "")) {
            break;
        }

        status = true;
        if(content[i][0] === undefined || content[i][0] === null || content[i][0].trim() === ''){
            fileErrors[i][0] = 'Brand name is missing';
            status = false;
        }

        if(content[i][1] === undefined || content[i][1] === null || content[i][1].trim() === ''){
            fileErrors[i][1] = 'File name is missing';
            status = false;
        }

        if(status)
            brands.push(new Brand(content[i][0].trim(), content[i][1].trim()));
    }

    return brands;
}

/**
 * Read the file content and returns the optionals read
 * and possible errors in the file
 * @param {string[][]} content content of the file 
 * @param {string[][]} fileErrors matrix of errors to be updated 
 * @returns 
 */
export function getOptionalData(content, fileErrors){
    let status; //check if the optional contains any errors
    let optionals = [];

    for(let i=1;i<content.length;i++){
        /* when the program comes to an empty row, 
        it will stop the program */
        if (!content[i] || content[i].every(cell => cell === undefined || cell === null || cell.toString().trim() === "")) {
            break;
        }

        status = true;
        /* check if the name and the price is present */
        if(content[i][0] === undefined || content[i][0] === null || content[i][0].trim() === ''){
            fileErrors[i][0] = 'Optional name is missing';
            status = false;
        }
        if(content[i][2] === undefined || content[i][2] === null || content[i][2] === ''){
            fileErrors[i][2] = 'Price is missing';
            status = false;
        }

        /* check if the price is a number and 
        his range */
        if(status && isNaN(content[i][2])){
            fileErrors[i][2] = 'Price must be an integer number';
            status = false;
        }
        const number = parseInt(content[i][2], 10);
        if(number < 50 || number > 5000){
            fileErrors[i][2] = 'Price must be between 50 and 5000';
            status = false;
        }

        /* if the optional has passed all the controls,
        it can be added to the list */
        if(status)
            optionals.push(new Optional(content[i][0].trim(), content[i][1], parseInt(content[i][2], 10), false));
    }

    return optionals;
}

/**
 * Check the data from a spreadsheet and converts it into a Car object, 
 * if it's able to read it. 
 * Otherwise there will be gathered all the errors of the file and pushed them into the cell with the error.
 * @param {string[][]} content content of a spreadsheet file, divided in cells 
 * @param {string[][]} fileErrors array to populate with the different file errors
 * @param {Showroom} showroom showroom where to get optionals and brands available
 * @returns {Car[]} list of cars read by the file without errors
 */
export function getCarData(content, fileErrors, showroom){
    let status;
    let cars = [];

    /* declare some variables */
    let brand;
    let secondaryImages = [];
    let colors = [];
    let optionalsSelected = [];
    
    for(let i=1; i<content.length;i++){
        status = true;

        /* first check if the brand exists */
        if(content[i][0] === undefined || content[i][0] === null || content[i][0].trim() === ''){
            fileErrors[i][0] = 'Brand name is missing';
            status = false;
        }else{
            const brandSearch = new Brand(content[i][0].trim(), "examplePath");
            brand = showroom.getBrandList().find(b => b.equals(brandSearch));
            if(!brand){
                fileErrors[i][0] = 'Brand does not exist';
                status = false;
            }
        }

        /* then control the model */
        if(content[i][1] === undefined || content[i][1] === null || content[i][1].trim() === ''){
            fileErrors[i][1] = 'Model is missing';
            status = false;
        }

        /* Then control the type and see
        if it matches with the types indicated */
        if(content[i][2] === undefined || content[i][2] === null || content[i][2].trim() === ''){
            fileErrors[i][2] = 'Car type is missing';
            status = false;
        }else if(CarType.getCarType(content[i][2])===null){
            fileErrors[i][2] = 'Car type is not valid';
            status = false;
        }

        /* Control the engine */
        if(content[i][3]===undefined || content[i][3] === null || content[i][3].trim() === ""){
            fileErrors[i][3] = 'Engine is missing';
            status = false;
        }else if(Engine.getEngine(content[i][3])===null){
            fileErrors[i][3] = 'Engine is not valid';
            status = false;
        }

        /* check the power. For each numeric input it's checked the presence,
        the validity and the range */
        if(content[i][4]===undefined || content[i][4]===null || content[i][4]===""){
            fileErrors[i][4] = "Power is missing";
            status = false;
        }else if(isNaN(content[i][4])){
            fileErrors[i][4] = "Power must be an integer number";
            status = false;
        }else if(parseInt(content[i][4], 10)<30 || parseInt(content[i][4], 10)>400){
            fileErrors[i][4] = "Power of a car must be between 30 and 400 KW";
            status = false;
        }

        /* then check the price in a similar way */
        if(content[i][5]===undefined || content[i][5]===null || content[i][5]===""){
            fileErrors[i][5] = "Price is missing";
            status = false;
        }else if(isNaN(content[i][5])){
            fileErrors[i][5] = "Price must be an integer number";
            status = false;
        }else if(parseInt(content[i][5], 10)<5000 || parseInt(content[i][5], 10)>200000){
            fileErrors[i][5] = "Power of a car must be between 5000 and 200000 €";
            status = false;
        }

        /* check the autonomy */
        if(content[i][6]===undefined || content[i][6]===null || content[i][6]===""){
            fileErrors[i][6] = "Autonomy is missing";
            status = false;
        }else if(isNaN(content[i][6])){
            fileErrors[i][6] = "Autonomy must be an integer number";
            status = false;
        }else if(parseInt(content[i][6], 10)<300 || parseInt(content[i][6], 10)>1500){
            fileErrors[i][6] = "Autonomy of a car must be between 300 and 1500km";
            status = false;
        }

        /* check the number of seats */
        if(content[i][7]===undefined || content[i][7]===null || content[i][7]===""){
            fileErrors[i][7] = "Seats number is missing";
            status = false;
        }else if(isNaN(content[i][7])){
            fileErrors[i][7] = "Seats number must be an integer";
            status = false;
        }else if(parseInt(content[i][7], 10)<2 || parseInt(content[i][7], 10)>8){
            fileErrors[i][7] = "Number of seats must be between 2 and 8";
            status = false;
        }

        /* check the doors number */
        if(content[i][8]===undefined || content[i][8]===null || content[i][8]===""){
            fileErrors[i][8] = "Doors number is missing";
            status = false;
        }else if(isNaN(content[i][8])){
            fileErrors[i][8] = "Doors number must be an integer";
            status = false;
        }else if(content[i][8]!=2 && content[i][8]!=3 && content[i][8]!=5 && content[i][8]!=7){
            fileErrors[i][8] = "Doors number must be 2,3,5 or 7";
            status = false;
        }

        /* check the optionals */
        if(content[i][9]!==null || content[i][9]!==undefined || content[i][9]!==""){
            let optionalList = content[i][9].split(","); //divide the different optionals
            if(!optionalList.every(singleOptional => showroom.getOptionalList().some(originalOptional => originalOptional.equals(new Optional(singleOptional, "", 1, false))))){
                fileErrors[i][9] = "Some optionals are not correct";
                status = false;
            }
        }

        /* check the colors available */
        if(content[i][10]===null || content[i][10]===undefined || content[i][10]===""){
            fileErrors[i][10] = "There must be at least one color available";
            status = false;
        }else{
            let colors = content[i][10].split(",");
            /* check if each color is expressed in the hex notation */
            if(!colors.every(singleColor => /^#[0-9a-fA-F]{6}$/.test(singleColor.trim()) || /^#[0-9a-fA-F]{3}$/.test(singleColor.trim()))){
                fileErrors[i][10] = "Some colors are not expressed in the correct HEX form";
                status = false;
            }   
        }

        /* check the quantity available */
        if(content[i][11]===undefined || content[i][11]===null || content[i][11]===""){
            fileErrors[i][11] = "Quantity is missing";
            status = false;
        }else if(isNaN(content[i][11])){
            fileErrors[i][11] = "Quantity must be an integer number";
            status = false;
        }else if(parseInt(content[i][11], 10)<1){
            fileErrors[i][11] = "Quantity of a car must be more than 0";
            status = false;
        }

        /* get the main image path of the car */
        if(content[i][12]===null || content[i][12]===undefined || content[i][12]===""){
            fileErrors[i][12] = "Main image path is missing";
            status = false;
        }

        /* get the secondary images paths */
        if(content[i][13]!==null && content[i][13]!==undefined && content[i][13]!==""){
            secondaryImages = content[i][13].split(" ");
        }

        if(status){
            optionalsSelected = content[i][9].split(",").map(optionalName => showroom.getOptionalList().find(currentOptional => currentOptional.equals(new Optional(optionalName, "", 1, false))));
            colors = content[i][10].split(",");

            cars.push(new Car(brand, content[i][1], CarType.getCarType(content[i][2]), Engine.getEngine(content[i][3]), parseInt(content[i][4], 10), parseInt(content[i][6], 10), parseInt(content[i][5], 10), parseInt(content[i][7], 10), parseInt(content[i][8], 10), parseInt(content[i][11], 10), content[i][2], secondaryImages, optionalsSelected, colors, Car.newID()));
        }
    }

    return cars;
}