const { createCoach, getCoachByID, getCoachesOfTrain } = require("./../../service/coach_service");
const router = require("express").Router();
const { verifyAdminAccessToken } = require("./../verify_access_token");


router.post("/createCoach", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_id = req.body.train_id;
        const coach_type = req.body.coach_type;

        createCoach(train_id, coach_type, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.message);
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


router.get("/getCoachByID/:coach_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const coach_id = req.params.coach_id;


        getCoachByID(coach_id, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.message);
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


router.get("/getCoachesByTrainId/:train_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_id = req.params.train_id;


        getCoachesOfTrain(train_id, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.message);
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
