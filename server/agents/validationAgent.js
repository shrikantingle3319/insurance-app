const axios = require("axios");

/* =========================================
   AZURE AI VALIDATION AGENT
========================================= */

const validateVehicle =
  async (vehicleData) => {

    try {

      /* =====================================
         VALIDATE AGENT API CALL
      ===================================== */

      const response =
        await axios.post(

          process.env
          .VALIDATE_AGENT_RESPONSES_ENDPOINT,

          {
            input: `

Validate the following vehicle insurance data:

${JSON.stringify(
  vehicleData,
  null,
  2
)}

IMPORTANT RULES:

1. Return STRICT valid JSON only.
2. Numeric fields must ALWAYS be numbers.
3. Never use words like:
   - seventy
   - eighty
   - ninety
4. Never generate markdown.
5. Never generate explanations outside JSON.

Expected JSON format:

{
  "isValid": true,
  "confidenceScore": 92,
  "riskLevel": "LOW",
  "fraudProbability": 8,
  "mismatches": [],
  "analysis": "Concise AI reasoning"
}

`
          },

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

      /* =====================================
         DEBUG RESPONSE
      ===================================== */

      console.log(

        JSON.stringify(
          response.data,
          null,
          2
        )
      );

      /* =====================================
         EXTRACT MESSAGE RESPONSE
      ===================================== */

      const messageOutput =

        response.data.output.find(

          (item) =>
            item.type === "message"
        );

      if (!messageOutput) {

        throw new Error(
          "No message response from validation agent"
        );
      }

      const agentResponse =

        messageOutput
        ?.content?.[0]
        ?.text;

      if (!agentResponse) {

        throw new Error(
          "Validation agent returned empty response"
        );
      }

      /* =====================================
         CLEAN RESPONSE
      ===================================== */

      const cleanedText =

        agentResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      /* =====================================
         FIX COMMON AI JSON ISSUES
      ===================================== */

      let safeText =
        cleanedText;

      safeText = safeText.replace(
        /"confidenceScore"\s*:\s*seventy/gi,
        '"confidenceScore": 70'
      );

      safeText = safeText.replace(
        /"confidenceScore"\s*:\s*eighty/gi,
        '"confidenceScore": 80'
      );

      safeText = safeText.replace(
        /"confidenceScore"\s*:\s*ninety/gi,
        '"confidenceScore": 90'
      );

      safeText = safeText.replace(
        /"fraudProbability"\s*:\s*twenty five/gi,
        '"fraudProbability": 25'
      );

      /* =====================================
         PARSE JSON
      ===================================== */

      let parsedResponse;

      try {

        parsedResponse =
          JSON.parse(safeText);

      } catch (parseError) {

        console.log(
          "JSON Parse Error:"
        );

        console.log(parseError);

        console.log(
          "RAW AI RESPONSE:"
        );

        console.log(safeText);

        return {

          success: false,

          message:
            "Invalid validation agent JSON response"
        };
      }

      /* =====================================
         FINAL RESPONSE
      ===================================== */

      return {

        success: true,

        validation:
          parsedResponse
      };

    } catch (error) {

      console.log(
        "VALIDATION AGENT ERROR:"
      );

      console.log(

        error.response?.data
        || error.message
      );

      return {

        success: false,

        message:
          "Validation agent failed"
      };
    }
};

module.exports = {
  validateVehicle
};