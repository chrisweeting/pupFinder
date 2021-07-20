const Validator = require('validator');
const validText = require('./valid-text');

const validate = (data) => {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "The pup needs a name";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validate;