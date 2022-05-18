const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Notes Router Incoming Request');
    next();
  });

  const stripe = require("stripe")("sk_test_51L0HVnAA6lOKoR8GoU1iEI0wyaCryNQi7afiSkGR050ukQ5R94OcG7yU2x3kvK9RyWUvMptsoPhMlTAqohFgvGRL004FrlIV0z");

  router.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempotencyKey = uniqid();
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges
          .create(
            {
              amount: product.price * 100,
              currency: "usd",
              customer: customer.id,
              description: product.name,
              shipping: {
                name: token.card.name,
                address: {
                  country: token.card.address_country,
                },
              },
            },
            { idempotencyKey }
          )
          .then((result) => res.status(200).json(result))
          .catch((err) => {
            console.log(err);
          });
      });
  });


  module.exports = router;