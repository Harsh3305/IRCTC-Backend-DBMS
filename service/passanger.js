const mysql = require("mysql2");


function creatPassanger(name, age, gender, ticket_id, seat_id, callback) {

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
            const value = [name, age, gender, ticket_id, seat_id];
            const sql_query = `INSERT INTO PASSANGER (NAME, AGE, TICKET_ID, SEAT_ID) VALUES = ?;`;
            connection.query(sql_query, [value], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, 'Passanger created successfully');
                }
            });
        }

        connection.end((error) => {
            if (error) {
                console.error(error);
            }
        });
    })
}


function updatePassanger(name, age, gender, ticket_id, seat_id, callback) {
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
            const sql_query = `UPDATE PASSANGER SET NAME = '${name}, AGE = '${age}, GENDER = '${gender}, TICKET_ID = '${ticket_id}, SEAT_ID = ${seat_id}';`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Station Status updated successfully");
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

function deletePassanger(passanger_id, callback) {
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
            const sql_query = `DROP FROM STATION_STATUS WHERE PASSANGER_ID = '${passanger_id};`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Station Status deleted successfully");
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

function getPassanger(passanger_id, callback) {
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
            const sql_query = `SELECT * FROM PASSANGER WHERE PASSANGER_ID = '${passanger_id}';`;
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
    })
}

function getAllPassanger(callback) {
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
            const sql_query = `SELECT * FROM PASSANGER;`;
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
    })
}


module.exports = { creatPassanger, updatePassanger, deletePassanger, getPassanger, getAllPassanger };
