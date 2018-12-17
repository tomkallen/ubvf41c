const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function existingUserValidator (data) {
  const errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(String(data.username))) {
    errors.username = 'username field is required'
  } else if (!Validator.isAlphanumeric(String(data.username))) {
    errors.username = 'username is invalid'
  }

  if (Validator.isEmpty(String(data.password))) {
    errors.password = 'Password field is required'
  }
  return { errors, isValid: isEmpty(errors) }
}
