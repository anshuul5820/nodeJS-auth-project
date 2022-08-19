const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
// const passport = require('passport')
const utils = require('../lib/utils')

// TODO
// session: false, using jwt, not session strategy
//passport.authenticate('jwt', { session: false })- use this to authorize any protected route
router.get(
  '/protected',
  utils.authMiddleware,
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    console.log('', req.jwt)
    res.status(200).json({ success: true, msg: 'youre authorized' })
  }
)

/**
 * flow for /login and /register:
 * someone registers, store it in db, issue jwt
 * some logs in, generate a new jwt, verify it
 */

// TODO
router.post('/login', function (req, res, next) {
  try {
    User.findOne({ username: req.body.username }).then(user => {
      if (!user)
        res.status(401).json({ success: false, msg: "couldn'nt find user" })

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      )

      if (isValid) {
        const tokenObject = utils.issueJWT(user)
        res.status(200).json({
          user,
          success: true,
          token: tokenObject.token,
          expires: tokenObject.expires,
        })
      } else {
        res
          .status(401)
          .json({ success: false, msg: 'you entered wrong password' })
      }
    })
  } catch (error) {
    next(err)
  }
})

// TODO
router.post('/register', function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
  })

  newUser
    .save()
    .then(user => {
      const id = user._id
      const jwt = utils.issueJWT(user)

      res.json({
        success: true,
        user,
        token: jwt.token,
        expiresIn: jwt.expires,
      })
    })
    .catch(err => next(err))
})

module.exports = router
