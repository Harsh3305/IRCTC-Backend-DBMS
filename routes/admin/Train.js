const router = require("express").Router();
const { createTrain, delayTrain, getTrain, getTrainFromSourceDestinaiton, getAllTrain } = require("../../service/train_service");
const { verifyAdminAccessToken } = require("./../verify_access_token")
router.post("/createTrain", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_name = req.body.train_name;
        const train_code = req.body.train_code;


        createTrain(train_name, train_code, (error, responce) => {
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


router.putst("/delayTrain", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_id = req.body.train_id;
        const delay = req.body.delay;


        delayTrain(train_id, delay, (error, responce) => {
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

router.get("/getTrain/:train_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const train_id = req.params.train_id;

        // get Train

        getTrain(train_id, (error, responce) => {
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

router.get("/getTrain/:source_id/:destination_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const source_id = req.params.source_id;
        const destination_id = req.params.destination_id;

        // get Trains

        getTrainFromSourceDestinaiton(source_id, destination_id, (error, responce) => {
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

router.get("getAllTrains", verifyAdminAccessToken, (req, res) => {
    try {
        // get Trains
        getAllTrain((error, responce) => {
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

module.exports = router;