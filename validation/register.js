const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    // we start of with an empty errors object and if all the input data is valid, then by the end of the function execution, this object will remain empty.
    let errors = {}

    // convert all empty input by user to an empty string. Otherwise the next set of validators are not gonna work, as the validator library only works with string
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'First Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = 'First Name field is required'
    }

    if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
        errors.lastname = 'Last Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Last Name field is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.username = 'Username field is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 character"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
      };

}
