const express = require('express');
const router = express.Router();
const stripeKey = process.env.StripeKey

router.use((req, res, next) => {
    console.log('Notes Router Incoming Request');
    next();
  });

  const stripe = require("stripe")(stripeKey);

  router.post("/", (req, res) => {
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