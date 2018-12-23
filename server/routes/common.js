module.exports = function (app, passport) {
  app.get('/api/user/login', isLoggedIn, function (req, res) {
    res.status(200).json({user: req.user})
  })

  app.post('/api/user/login', (req, res, next) => {
    passport.authenticate('local-login', (error, user, info) => {
      if (!user) res.status(404).json({info})
      else {
        req.login(user, (err) => {
          if (!err) {
            res.status(200).json({user: user.username})
          }
        })
      }
    })(req, res, next)
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({user: 'not logged in'})
}