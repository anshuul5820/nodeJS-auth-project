const crypto = require("crypto");

//trapdoor fn: cant produce data from hash
const hash = crypto.createHash("sha256");

const fs = require("fs");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

const myData = {
    firstName: "Walter",
    lastName: "White",
    address: "chai dukaan",
};

const myDataString = JSON.stringify(myData);

//sets value on hash obj, requires string
hash.update(myDataString);

const hashedData = hash.digest("hex");

const senderPrivateKey = fs.readFileSync(
    __dirname + "/id_rsa_priv.pem",
    "utf8"
);

const signedMessage = encrypt.encryptWithPrivateKey(
    senderPrivateKey,
    hashedData
);

//returns gibberish
console.log("", signedMessage.toString());

//to check for data integrity, 2 conditions:
//which hash fn used
//provide original data-> create hash fn-> then compare
//also make public key available for reciever to verify
//integrity could be verified using pub key

//this is a heavy payload to be sent over network;
//can be sent as a lighter way: JWT
const packageOfDataToSend = {
    algorithm: "sha256",
    originalData: myData,
    signedAndEncryptedData: signedMessage,
};

module.exports.packageOfDataToSend = packageOfDataToSend;
