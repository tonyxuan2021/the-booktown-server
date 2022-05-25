const express = require("express");
const cors = require("cors");
let uniqid = require("uniqid");
const fileUpload = require("express-fileupload");

const paymentRoute = require("./routes/paymentRoutes")
const usedBookRoute = require("./routes/usedBookRoutes")

const app = express();

require("dotenv").config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());


app.use('/payment',paymentRoute);
app.use('/usedbook',usedBookRoute);


// Listen
app.listen(5050);
