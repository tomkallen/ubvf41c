const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const config = require('./server/config/config')
const passport = require('passport')
const session = require('express-session')

const app = express()

require('./server/config/passport')(passport)

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({secret: 'catsliketoeatsnails'}))
app.use(passport.initialize())
app.use(passport.session({maxAge: 3600000}))
app.use(express.static(__dirname + '/build'))
app.use(flash())

require('./server/routes/common')(app, passport)

const port = process.env.PORT || 8400
app.listen(port, () => console.log(`Server running on port ${port} !`))
