const express = require("express");

const router = express.Router();

const {

  calculateQuote

} = require(
  "../controllers/quoteController"
);

router.post(
  "/calculate",
  calculateQuote
);

module.exports = router;