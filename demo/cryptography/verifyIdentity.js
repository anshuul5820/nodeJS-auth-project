const crypto = require("crypto");
const fs = require("fs");
const decrypt = require("./decrypt");

//data recieced from sender(demo)
const receivedData = require("./signMessage").packageOfDataToSend;

//sha256 hash
const hash = crypto.createHash(receivedData.algorithm);

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const decryptedMessage = decrypt.decryptWithPublicKey(
    publicKey,
    receivedData.signedAndEncryptedData
);

const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest("hex");

const message =
    hashOfOriginalHex === decryptedMessageHex ? "Success" : "failure";

console.log("message: ", message);
