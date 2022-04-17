const express = require("express");
const router = express.Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
const { deleteUser, getUser, updateUser } = require("./../../service/process_user_service");
const { deleteUserFeedbacks } = require("./../../service/feedback_service");
const { deleteUserAnalytics } = require("./../../service/analytics_service");
const { getPaymentOfUser, deletePayment } = require("./../../service/payment");
const { getAllTicketsOfTicketCluster, deleteTicket } = require("./../../service/ticket");
const { add_cancel_tickets_in_db } = require("./../../service/cancel_ticket_service");
const { deletePassanger } = require("./../../service/passanger");
const { cancellSeat } = require("../../service/seat_service");
router.put("/updateUser", verifyUserAccessToken, async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const age = req.body.age;
        const phone = req.body.phone;
        const user_id = req.headers.id
        // update up user and send access token

        updateUser(user_id, email, password, username, age, phone, 0, (error, responce) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                res.status(200).json(responce);
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong !!")
    }
});

router.delete("/deleteUser", verifyUserAccessToken, async (req, res) => {
    try {
        const user_id = req.headers.id;
        // Delete User
        // Feedback
        // Analytics
        // payment
        // Ticket cluster
        // seat cancell of all passangers
        // Ticket
        // passenger
        // delete user

        // deleteUserFeedbacks(user_id, (error, result) => {
        //     if (error) {
        //         res.status(error.error_code).send(error.error_message);
        //     }
        //     else {
        //         deleteUserAnalytics(user_id, (error, result)=>{
        //             if (error) {
        //                 res.status(error.error_code).send(error.error_message);
        //             }
        //             else {

        //             }
        //         });
        //     }
        // });

        getPaymentOfUser(user_id, (error, payments) => {
            if (error) {
                res.status(error.error_code).send(error.error_message);
            }
            else {
                for (let i = 0; i < payments.length; i++) {
                    const payment = payments[i];
                    deletePayment(payment["PAYMENT_ID"], (error, payment_delete_message) => {
                        if (error) {
                            console.log(error);
                            res.status(error.error_code).send(error.error_message);
                        }
                        else {
                            getAllTicketsOfTicketCluster(payment["TICKET_CLUSTER_ID"], (error, tickets) => {
                                // cancell tickets
                                if (error) {
                                    res.status(error.error_code).send(error.error_message);
                                }
                                else {

                                    add_cancel_tickets_in_db(payment["TICKET_CLUSTER_ID"], (error, message) => {
                                        if (error) {
                                            res.status(error.error_code).send(error.error_message);
                                        }
                                        else {
                                            // delete tickets
                                            for (let j = 0; j < tickets.length; j++) {
                                                const ticket = tickets[j];
                                                cancellSeat(ticket["SEAT_ID"], (error, messsage) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {

                                                        deleteTicket(ticket["TICKET_ID"], (error, message) => {
                                                            if (error) {
                                                                res.status(error.error_code).send(error.error_message);
                                                            }
                                                            else {
                                                                // delete Passenger
                                                                deletePassanger(ticket["PASSENGER_ID"], (error, message) => {
                                                                    if (error) {
                                                                        res.status(error.error_code).send(error.error_message);
                                                                    }
                                                                    else {
                                                                        if (i === payments.length - 1 && j === tickets.length - 1) {
                                                                            // delete User
                                                                            deleteUserFeedbacks(user_id, (error, message) => {
                                                                                if (error) {
                                                                                    console.log(error);
                                                                                }
                                                                                else {
                                                                                    deleteUser(user_id, (error, responce) => {
                                                                                        if (error) {
                                                                                            res.status(error.error_code).send(error.error_message);
                                                                                        }
                                                                                        else {
                                                                                            res.status(200).json(responce);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }

                                                });
                                            }
                                        }
                                    });
                                }
                            });
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

router.get("/getUser", verifyUserAccessToken, async (req, res) => {
    try {
        const user_id = req.headers.id;
        // Get User by id

        getUser(user_id, (error, responce) => {
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