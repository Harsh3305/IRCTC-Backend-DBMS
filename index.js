const express = require("express");
const app = express();
const mysql = require("mysql2");
const { json } = require("express");
const cors = require("cors");

// Import Auth routes

const AuthRouter = require("./routes/auth/auth");

// Import Admin routes

const AdminCoachRouter = require("./routes/admin/Coach");
const AdminStationRouter = require("./routes/admin/Station");
const AdminTrainRouter = require("./routes/admin/Train");
const AdminStationStatusRouter = require("./routes/admin/StationStatus");
const AdminSeatRouter = require("./routes/admin/Seat");;
// Import User routes

const UserCoachRouter = require("./routes/user/Coach");
const UserStationRouter = require("./routes/user/Station");
const UserTrainRouter = require("./routes/user/Trains");
const UserProcessUserRouter = require("./routes/user/ProcessUser");
const UserTicket = require("./routes/user/Ticket");

const StatRoutes = require("./routes/stat");

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});



connection.connect(function (err) {
  if (err) throw err;
  console.log("database is connected");

});

app.use(cors());
app.use(json());

// Use Auth route
app.use("/api/auth", AuthRouter);

// Use User route
app.use("/api/user/coach", UserCoachRouter);
app.use("/api/user/station", UserStationRouter);
app.use("/api/user/train", UserTrainRouter);
app.use("/api/user/processUser", UserProcessUserRouter);
app.use("/api/user/ticket", UserTicket)

// Use Admin route

app.use("/api/admin/coach", AdminCoachRouter);
app.use("/api/admin/station", AdminStationRouter);
app.use("/api/admin/train", AdminTrainRouter);
app.use("/api/admin/stationStatus", AdminStationStatusRouter);
app.use("/api/admin/seat", AdminSeatRouter);

// stat routes 
app.use("/api", StatRoutes);
app.listen(process.env.PORT, function () {
  console.log("Server is Started");
});
