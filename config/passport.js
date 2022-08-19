const fs = require('fs')
const path = require('path')
const User = require('mongoose').model('User')
const JwtStrategy = require('passport-jwt').Strategy

//used to extract JWT from req; usually lies in http header
const ExtractJwt = require('passport-jwt').ExtractJwt

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

// TODO
const options = {
  //Authorization: Bearer <token>: jwtFromRequest expects this kind of header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //PUB_KEY is passed bcoz verification part is being handled here; issued jwt is signed with pvt key
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}

const strategy = new JwtStrategy(options, (payload, done) => {
  //payload.sub contains _id of user
  User.findById({ _id: payload.sub })
    .then(user => {
      //jwt is already valid here
      //if user found, return user so user could be attached to passport obj
      if (user) return done(null, user)
      else return done(null, false)

      //if any jwt is generated from anywhere which is not signed using our, priv_key, auth will fail
      //to test, configure 'register' route to include a new jwt thats signed using our priv_key
    })
    .catch(err => done(err, null))
})

// TODO
//passport obj is provided from app.js
module.exports = passport => {
  passport.use(strategy)
}
