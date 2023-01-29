const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connection");
const students = require("./models/studentSchema");
const cors = require("cors");
const router = require("./routes/router");


const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(router);


app.listen(port, () => {
    console.log(`server is started on port number ${port}`);
});