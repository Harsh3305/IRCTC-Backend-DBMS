const express = require("express");
const router = express.Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
const { deleteUser, getUser, updateUser } = require("./../../service/process_user_service");
router.put("/updateUser", verifyUserAccessToken, async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const age = req.body.age;
        const phone = req.body.phone;
        const user_id = req.headers.id
        // update up user and send access token

        updateUser(user_id, email, password, username, age, phone, 0, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(responce);
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong !!")
    }
});

router.delete("/deleteUser", verifyUserAccessToken, async (req, res) => {
    try {
        const user_id = req.params.id;
        // Delete User

        deleteUser(user_id, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(responce);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});

router.get("/getUser", verifyUserAccessToken, async (req, res) => {
    try {
        const user_id = req.params.id;
        // Get User by id

        getUser(user_id, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(responce);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});


module.exports = router;