/**
 * Enum for account roles.
 */
export const AccountRole = Object.freeze({
    ADMIN: 'amministratore',
    CLIENT: 'cliente',
});

/**
 * Function to get the enum of the account role
 * by the value given
 * @param {String} role
 * @returns corresponding key of the enum, NULL if the object is not found
 */
export function getAccountRoleByValue(role){
    for(const[key, value] of Object.entries(AccountRole)){
        if(value.toLowerCase() == role.toLowerCase())
            return key;
    }

    return null;
}

/**
 * Function to get the enum of the account role
 * by the key given
 * @param {string} role 
 * @returns corresponding key of the enum, NULL if the object is not found
 */
export function getAccountRoleByKey(role){
    for(const[key, value] of Object.entries(AccountRole)){
        if(key.toLowerCase() == role.toLowerCase())
            return key;
    }

    return null;
}