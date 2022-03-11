const mysql = require("mysql2");


function creatPayment(ticket_cluster_id, user_id, amount, callback) {

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
            const value = [[ticket_cluster_id, user_id, amount]];
            const sql_query = `INSERT INTO PAYMENT (TICKET_CLUSTER_ID, USER_ID, AMOUNT) VALUES ?;`;
            connection.query(sql_query, [value], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, 'Payment created successfully');
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


function updatePayment(payment_id, ticket_cluster_id, user_id, amount, callback) {
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
            const sql_query = `UPDATE PAYMENT SET PAYMENT_ID = '${payment_id}, TICKET_CLUSTER_ID = '${ticket_cluster_id}, USER_ID = '${user_id}, AMOUNT = ${amount}';`;
            connection.query(sql_query, (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Payment updated successfully");
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
const gconnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});
const gconnect = gconnection.connect((error)=>{console.log(error);})

function deletePayment(payment_id, callback) {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    // connection.connect((error) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     else {
    //         const sql_query = `DELETE FROM PAYMENT WHERE PAYMENT_ID = '${payment_id};`;
    //         connection.query(sql_query, (error, result) => {
    //             if (error) {
    //                 callback({ error_code: 500, error_message: error.message });
    //             }
    //             else {
    //                 callback(null, "Payment deleted successfully");
    //             }
    //         });
    //     }

    //     connection.end((error) => {
    //         if (error) {
    //             console.error(error);
    //         }
    //     });
    // })
    const sql_query = `DELETE FROM PAYMENT WHERE PAYMENT_ID = '${payment_id};`;
        gconnection.query(sql_query, (error, result) => {
            if (error) {
                callback({ error_code: 500, error_message: error.message });
            }
            else {
                callback(null, "Payment deleted successfully");
            }
        });
}

function getPayment(payment_id, callback) {
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
            const sql_query = `SELECT * FROM PAYMENT WHERE PAYMENT_ID = '${payment_id}';`;
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

function getPaymentOfUser(user_id, callback) {
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
            const sql_query = `SELECT PAYMENT_ID, TICKET_CLUSTER_ID FROM PAYMENT WHERE USER_ID = '${user_id}';`;
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


function getAllPayment(callback) {
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
            const sql_query = `SELECT * FROM PAYMENT;`;
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


module.exports = { creatPayment, updatePayment, deletePayment, getPayment, getAllPayment, getPaymentOfUser};