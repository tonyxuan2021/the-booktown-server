const express = require("express");
let PORT = process.env.PORT ||5050
const cors = require("cors");
let uniqid = require("uniqid");
const fileUpload = require("express-fileupload");

const paymentRoute = require("./routes/paymentRoutes")

const app = express();

require("dotenv").config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/payment',paymentRoute);


// Listen
app.listen(PORT);
