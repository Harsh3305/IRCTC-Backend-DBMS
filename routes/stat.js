const router = require("express").Router();
const mysql = require("mysql2");

router.get("/stat", async (req, res) => {

    var connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });


    connection.connect(function (err) {
        if (err) { console.log(err); }
        else {
            const sql_query = "select AVG(AMOUNT) AS avg from PAYMENT;"
            console.log(sql_query);

            connection.query(sql_query, function (error, result) {
                if (error) {
                    res.status(500).send(error.message);
                }
                else {
                    res.status(200).send(`<h1>Average Amount of Payment is ₹${result[0]["avg"]}</h1>`);
                }
            });

            connection.end((error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
    });
});

module.exports = router;