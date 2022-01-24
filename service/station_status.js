const mysql = require("mysql2");
function creatStationStatus(train_id, station_id, arivalTime, deaparture_time, callback) {

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
            const value = [train_id, station_id, arivalTime, deaparture_time];
            const sql_query = `INSERT INTO USER `;
            connection.query(sql_query, [value], (error, result) => {
                if (error) {
                    callback({ error_code: 500, error_message: error.message });
                }
                else {
                    callback(null, 'sEAT BOOKED successfully');
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