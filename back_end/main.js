// .env
require('dotenv').config();
//

// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
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

const port = process.env.SERVER_PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
