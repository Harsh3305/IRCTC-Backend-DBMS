const mysql = require("mysql2");

function createSeat(coach_id, seat_number, seat_type, callback) {

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    connection.connect((error) => {
        if (error) {
            console.log(error);
        }
        else {
            const values = [[coach_id, seat_number, seat_type, false]];
            const sql_query = `INSERT INTO SEAT (COACH_ID, SEAT_NUMBER, SEAT_TYPE, IS_SEAT_BOOKED) VALUES ? ;`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Seat created successfully");
                }
            })
        }

        connection.end((error) => {
            if (error) {
                console.error(error);
            }
        });
    });
}

function bookSeat(seat_id, callback) {

    isSeatBooked(seat_id, (error, is_Booked) => {
        if (error) {
            callback(error);
        }
        else {
            if (is_Booked) {
                callback({ error_code: 404, error_message: "Seat not available" });
            }
            else {
                // seat is available

                const connection = mysql.createConnection({
                    host: process.env.HOST,
                    user: process.env.USER,
                    password: process.env.PASSWORD,
                    database: process.env.DB
                });

                connection.connect((error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        const sql_query = `UPDATE SEAT SET IS_SEAT_BOOKED = 'TRUE' WHERE SEAT_ID = '${seat_id}'`;
                        connection.query(sql_query, (error, result) => {
                            if (error) {
                                callback({ error_code: 500, error_message: error.message });
                            }
                            else {
                                callback(null, 'sEAT BOOKED successfully');
                            }
                        })
                    }

                    connection.end((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                })
            }
        }
    });
}


// TODO:
function cancellSeat(callback) {

    isSeatBooked(seat_id, (error, is_Booked) => {
        if (error) {
            callback(error);
        }
        else {
            if (!is_Booked) {
                callback({ error_code: 404, error_message: "Seat not available" });
            }
            else {
                // seat is booked

                const connection = mysql.createConnection({
                    host: process.env.HOST,
                    user: process.env.USER,
                    password: process.env.PASSWORD,
                    database: process.env.DB
                });

                connection.connect((error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        const sql_query = `UPDATE SEAT SET IS_SEAT_BOOKED = 'TRUE' WHERE SEAT_ID = '${seat_id}'`;
                        connection.query(sql_query, (error, result) => {
                            if (error) {
                                callback({ error_code: 500, error_message: error.message });
                            }
                            else {
                                callback(null, 'sEAT BOOKED successfully');
                            }
                        })
                    }

                    connection.end((error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                })
            }
        }
    });
}

function getAllVacentSeatOfCoach(coach_id, callback) {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    connection.connect((error) => {
        if (error) {
            console.log(error);
        }
        else {
            const sql_query = `SELECT * FROM SEAT WHERE IS_SEAT_BOOKED = 'FALSE' AND COACH_ID = '${coach_id}'`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, result);
                }
            })
        }

        connection.end((error) => {
            if (error) {
                console.error(error);
            }
        });
    });
}

function isSeatBooked(seat_id, callback) {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    connection.connect((error) => {
        if (error) {
            console.log(error);
        }
        else {
            const sql_query = `SELECT IS_SEAT_BOOKED FROM SEAT WHERE SEAT_ID = '${seat_id}'`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, result[0]);
                }
            })
        }

        connection.end((error) => {
            if (error) {
                console.error(error);
            }
        });
    });
}
module.exports = { createSeat, bookSeat, getAllVacentSeatOfCoach }