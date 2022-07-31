require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


// Built-In middleware
app.use(express.json());

// Third-party middleware
app.use(cors({ origin: "*" }));

mongoose
  .connect(
    process.env.DB_URI
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// router-level middleware
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/accounts", require("./routes/accounts"));

app.listen(process.env.PORT, () => {
  console.log("Server started!");
});
