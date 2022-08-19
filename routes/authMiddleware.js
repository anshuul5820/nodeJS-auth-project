module.exports.isAuth = (req, res, next) => {
  console.log('', req.isAuthenticated())

  if (req.isAuthenticated()) {
    next()
  } else res.status(401).json({ message: "You're not authorized" })
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next()
  } else res.status(401).json({ message: "You're not authorized" })
}
