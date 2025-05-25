/**
 * Enum with the engines that a car could have
 * @readonly
 * @enum
 */
export const Engine = Object.freeze({
    GASOLINE: "Benzina",
    METHANE: "Metano",
    DIESEL: "Diesel",
    LPG: "GPL",
    HYBRID: "Ibrido",
    ELECTRIC: "Elettrico",
    NOTHING: "Non specificato"
});

/**
 * Function that gets the engine type
 * by the value given
 * @param {String} engine 
 * @returns corresponding key of the enum
 */
export function getEngine(engine){
    for(const[key, value] of Object.entries(Engine)){
        if(value.toLowerCase() === engine.toLowerCase())
            return key;
    }

    return null;
}