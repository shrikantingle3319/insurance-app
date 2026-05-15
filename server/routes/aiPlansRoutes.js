const express = require("express");

const router = express.Router();

const {

  getAIPlans

} = require(
  "../controllers/aiPlansController"
);

router.post(
  "/recommend",
  getAIPlans
);

module.exports = router;