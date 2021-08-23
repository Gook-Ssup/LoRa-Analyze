// .env
require('dotenv').config();
console.log(process.env.MONGO_URI);
//

// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./DB/db.js");
//

// const { sequelize } = require('../models');

const app = express();
// bodyParsers
app.use(bodyParser.json());

// ROUTING
const mapAPI = require("./routes/v0/api/map.js");
//

// api
app.use("/v0/api/map", mapAPI);
//

// db connect
db();
//

const port = process.env.SERVER_PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
