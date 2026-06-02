const {

  insuranceGraph

} = require(
  "../graphs/insuranceGraph"
);

/* =========================================
   GENERATE AI PLANS
========================================= */

const generateAIPlans =
  async (req, res) => {

    try {

      /* =============================
         VEHICLE DATA
      ============================= */

      const vehicleData =
        req.body;

      console.log(
        "Incoming Vehicle Data:"
      );

      console.log(vehicleData);

      /* =============================
         INVOKE GRAPH
      ============================= */

      const graphResponse =

        await insuranceGraph.invoke({

          vehicleData
        });

      console.log(
        "GRAPH RESPONSE:"
      );

      console.log(graphResponse);

      /* =============================
         RETURN RESPONSE
      ============================= */

      return res.status(200).json({

        success: true,

        workflow:
          graphResponse
      });

    } catch (error) {

      console.log(
        "AI PLANS CONTROLLER ERROR:"
      );

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "AI workflow failed",

        error:
          error.message
      });
    }
};

module.exports = {

  generateAIPlans
};