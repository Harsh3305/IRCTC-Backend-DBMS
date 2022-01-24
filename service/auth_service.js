const mysql = require("mysql2");

function createUser(email, password, username, age, phone, isAdmin, callback) {

    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });


    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {

            const values = [username, email, password, phone, isAdmin, age];
            const sql_query = "INSERT INTO USER (USER_NAME, EMAIL, PASSWORD, PHONE_NUMBER, IS_ADMIN, AGE) VALUES ? ;"
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
                    console.log("user is created");
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


function loginUser(email, password, callback) {

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {


            const sql_query = "SELECT USER_ID, PASSWORD, IS_ADMIN FROM USER WHERE EMAIL = ?";
            console.log(sql_query);

            connection.query(sql_query, [email], function (err, result) {
                if (err) {
                    console.error(err);
                    callback(500, '', '');
                }
                else {
                    const user_id = result[0].USER_ID;
                    const storedPassword = result[0].PASSWORD;
                    const is_admin = result[0].IS_ADMIN;
                    if (storedPassword === password) {
                        callback(null, user_id, is_admin);
                    }
                    else {
                        callback(403, '', '');
                    }
                }
            });

            connection.end((error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    });
    // connection.query();
}

module.exports = { createUser, loginUser };