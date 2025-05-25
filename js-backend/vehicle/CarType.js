/**
 * Define enum for the type of car
 * @readonly
 * @enum
 */
export const CarType = Object.freeze({
    CITY: "City-car",
    SEDAN: "Berlina",
    SUV: "Suv",
    COUPE: "Coupé",
    SW: "Station Wagon",
    COMMERCIAL: "Commerciale",
    NOTHING: "Non specificato"
});

/**
 * Function to get the enum of the car type
 * by the value given
 * @param {String} type 
 * @returns corresponding key of the enum, NULL if the object is not found
 */
export function getCarType(type){
    for(const[key, value] of Object.entries(CarType)){
        if(value.toLowerCase() === type.toLowerCase())
            return key;
    }

    return null;
}