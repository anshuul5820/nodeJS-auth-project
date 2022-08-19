const crypto = require('crypto')
const fs = require('fs')

//gens priv, pub key using ellicptic curve cryuptography
function genKeyPair() {
  //gens obj where keys are stored in props "privateKey" & "publicKey"
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, //bits- standard for rsa keys
    publicKeyEncoding: {
      type: 'pkcs1', //pub key cryptography standards 1
      format: 'pem', //most common fs choice
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  })

  fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey)
  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey)
}

genKeyPair()
