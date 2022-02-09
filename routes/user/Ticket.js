const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
const { createTrain, getTrain, getTrainFromSourceDestinaiton, getAllTrain, delayTrain, getAllCoachOfTrain } = require("./../../service/train_service");
const { getAllVacentSeatOfCoach } = require("./../../service/seat_service");
const { bookSeat, getAllSeatOfTicketCluster, cancellSeat } = require("./../../service/seat_service");
const { creatTicket } = require("./../../service/ticket");
const { createTicketCluster, getTicketClusterIdforUser, getTicketCluster, deleteTicketCluster } = require("./../../service/ticket_cluster");
const { createCoach, getCoachByID, getCoachesOfTrain, getbasePrice, getTrainIdFromCoachId } = require("./../../service/coach_service");
const { creatPayment } = require("./../../service/payment");
const { creatPassanger } = require("./../../service/passanger");
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
        const user_id = req.headers.id;
        const passengers = req.body.passengers;
        const source_id = req.body.source_id;
        const destination_id = req.body.destination_id;
        const train_id = req.body.train_id;
        const train_departure_time = req.body.train_departure_time;

        // getAllVacentSeatOfCoach(coach_id, (error, result) => {
        //     if (error) {
        //         res.status(error.error_code).send(error.error_message);
        //     }
        //     else {
        //         try {
        //             // number of passangers (number passanger <= seat of coach)
        //             // ticket available in coach_id
        //             if (passengers.length > result.length) {
        //                 res.status(500).send("Number of passangers are greater then available seats in coach");
        //             }
        //             else {
        //                 // update seat IS_SEAT_BOOKED = true
        //                 under_booking_seats = result.slice(0, passengers.length);
        //                 // seat book 
        //                 for (let i = 0; i < under_booking_seats.length; i++) {
        //                     const seat_id = under_booking_seats[i].SEAT_ID;
        //                     bookSeat(seat_id, (error, result) => {
        //                         if (error) {
        //                             res.status(error.error_code).send(error.error_message);
        //                         }
        //                         else {
        //                             passengers[i].seat_id = seat_id;
        //                             // create ticket cluster
        //                             createTicketCluster(train_departure_time, source_id, destination_id, train_id, (error, ticket_cluster_id) => {
        //                                 if (error) {
        //                                     res.status(error.error_code).send(error.error_message);
        //                                 }
        //                                 else {
        //                                     getbasePrice(coach_id, source_id, destination_id, (error, totalPrice) => {
        //                                         if (error) {
        //                                             res.status(error.error_code).send(error.error_message);
        //                                         }
        //                                         else {
        //                                             creatPayment(ticket_cluster_id, user_id, totalPrice, (error, result) => {
        //                                                 if (error) {
        //                                                     res.status(error.error_code).send(error.error_message);
        //                                                 }
        //                                                 else {
        //                                                     for (let j = 0; j < passengers.length; j++) {
        //                                                         // if (i === j) {
        //                                                             const currentPassanger = passengers[j];
        //                                                             creatPassanger(currentPassanger.name, currentPassanger.age, currentPassanger.gender, currentPassanger.seat_id, (error, result) => {
        //                                                                 if (error) {
        //                                                                     // res.status(error.error_code).send(error.error_message);
        //                                                                 }
        //                                                                 else {
        //                                                                     creatTicket(ticket_cluster_id, result, currentPassanger.seat_id, (error, result) => {
        //                                                                         if (error) {
        //                                                                             // res.status(error.error_code).send(error.error_message);
        //                                                                         }

        //                                                                         if (i == under_booking_seats.length - 1 && j == passengers.length - 1) {
        //                                                                             res.status(200).send(passengers);
        //                                                                         }

        //                                                                     });
        //                                                                 }
        //                                                             });
        //                                                         // }
        //                                                     }
        //                                                 }
        //                                             });
        //                                         }
        //                                     });

        //                                 }
        //                             });
        //                         }
        //                     });
        //                 }

        //                 // create ticket
        //                 // create payment
        //             }
        //         }
        //         catch (error) {

        //             res.status(500).send("Number of passangers are greater then available seats in coach");
        //         }
        //     }
        // });

        getAllVacentSeatOfCoach(coach_id, (error, vacantSeats) => {
            if (passengers.length > vacantSeats.length) {
                res.status(500).send("Number of passangers are greater then available seats in coach");
            }
            else {
                under_booking_seats = result.slice(0, passengers.length);
                createTicketCluster(train_departure_time, source_id, destination_id, train_id, (error, ticket_cluster_id) => {
                    if (error) {
                        res.status(error.error_code).send(error.error_message);
                    }
                    else {
                        getbasePrice(coach_id, source_id, destination_id, (error, totalPrice) => {
                            if (error) {
                                res.status(error.error_code).send(error.error_message);
                            }
                            else {
                                creatPayment(ticket_cluster_id, user_id, totalPrice, (error, result) => {

                                    for (let current_passenger_index = 0; current_passenger_index < under_booking_seats.length; current_passenger_index++) {
                                        passengers[i].seat_id = vacantSeats[current_passenger_index];
                                    }
                                    for (let current_passenger_index = 0; current_passenger_index < under_booking_seats.length; current_passenger_index++) {
                                        const current_passenger = passengers[current_passenger_index];
                                        creatPassanger(current_passenger.name, current_passenger.age, current_passenger.gender, current_passenger.seat_id, (error, passanger_id) => {
                                            if (error) {
                                                res.status(error.error_code).send(error.error_message);
                                            }
                                            else {
                                                creatTicket(ticket_cluster_id, passanger_id, current_passenger.seat_id, (error, result) => {
                                                    if (error) {
                                                        res.status(error.error_code).send(error.error_message);
                                                    }
                                                    else {
                                                        if (current_passenger_index === under_booking_seats.length) {
                                                            res.status(200).send(passengers);
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
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
router.delete("/deleteTicketCluster/:ticket_cluster_id", verifyUserAccessToken, async (req, res) => {
    try {
        // Get Ticket Cluster
        const ticket_cluster_id = req.params.ticket_cluster_id;
        // Get All seats booked
        getAllSeatOfTicketCluster(ticket_cluster_id, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                // isBoked = false for all seat_id
                const total_seat_booked = result.length;
                for (let i = 0; i < result.length; i++) {
                    const current_seat_id = result[i].SEAT_ID;
                    cancellSeat(current_seat_id, (error, result) => {
                        if (error) {
                            res.status(error.error_code).send(error.error_message);
                        }
                        else if (i === total_seat_booked - 1) {
                            // deleteTicketCluster(ticket_cluster_id, (error, result)=>{
                            // if (error) {
                            //     res.status(error.error_code).send(error.error_message);
                            // }
                            // else {
                            res.status(200).send("Ticket deleted successfully");
                            // }
                            // });
                        }
                    });
                }

            }
        });

    }
    catch (error) {
        res.status(500).send("Something went wrong !!");
    }
});
// get all ticket cluster of user
router.get("/getTicketClustersOfUser", verifyUserAccessToken, async (req, res) => {
    try {
        const user_id = req.headers.id;
        getTicketClusterIdforUser(user_id, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    catch (error) {
        res.status(500).send("Something went wrong !!")
    }
});
// get all vacant seats of coach
router.get("/numberOfVacentSeat/:coach_id", verifyUserAccessToken, async (req, res) => {
    try {
        const coach_id = req.params.coach_id;
        getAllVacentSeatOfCoach(coach_id, (error, result) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
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
module.exports = router;