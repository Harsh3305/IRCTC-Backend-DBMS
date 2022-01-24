const { createStation, getStation, getAllStation } = require("./../../service/station_service");
const router = require("express").Router();
const { verifyAdminAccessToken } = require("./../verify_access_token");

router.post("/createStation", verifyAdminAccessToken, async (req, res) => {
    try {

        const station_name = req.body.station_name;
        const type = req.body.type;
        const station_code = req.body.station_code;

        createStation(station_name, type, station_code, (error, responce) => {
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


router.get("/getStationByID/:station_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const station_id = req.params.station_id;


        getStation(station_id, (error, responce) => {
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


router.get("/getAllStation", verifyAdminAccessToken, async (req, res) => {
    try {
        getAllStation((error, responce) => {
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