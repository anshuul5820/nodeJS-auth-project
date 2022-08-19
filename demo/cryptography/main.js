const fs = require('fs')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

//stores a buffer obj
const encryptedMessage = encrypt.encryptWithPublicKey(
  publicKey,
  'this is a secret message'
)

//cracking the message- this message is transported over any insecure transport layer
console.log('encrypted message', encryptedMessage.toString())

//encrypted messsage can be decrypted with priv key
const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8')

const decryptMessage = decrypt.decryptWithPrivateKey(
  privateKey,
  encryptedMessage
)

console.log('', decryptMessage.toString())
