const express = require("express");
const cors = require("cors");
let uniqid = require("uniqid");
const fileUpload = require("express-fileupload");

const paymentRoute = require("./routes/paymentRoutes")
const usedBookRoute = require("./routes/usedBookRoutes")

// const stripe = require("stripe")("sk_test_51L0HVnAA6lOKoR8GoU1iEI0wyaCryNQi7afiSkGR050ukQ5R94OcG7yU2x3kvK9RyWUvMptsoPhMlTAqohFgvGRL004FrlIV0z");
// pk_test_51L0HVnAA6lOKoR8Gmz2PSIryVFoekcsLJJvCaWZkUdh6EJNcHC1MdlOXtYqFxwB3nk8KVdPWIdcsv6XHruwL7cAM00wO6hk0Xa
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
