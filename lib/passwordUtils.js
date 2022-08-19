const crypto = require('crypto')

// TODO
function validPassword(password, hash, salt) {
  console.log('validPassword')

  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  console.log('', hashVerify)

  return hash === hashVerify
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex')
  var hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt,
    hash,
  }
}

module.exports.validPassword = validPassword
module.exports.genPassword = genPassword
