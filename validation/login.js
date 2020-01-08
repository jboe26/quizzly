const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {}
    // console.log(data)
      // convert all empty input by user to an empty string. Otherwise the next set of validators are not gonna work, as the validator library only works with string
    data.username = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.username = "Username is invalid";
    }

    if(Validator.isEmpty(data.email)) {
        errors.username = "Username field is required"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}