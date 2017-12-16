const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/soft-blog");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/userRouter")(express);
const authRouter = require("./routes/authRouter")(express);
const authController = require("./controllers/authController");

app.use("/api/auth", authRouter);
//app.use(authController.isAuthenticated);
app.use("/api/users", userRouter);


module.exports = app;
