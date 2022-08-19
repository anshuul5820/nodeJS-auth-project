const passport = require('passport')
const { validPassword } = require('../lib/passwordUtils')
const LocalStrategy = require('passport-local').Strategy
const connection = require('./database')
const User = connection.models.User

const customFields = {
  usernameField: 'uname',
  passwordField: 'pword',
}

const verifyCallback = (username, password, done) => {
  console.log('', username, password)

  //done()-- pass results of auth to done()
  User.findOne({
    username,
  })
    .then(user => {
      //returns 401
      if (!user) return done(null, false)

      const isValid = validPassword(password, user.hash, user.salt)

      if (isValid) {
        return done(null, user)
      } else return done(null, false)
    })
    .catch(err => {
      done(err)
    })
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)
passport.serializeUser((user, done) => {
  console.log('serialize user')

  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  console.log('deserialize user')

  User.findById(userId)
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err))
})

// TODO: passport.use();
