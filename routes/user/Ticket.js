const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
const {createTrain,getTrain,getTrainFromSourceDestinaiton,getAllTrain,delayTrain,getAllCoachOfTrain} = require("./../../service/train_service");
const {getAllVacentSeatOfCoach} = require("./../../service/seat_service");
// book ticket cluster
router.post("/bookTicketCluster", verifyUserAccessToken, async (req, res) => {
    try {
        const coach_id = req.body.coach_id;
        const user_id = req.body.user_id;
        const passengers = req.body.passengers;
        getAllVacentSeatOfCoach(coach_id, (error, result) => {
            if (error) {
                res.status (error.code).send(error.message);
            }
            else {
                try {
                    // number of passangers (number passanger <= seat of coach)
                    // ticket available in coach_id
                    if(passengers>result.length) {
                        res.status(500).send("Number of passangers are greater then available seats in coach");
                    }
                    // else {
                    //     // update seat IS_SEAT_BOOKED = true
                    //     under_booking_seats = result.
                    // }
                }
                catch (error) {
                    
                    res.status(500).send("Number of passangers are greater then available seats in coach");
                }
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!")
    }

    // coach_id
    
    
    
    // create payment
});
// delete ticket cluster if user
// get all ticket cluster of user
// get all vacant seats of coach
router.get("/numberOfVacentSeat/:coach_id", verifyUserAccessToken, async (req, res) => {
    try {
        const coach_id = req.params.coach_id;
        getAllVacentSeatOfCoach(coach_id, (error, result) => {
            if (error) {
                res.status (error.code).send(error.message);
            }
            else {
                try {
                    res.status(200).send(result.length);
                }
                catch (error) {
                    res.status(200).send(0);
                }
            }
        });
    }
    catch (error) { }
});