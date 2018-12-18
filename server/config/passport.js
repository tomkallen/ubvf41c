const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userAuthModel')
const bcrypt = require('bcryptjs')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) { done(null, user.id) })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) { done(err, user) })
  })

  passport.use('local-signup', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      User.findOne({username}, function (err, user) {
        if (err) return done(err)
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        } else {
          const newUser = new User()
          newUser.username = username
          newUser.password = newUser.generateHash(password)
          newUser.save(function (err) {
            if (err) throw err
            return done(null, newUser)
          })
        }
      })
    }))

  passport.use('local-login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      User.findOne({username}, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false, 'No user found')
        bcrypt.compare(password, user.password)
          .then(match => {
            if (!match) return done(null, false, 'Wrong password')
            return done(null, user)
          })
      })
    }))
}