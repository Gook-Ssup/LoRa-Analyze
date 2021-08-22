const express = require("express");
//

const router = express.Router();

router.get("/gateways", async (req, res, next) => {
  try {
    const gateways = [
      {
        id: 1,
        name: "gateway1",
        latitude: 35.235102456647034,
        longitude: 129.0828258896565,
      },
      {
        id: 2,
        name: "gateway2",
        latitude: 35.235202456647034,
        longitude: 129.0798258896565,
      },
    ];

    return res.json({
      success: true,
      gateways,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "DUPLICATE" });
  }
});

module.exports = router;
