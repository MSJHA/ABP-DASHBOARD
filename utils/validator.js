const emailValidationRegEx = /^[\w._%+-]+@[\w.-]+\.[\w]{2,5}$/i;

const exist = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

const isEmptyObject = (obj) => {
    if(Object.keys(obj).length === 0) return true;
    return false;
}

module.exports = {
    emailValidationRegEx,
    exist,
    isEmptyObject
}