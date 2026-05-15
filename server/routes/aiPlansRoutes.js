const express =
  require("express");

const router =
  express.Router();

const {

  generateAIPlans

} = require(
  "../controllers/aiPlansController"
);

router.post(
  "/recommend",
  generateAIPlans
);

module.exports = router;