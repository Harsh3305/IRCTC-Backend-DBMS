const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
const { createTrain, getTrain, getTrainFromSourceDestinaiton, getAllTrain, delayTrain, getAllCoachOfTrain } = require("./../../service/train_service");
const { getAllVacentSeatOfCoach } = require("./../../service/seat_service");
const {bookSeat} = require("./../../service/seat_service");
const {creatTicket} = require("./../../service/ticket");
const {createCoach, getCoachByID, getCoachesOfTrain, getbasePrice,getTrainIdFromCoachId, getTrainIdFromCoachId } = require("./../../service/coach_service");
// book ticket cluster
router.post("/bookTicketCluster", verifyUserAccessToken, async (req, res) => {
    try {
        /**
         * passengers = [
         *      {name:String,
         *      age:int
         *      gender: 'M, "F", "O"}
         * ]
         */
        const coach_id = req.body.coach_id;
        const user_id = req.body.user_id;
        const passengers = req.body.passengers;
        getAllVacentSeatOfCoach(coach_id, (error, result) => {
            if (error) {
                res.status(error.code).send(error.error_message);
            }
            else {
                try {
                    // number of passangers (number passanger <= seat of coach)
                    // ticket available in coach_id
                    if (passengers.length > result.length) {
                        res.status(500).send("Number of passangers are greater then available seats in coach");
                    }
                    else {
                        // update seat IS_SEAT_BOOKED = true
                        under_booking_seats = result.slice(0, passengers.length);
                        // seat book 
                        for (let i = 0; i<under_booking_seats.length; i++) {
                            const seat_id = seat[i].SEAT_ID;
                            bookSeat(seat_id, (error, result) => {
                                if (error) {
                                    res.status(error.code).send(error.error_message);
                                }
                                else {
                                    passengers[i].seat_id = seat_id;
                                }
                            });
                        }
                        // create ticket cluster
                        // create ticket
                        // create payment
                    }
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
                res.status(error.code).send(error.error_message);
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