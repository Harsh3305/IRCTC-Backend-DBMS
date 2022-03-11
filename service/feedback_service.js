function createFeedback (user_id, message, callback) {
    
    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });


    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {

            const values = [user_id, message];
            const sql_query = "INSERT INTO FEEDBACK (USER_ID, MESSAGE) VALUES ? ;"
            console.log(sql_query);

            connection.query(sql_query, [[values]], function (error, result) {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Feedback created successfully");
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

function deleteUserFeedbacks(user_id, callback) {

    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });


    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {

            const values = [user_id, message];
            const sql_query = `DELETE FROM FEEDBACK WHERE USER_ID = '${user_id}';`
            console.log(sql_query);

            connection.query(sql_query, function (error, result) {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, "Feedback deleted successfully");
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
module.exports = {createFeedback, deleteUserFeedbacks};