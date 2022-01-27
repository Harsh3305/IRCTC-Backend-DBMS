const mysql = require("mysql2");

function createTicketCluster(train_departure_time, source_id, destination_id, payment_id, callback) {

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
            const values = [[train_departure_time, source_id, destination_id, payment_id]];
            const sql_query = `INSERT INTO TICKET_CLUSTER (TRAIN_DEPARTURE_TIME, SOURCE_ID, DESTINATION_ID, PAYMENT_ID) VALUES ? ;`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, result.insertId);
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

function updateTicketCluster(train_departure_time, source_id, destination_id, payment_id, callback) {

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
            const values = [train_departure_time, source_id, destination_id, payment_id];
            const sql_query = `UPDATE TICKET_CLUSTER SET TRAIN_DEPARTURE_TIME = '${train_departure_time}', SOURCE_ID = '${source_id}, DESTINATION_ID = '${destination_id}, PAYMENT_ID = '${payment_id} ;`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "TICKET_CLUSTER updated successfully");
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

function deleteTicketCluster(ticket_cluster_id, callback) {

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
            const values = [train_departure_time, source_id, destination_id, payment_id];
            const sql_query = `DROP TICKET_CLUSTER WHERE TICKET_CLUSTER_ID = '${ticket_cluster_id}';`;
            connection.query(sql_query, [values], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "TICKET_CLUSTER updated successfully");
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

function getTicketCluster(ticket_cluster_id, callback) {

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
            const sql_query = `SELECT * FROM TICKET_CLUSTER WHERE TICKER_CLUSTER_ID = '${ticket_cluster_id};`;
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

function getAllTicketCluster(callback) {

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
            const sql_query = `SELECT * FROM TICKET_CLUSTER;`;
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
module.exports = { createTicketCluster, updateTicketCluster, deleteTicketCluster, getAllTicketCluster, getTicketCluster };