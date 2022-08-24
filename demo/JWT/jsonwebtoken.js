//implementing encrypting & decrypting using jwt library
const fs = require("fs");
const jwt = require("jsonwebtoken");

const PUB_KEY = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");
const PRIV_KEY = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");

const payloadObj = {
    sub: "dsfsdfsf",
    name: "Walter White",
    admin: true,
    iat: 1516230922,
};

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: "RS256" });

jwt.verify(signedJWT, PUB_KEY, { algorithms: ["RS256"] }, (err, payload) => {
    console.log("", payload);
});
