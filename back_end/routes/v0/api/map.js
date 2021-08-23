const express = require("express");
// TODO : change path
const Gateway = require("../../../DB/gateway.js");
//

const router = express.Router();

router.get("/gateways", async (req, res, next) => {
  try {
    Gateway.find().then((gateways) => {
      console.log(gateways);
      return res.json({
        success: true,
        gateways,
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

module.exports = router;
