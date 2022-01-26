const router = require("express").Router();
const {verifyAdminAccessToken} = require("./../verify_access_token");
const { createStationStatus, updateStationStatus, deleteStationStatus, getStationStatusOfId, getStationStatusOfTrain, getStationDistance}= require("./../../service/station_status");

router.post("/createStationStatus", verifyAdminAccessToken,  async (req,res)=>{
    
    try {
        const train_id = req.body.train_id;
        const station_id = req.body.station_id;
        const arrival_time = req.body.arival_time;
        const departure_time = req.body.departure_time;
        createStationStatus(train_id,station_id,arrival_time,departure_time , (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong!!");
    }
    
});

router.get ("/getStationStatusOfTrain/:train_id", verifyAdminAccessToken, async (req, res)=> {
    try {
        const train_id = req.params.train_id;
        getStationStatusOfTrain(train_id, (error, result)=> {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (error) {
        res.send(500).send ("Something went wrong !!");
    }
})

router.get("/getStationDistance/:train_id/:station1_id/:station2_id", verifyAdminAccessToken, async (req, res)=> {
    try {
        const station1_id = req.params.station1_id;
        const station2_id = req.params.station2_id;
        const train_id = req.params.train_id;
        getStationDistance(train_id, station1_id, station2_id, (error, result)=> {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).send({"Distance":result});
            }
        })
    }
    catch (error) {
        res.send(500).send ("Something went wrong !!");
    }

});
module.exports = router;