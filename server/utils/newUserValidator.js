const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function newUserValidator (data) {
  const errors = {}

  console.log(data)

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(String(data.username))) {
    errors.username = 'Username field is required'
  }

  if (Validator.isEmpty(String(data.password))) {
    errors.password = 'Password field is required'
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters'
  }

  return { errors, isValid: isEmpty(errors) }
}
