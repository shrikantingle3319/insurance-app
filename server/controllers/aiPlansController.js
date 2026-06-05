const axios = require("axios");

/* =========================================
   GENERATE AI PLANS
========================================= */

const generateAIPlans = async (req, res) => {

  try {

    const vehicleData = req.body;

    console.log("\n=================================");
    console.log("Incoming Vehicle Data:");
    console.log(
      JSON.stringify(
        vehicleData,
        null,
        2
      )
    );
    console.log("=================================\n");

    const activityPayload = {

      type: "message",

      id: Date.now().toString(),

      timestamp:
        new Date().toISOString(),

      serviceUrl:
        "http://localhost",

      channelId:
        "webchat",

      from: {
        id: "user1",
        name: "PolicyPilot User"
      },

      conversation: {
        id: `conv-${Date.now()}`
      },

      recipient: {
        id: "policypilot"
      },

      text:
        JSON.stringify(
          vehicleData
        )
    };

    console.log(
      "ACTIVITY PAYLOAD:"
    );

    console.log(
      JSON.stringify(
        activityPayload,
        null,
        2
      )
    );

    const response =
      await axios.post(

        process.env
          .POLICYPILOT_WORKFLOW_ENDPOINT,

        activityPayload,

        {
          headers: {

            "Content-Type":
              "application/json",

            "api-key":
              process.env
                .FOUNDRY_API_KEY
          }
        }
      );

    console.log(
      "\n========== WORKFLOW RESPONSE =========="
    );

    console.log(
      "\nSTATUS:"
    );

    console.log(
      response.status
    );

    console.log(
      "\nHEADERS:"
    );

    console.log(
      response.headers
    );

    console.log(
      "\nOPERATION LOCATION:"
    );

    console.log(
      response.headers[
        "operation-location"
      ]
    );

    console.log(
      "\nLOCATION:"
    );

    console.log(
      response.headers[
        "location"
      ]
    );

    console.log(
      "\nSESSION ID:"
    );

    console.log(
      response.headers[
        "x-agent-session-id"
      ]
    );

    console.log(
      "\nINVOCATION ID:"
    );

    console.log(
      response.headers[
        "x-agent-invocation-id"
      ]
    );

    console.log(
      "\nDATA:"
    );

    console.log(
      response.data
    );

    console.log(
      "\n=======================================\n"
    );

    return res.status(200).json({

      success: true,

      workflow:
        response.data,

      status:
        response.status,

      operationLocation:
        response.headers[
          "operation-location"
        ],

      location:
        response.headers[
          "location"
        ],

      sessionId:
        response.headers[
          "x-agent-session-id"
        ],

      invocationId:
        response.headers[
          "x-agent-invocation-id"
        ]
    });

  } catch (error) {

    console.log(
      "\n========== WORKFLOW ERROR =========="
    );

    console.log(
      "\nMESSAGE:"
    );

    console.log(
      error.message
    );

    if (
      error.response
    ) {

      console.log(
        "\nSTATUS:"
      );

      console.log(
        error.response.status
      );

      console.log(
        "\nHEADERS:"
      );

      console.log(
        error.response.headers
      );

      console.log(
        "\nDATA:"
      );

      console.log(
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );
    }

    console.log(
      "\n====================================\n"
    );

    return res.status(500).json({

      success: false,

      message:
        "Workflow execution failed",

      error:
        error.response?.data ||
        error.message
    });
  }
};

module.exports = {
  generateAIPlans
};