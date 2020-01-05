/* Function to check if the input is really empty.
I could not use the validator's built-in isEmpty() method as it can only take string and in my case, some of the stuffs I shall return in my login and register server-side alidations (like the 'errors' variable) are objects.
*/

const isEmpty = value =>
value === undefined ||
value === null ||
(typeof value === 'object' && Object.keys(value).length === 0) ||
(typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;