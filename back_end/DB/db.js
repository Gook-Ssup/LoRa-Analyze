const mongoose = require("mongoose");

require("dotenv").config();
const db_uri = process.env.MONGO_URI;

module.exports = () => {
  function connect() {
    // TODO : use process.env
    try{
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
    } catch(error) {
      console.log("Failed to connect DB");
    }
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  require("./gateway.js");
};
