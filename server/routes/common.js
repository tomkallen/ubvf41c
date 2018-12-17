module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.status(200).json({d: 1})
  })

  app.get('/login', function (req, res) {
    res.status(200).send("LOGIN")
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/signup', function (req, res) {
    res.send('signup', {message: req.flash('signupMessage')})
  })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  app.get('/profile', isLoggedIn, function (req, res) {
    res.status(200).json({user: req.user.username})
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/logout')
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}