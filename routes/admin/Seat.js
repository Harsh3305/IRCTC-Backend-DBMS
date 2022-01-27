const {createSeat, getAllVacentSeatOfCoach} = require("./../../service/seat_service");
const router = require("express").Router();
const {verifyAdminAccessToken} = require("./../verify_access_token");
router.post("/createSeat", verifyAdminAccessToken, async (req, res) => {
    try {
        const coach_id=req.body.coach_id;
        const seat_number=req.body.seat_number;
        const seat_type=req.body.seat_type;

        createSeat(coach_id, seat_number, seat_type, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});

router.get("/getVacantSeatOfCoach/:coach_id", verifyAdminAccessToken, async (req, res) => {
    try {
        const coach_id=req.params.coach_id;

        getAllVacentSeatOfCoach(coach_id, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});

module.exports = router;