const router = require("express").Router();
const { createUser, loginUser } = require("./../../service/auth_service");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

router.post("/login", async (req, res) => {
    // email
    // password
    try {
        const email = req.body.email;
        const password = req.body.password;

        // login user and send access token


        loginUser(email, password, (error, user_id, is_admin) => {
            if (error) {
                res.status(error).send("Account does not exist");
            }
            else {
                const accessToken = generateAccessToken(user_id, is_admin);
                res.status(200).json({ accessToken: accessToken, user_id: user_id });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong !!")
    }
});

router.post("/signup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const age = req.body.age;
        const phone = req.body.phone;
        const isAdmin = req.body.isAdmin;
        // sign up user and send access token

        createUser(email, password, username, age, phone, isAdmin, (error, user_id, is_admin) => {
            if (error) {
                res.status(error.error_code).json({ error: error.error_message });
            }
            else {
                const accessToken = generateAccessToken(user_id, is_admin);
                res.status(200).json({ accessToken: accessToken, user_id: user_id });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ error: 'Something went wrong !!' });
    }
});

function generateAccessToken(user_id, isAdmin) {
    const accessToken = CryptoJS.AES.encrypt(jwt.sign({
        id: user_id,
        isAdmin: isAdmin
    }, process.env.PUBLIC_KEY,
        { expiresIn: "1d" }), process.env.ACCESS_TOKEN_KEY).toString();

    return accessToken;
}

module.exports = router;