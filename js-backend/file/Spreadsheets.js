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

