const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const verifyAccessToken = async (req, res, next) => {
    var token = req.headers.access_token;
    if (token) {
        token = token.split(":")[1];
        const decrypt_token = CryptoJS.AES.decrypt(token, process.env.ACESS_TOKEN_KEY).toString(CryptoJS.enc.Utf8);

        jwt.verify(decrypt_token, process.env.PUBLIC_KEY, (error, user) => {
            if (error) {
                return res.status(403).send("Invalid Token");
            }
            else {
                req.user = user;
                next();
            }
        })
    }
}
// user name password
// server => access token

// user id 

const verifyUserAccessToken = async (req, res, next) => {
    verifyAccessToken(req, res, async () => {
        if (req.user.id === req.params.id) {
            // verification
            next();
        }
        else {
            req.status(401).send("You are not allow to access other user details");
        }
    });
}

const verifyAdminAccessToken = async (req, res, next) => {
    verifyAccessToken(req, res, async () => {
        if (req.user.id === req.params.id && req.user.isAdmin) {
            // verification
            next();
        }
        else {
            req.status(401).send("You are not allow to access other user details");
        }
    });
}
module.exports = {verifyAdminAccessToken, verifyUserAccessToken}