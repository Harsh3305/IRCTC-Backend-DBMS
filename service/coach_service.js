const mysql = require("mysql2");
const {getStationDistance} = require("./station_status");
function createCoach(train_id, coach_type, price, callback) {

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
            const values = [[train_id, coach_type, price]];
            const sql_query = `INSERT INTO COACH (TRAIN_ID, COACH_TYPE, PRICE) VALUES ? ;`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Coach created successfully");
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


function getCoachByID(coach_id, callback) {

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
            const sql_query = `SELECT * FROM COACH WHERE COACH_ID = '${coach_id}';`;
            connection.query(sql_query, (error, result) => {
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


function getCoachesOfTrain(train_id, callback) {

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
            const sql_query = `SELECT * FROM COACH WHERE TRAIN_ID = '${train_id}'`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, result);
                }
            })

            connection.end((error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    });
}
function getTrainIdFromCoachId (coach_id, callback) {
    
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
            const sql_query = `SELECT TRAIN_ID FROM COACH WHERE COACH_ID = '${coach_id}'`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, result[0]);
                }
            })

            connection.end((error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    });
}
function getbasePrice(coach_id, source_station_id, destination_station_id, callback ) {
    try {
        getCoachByID(coach_id, (error, result)=> {
            if (error) {
                callback({ error_code: 500, error_message: error.message });
            }
            else {
                const train_id = result.TRAIN_ID;
                const price = result.PRICE;
                getStationDistance(train_id, source_station_id, destination_station_id, (error, result)=>{
                    if (error) {
                        callback({ error_code: 500, error_message: error.message });
                    }
                    else {
                        const totalPrice = price*result;
                        callback(null, totalPrice);

                    }
                });
            }
        })
    }
    catch (error) {
        console.error(error);
    }
}
module.exports  = { createCoach, getCoachByID, getCoachesOfTrain, getbasePrice,getTrainIdFromCoachId, getTrainIdFromCoachId}