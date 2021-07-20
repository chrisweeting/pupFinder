const Validator = require('validator');
const validText = require('./valid-text');

const validate = (data) => {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Both password fields are required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 45 })) {
    errors.password = "Invalid password";
  }

  if (!Validator.equals(data.password,data.password2)) {
    errors.password = "Password fields must match";
  }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
};

module.exports = validate;