const { createStation, getStation, getAllStation } = require("./../../service/station_service");
const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");

router.get("/getStationByID/:station_id", verifyUserAccessToken, async (req, res) => {
    try {
        const station_id = req.params.station_id;


        getStation(station_id, (error, responce) => {
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


router.get("/getAllStation", verifyUserAccessToken, async (req, res) => {
    try {
        getAllStation((error, responce) => {
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