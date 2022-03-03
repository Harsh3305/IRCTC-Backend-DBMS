const router = require("express").Router();
const { getTrain, getTrainFromSourceDestinaiton, getAllTrain, getAllCoachOfTrain } = require("../../service/train_service");
const { verifyUserAccessToken } = require("./../verify_access_token");

router.get("/getTrain/:train_id", verifyUserAccessToken, async (req, res) => {
    try {
        const train_id = req.params.train_id;

        // get Train

        getTrain(train_id, (error, responce) => {
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

router.get("/getTrain/:source_id/:destination_id", verifyUserAccessToken, async (req, res) => {
    try {
        const source_id = req.params.source_id;
        const destination_id = req.params.destination_id;

        // get Trains

        getTrainFromSourceDestinaiton(source_id, destination_id, (error, responce) => {
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

router.get("/getAllTrains", verifyUserAccessToken, (req, res) => {
    try {
        // get Trains
        getAllTrain((error, responce) => {
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

router.get("/getCoachOfTrain/:train_id", verifyUserAccessToken, async (req, res) => {
    try {
        const train_id = req.params.train_id;
        getAllCoachOfTrain(train_id, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});

module.exports = router;