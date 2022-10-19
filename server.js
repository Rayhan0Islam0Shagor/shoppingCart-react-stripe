const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// initialize express
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  // console.log(lineItems);

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// listening to port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
