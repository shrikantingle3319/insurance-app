const axios = require("axios");

/* =========================================
   GENERATE INSURANCE QUOTES
========================================= */

const generateInsuranceQuotes =
  async (vehicleData, validationResult) => {

    try {

      /* =====================================
         INSURANCE PROMPT
      ===================================== */

      const insurancePrompt = `

You are an AI-powered automobile insurance recommendation engine for India.

Your task is to generate realistic vehicle insurance policy recommendations.

Vehicle Details:

${JSON.stringify(
  vehicleData,
  null,
  2
)}

Validation Result:

${JSON.stringify(
  validationResult,
  null,
  2
)}

==================================================
RULES
==================================================

1. Recommend ONLY real Indian insurance companies:

- ICICI Lombard
- HDFC ERGO
- Tata AIG
- ACKO
- Bajaj Allianz
- SBI General
- Reliance General
- Go Digit
- New India Assurance

2. Generate minimum 8 insurance plans.

3. Premiums must look realistic.

4. Premium should depend on:
- vehicle age
- fuel type
- city/state
- vehicle type
- add-ons
- ownership status

5. Every policy must include:

- insurer
- policy_name
- premium
- cashless_garages
- ncb
- addons
- benefits

6. Do NOT generate fake companies.

7. Return ONLY strict valid raw JSON.

==================================================
OUTPUT FORMAT
==================================================

{
  "recommended_policies": []
}

`;

      /* =====================================
         CALL INSURANCE AGENT
      ===================================== */

      const response =
        await axios.post(

          process.env
          .INSUR_AGENT_RESPONSES_ENDPOINT,

          {

            input:
              insurancePrompt
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
         FIND MESSAGE OUTPUT
      ===================================== */

      const messageOutput =

        response.data.output.find(

          (item) =>
            item.type === "message"
        );

      if (!messageOutput) {

        return {

          success: false,

          message:
            "No insurance agent response"
        };
      }

      /* =====================================
         AGENT RESPONSE TEXT
      ===================================== */

      const agentResponse =

        messageOutput
        ?.content?.[0]
        ?.text;

      if (!agentResponse) {

        return {

          success: false,

          message:
            "Insurance agent returned empty response"
        };
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
         PARSE JSON
      ===================================== */

      let parsedResponse;

      try {

        parsedResponse =
          JSON.parse(cleanedText);

      } catch (parseError) {

        console.log(
          "INSURANCE JSON PARSE ERROR:"
        );

        console.log(parseError);

        console.log(
          "RAW INSURANCE RESPONSE:"
        );

        console.log(cleanedText);

        return {

          success: false,

          message:
            "Invalid insurance response format"
        };
      }

      /* =====================================
         SUCCESS
      ===================================== */

      return {

        success: true,

        policies:

          parsedResponse
          ?.recommended_policies || []
      };

    } catch (error) {

      console.log(
        "QUOTE AGENT ERROR:"
      );

      console.log(

        error.response?.data
        || error.message
      );

      return {

        success: false,

        message:
          "Insurance quote generation failed"
      };
    }
};

module.exports = {
  generateInsuranceQuotes
};