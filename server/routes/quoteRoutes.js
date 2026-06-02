const express =
  require("express");

const router =
  express.Router();

const {

  calculateQuote

} = require(
  "../controllers/quoteController"
);

module.exports = router;