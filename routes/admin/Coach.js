const { createCoach, getCoachByID, getCoachesOfTrain, getbasePrice } = require("./../../service/coach_service");
const router = require("express").Router();
const { verifyAdminAccessToken } = require("./../verify_access_token");


router.post("/createCoach", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_id = req.body.train_id;
        const coach_type = req.body.coach_type;
        const price = req.body.price;
        createCoach(train_id, coach_type, price, (error, responce) => {
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


router.get("/getCoachByID/:coach_id", verifyAdminAccessToken, async (req, res) => {
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


router.get("/getCoachesByTrainId/:train_id", verifyAdminAccessToken, async (req, res) => {
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

router.get ("/getBasePrice/:coach_id/:source_station_id/:destination_station_id", verifyAdminAccessToken, async (req, res)=> {
    try {
        const coach_id = req.params.coach_id;
        const source_station_id = req.params.source_station_id;
        const destination_station_id = req.params.destination_station_id;

        getbasePrice(coach_id, source_station_id, destination_station_id, (error, result)=> {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json({"price without gst": result});
            }
        });
    }
    catch (error) {
        res.status(500).send("SOmething went wrong");
    }
});

module.exports = router;