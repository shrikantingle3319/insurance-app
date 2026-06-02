const express =
  require("express");

const router =
  express.Router();

/* =========================================
   CONTROLLER
========================================= */

const {

  generateAIPlans

} = require(
  "../controllers/aiPlansController"
);

/* =========================================
   ROUTES
========================================= */

/*
   POST:
   /api/aiplans/generate
*/

router.post(

  "/generate",

  generateAIPlans
);

/* =========================================
   EXPORT
========================================= */

module.exports =
  router;