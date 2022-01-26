const mysql = require("mysql2");

function createStationStatus(train_id, station_id, arivalTime, deaparture_time, callback) {

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
            const value = [[train_id, station_id, arivalTime, deaparture_time]];
            const sql_query = `INSERT INTO STATION_STATUS (TRAIN_ID, STATION_ID, ARRIVAL_TIME, DEPARTURE_TIME) VALUES ? ;`;
            connection.query(sql_query, [value], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, 'Station Status created successfully');
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

function getStationStatusOfTrain(train_id, callback) {
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
            const sql_query = `SELECT * FROM STATION_STATUS WHERE TRAIN_ID = '${train_id}';`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    result.sort((station_1, station_2)=> {
                        if (station_1.ARRIVAL_TIME > station_2.ARRIVAL_TIME) {
                            return 1;
                        }
                        else if (station_1.ARRIVAL_TIME < station_2.ARRIVAL_TIME) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    });
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
function getStationDistance (train_id, station_id_1, station_id_2, callback) {
        getStationStatusOfTrain(train_id, (error, result)=> {
            if (error) {
                callback({ error_code: 500, error_message: error.message });
            }
            else {
                var i=0;

                var index1 = null;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].STATION_ID == station_id_1) {
                        index1 = i;
                        break;
                    }
                }

                var index2 = null;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].STATION_ID == station_id_2) {
                        index2 = i;
                        break;
                    }
                }

                if (index1!= null && index2 != null && index1 > index2) {
                    callback(null, (index1-index2)*30);
                }
                else {
                    callback({ error_code: 500, error_message: "Station not found" });
                }
            }
        });
}
function getStationStatusOfId(station_status_id, callback) {
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
            const sql_query = `SELECT * FROM STATION_STATUS WHERE STATION_STATUS_ID = '${station_status_id}';`;
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


function updateStationStatus(station_status_id, train_id, arivalTime, departure_time, callback) {
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
            const sql_query = `UPDATE STATION_STATUS SET STATION_STATUS_ID = '${station_status_id}, TRAIN_ID = '${train_id}, STATION_ID = '${station_id}, ARRIVAL_TIME = '${arivalTime}, DEPARTURE_TIME = ${departure_time}';`;
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

function deleteStationStatus(station_status_id, callback) {
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
            const sql_query = `DROP FROM STATION_STATUS WHERE STATION_STATUS_ID = '${station_status_id};`;
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

module.exports = { createStationStatus, updateStationStatus, deleteStationStatus, getStationStatusOfId, getStationStatusOfTrain, getStationDistance};