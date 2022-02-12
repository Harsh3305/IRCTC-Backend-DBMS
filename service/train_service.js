const mysql = require("mysql2");
// CREATE TRAIN

function createTrain(train_name, train_code, callback) {

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
            const values = [[train_name, train_code, 0]];
            const sql_query = `INSERT INTO TRAIN (NAME, CODE, DELAY) VALUES ? ;`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Train created successfully");
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

function getTrain(train_id, callback) {

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
            const sql_query = `SELECT * FROM TRAIN WHERE TRAIN_ID = '${train_id}'`;
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
    })
}

function getTrainFromSourceDestinaiton(source_id, destination_id, callback) {

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
            const sql_query = `SELECT TRAIN_ID FROM STATION_STATUS WHERE STATION_ID = '${source_id}' AND TRAIN_ID IN (SELECT TRAIN_ID FROM STATION_STATUS WHERE STATION_ID = '${destination_id}');`;
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
    })
}

function getAllTrain(callback) {

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
            const sql_query = `SELECT * FROM TRAIN`;
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
    })
}

function delayTrain(train_id, delay, callback) {

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
            const sql_query = `UPDATE TRAIN SET DELAY = '${delay}' WHERE TRAIN_ID = '${train_id}';`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Train updated successfully");
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


function getAllCoachOfTrain(train_id, callback) {

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
            const sql_query = `SELECT COACH_ID FROM COACH WHERE TRAIN_ID = '${train_id}';`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Train updated successfully");
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


module.exports = { createTrain, getTrain, getTrainFromSourceDestinaiton, getAllTrain, delayTrain, getAllCoachOfTrain }