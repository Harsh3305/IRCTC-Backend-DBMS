const { getCoachByID, getCoachesOfTrain } = require("./../../service/coach_service");
const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");

router.get("/getCoachByID/:coach_id", verifyUserAccessToken, async (req, res) => {
    try {
        const coach_id = req.params.coach_id;
        getCoachByID(coach_id, (error, responce) => {
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

router.get("/getCoachesByTrainID/:train_id", verifyUserAccessToken, async (req, res) => {
    try {
        const train_id = req.params.train_id;


        getCoachesOfTrain(train_id, (error, responce) => {
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