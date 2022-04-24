const mysql = require("mysql2");

function createTicketCluster(train_departure_time, source_id, destination_id, train_id, callback) {

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
            const values = [[train_departure_time, train_id, source_id, destination_id]];
            const sql_query = `INSERT INTO TICKET_CLUSTER (TRAIN_DEPARTURE_DATETIME, TRAIN_ID, SOURCE_ID, DESTINATION_ID) VALUES ? ;`;
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
            const sql_query = `DELETE FROM TICKET_CLUSTER WHERE TICKET_CLUSTER_ID = ${ticket_cluster_id};`;
            connection.query(sql_query, (error, result) => {
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
            const sql_query = `SELECT * FROM TICKET_CLUSTER WHERE TICKER_CLUSTER_ID = '${ticket_cluster_id}';`;
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
function getTicketClusterIdforUser(user_id, callback) {
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
            const sql_query = `select source_table.TICKET_CLUSTER_ID, source_table.SOURCE_ID, source_table.SOURCE_NAME, source_table.TRAIN_ID, source_table.TRAIN_NAME, destination_table.DESTINATION_ID, destination_table.DESTINATION_NAME from (select t1.TICKET_CLUSTER_ID ,t1.SOURCE_ID, t1.TRAIN_ID, t1.NAME as TRAIN_NAME, STATION.STATION_NAME as SOURCE_NAME from (select * from (select * from PAYMENT natural join TICKET_CLUSTER where (PAYMENT.USER_ID = ${user_id} and PAYMENT.IS_TICKET_CANCEL = 0)) as NewData natural join TRAIN) as t1, STATION where t1.SOURCE_ID = STATION.STATION_ID) as source_table, (select t2.TICKET_CLUSTER_ID ,t2.SOURCE_ID, t2.DESTINATION_ID, t2.TRAIN_ID, t2.NAME, STATION.STATION_NAME as DESTINATION_NAME from (select * from (select * from PAYMENT natural join TICKET_CLUSTER where (PAYMENT.USER_ID = ${user_id} and PAYMENT.IS_TICKET_CANCEL = 0)) as NewData natural join TRAIN) as t2, STATION where t2.DESTINATION_ID = STATION.STATION_ID) as destination_table where source_table.TICKET_CLUSTER_ID = destination_table.TICKET_CLUSTER_ID;`
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
module.exports = { createTicketCluster, updateTicketCluster, deleteTicketCluster, getAllTicketCluster, getTicketCluster, getTicketClusterIdforUser };