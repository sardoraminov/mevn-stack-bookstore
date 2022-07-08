const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// mongodb+srv://<username>:<password>@cluster0.29zug.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect(
    "mongodb+srv://dasturchioka:1234asdf@cluster0.29zug.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started!");
});
