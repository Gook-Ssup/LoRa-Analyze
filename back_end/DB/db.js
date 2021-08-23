const mongoose = require("mongoose");

require("dotenv").config();
const db_uri = process.env.MONGO_URI;

module.exports = () => {
  function connect() {
    // TODO : use process.env
    mongoose
      .connect("mongodb://127.0.0.1:27018/Lora", {
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  require("./gateway.js");
};
