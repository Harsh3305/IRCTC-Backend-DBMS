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

// Import User routes

const UserCoachRouter = require("./routes/user/Coach");
const UserStationRouter = require("./routes/user/Station");
const UserTrainRouter = require("./routes/user/Trains");
const UserProcessUserRouter = require("./routes/user/ProcessUser");


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
app.use("/api/user/", UserCoachRouter);
app.use("/api/user/", UserStationRouter);
app.use("/api/user/", UserTrainRouter);
app.use("/api/user/", UserProcessUserRouter);


// Use Admin route

app.use("/api/admin/", AdminCoachRouter);
app.use("/api/admin/", AdminStationRouter);
app.use("/api/admin/", AdminTrainRouter);

app.listen(process.env.PORT, function () {
  console.log("Server is Started");
});
