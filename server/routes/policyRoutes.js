const express =
  require("express");

const router =
  express.Router();

const {

  buyPolicy,

  savePayment,

  getDashboard

} = require(

  "../controllers/policyController"
);

/* BUY POLICY */

router.post(
  "/buy",
  buyPolicy
);

/* PAYMENT */

router.post(
  "/payment",
  savePayment
);

/* DASHBOARD */

router.get(
  "/dashboard/:user_id",
  getDashboard
);

module.exports = router;