const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema)