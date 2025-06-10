import Brand from '../vehicle/Brand.js';
import Car from '../vehicle/Car.js';
import Optional from '../vehicle/Optional.js';
import * as CarType from '../vehicle/CarType.js';
import * as Engine from '../vehicle/Engine.js';

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

