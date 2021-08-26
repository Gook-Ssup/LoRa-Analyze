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

router.put("/gateway", async (req, res, next) => {
  try {
    let { name, latitude, longitude } = req.body;
    console.log(name, latitude, longitude);
    Gateway.create(
      {
        name,
        latitude,
        longitude,
      },
      function (err) {
        if (err) {
          console.log(err);
          return res.json({ success: false });
        } else {
          return res.json({ success: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

module.exports = router;
