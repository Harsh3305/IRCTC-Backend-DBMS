const mysql = require("mysql2");

function add_calcel_tickets_in_db(ticket_cluster_id, callback) {

    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });


    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {

            const values = [ticket_cluster_id];
            const sql_query = "INSERT INTO CANCEL_TICKET_CLUSTER (TICKET_CLUSTER_ID) VALUES ? ;"
            console.log(sql_query);

            connection.query(sql_query, [[values]], function (err, result) {
                if (err) {
                    console.error(err);
                    callback(500, err.message, "");
                }
                else {
                    console.log(result);
                    const user_id = result.insertId;
                    callback(null, user_id, isAdmin);
                    console.log("cancelled ticket added to database");
                }
            });

            connection.end((error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    });
}
module.exports = { add_calcel_tickets_in_db };