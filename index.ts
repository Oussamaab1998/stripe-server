import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";

const stripe = new Stripe(
  "sk_test_51LqJSeLJDPAQV3CJAvBfYEkJaqV5Av26yZOMiXbEtTYZPcr9V5w9PHyy4fpHawRxLCVoUVKz02lkatPHaYgWHDVC00LUM2Hq8y",
  {
    apiVersion: "2020-08-27",
    typescript: true,
  }
);

const app = express();
// app.use(express.json());
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(req.body.amount) * 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3001, () => console.log("Running 3001!"));

// Export the Express API
module.exports = app;
