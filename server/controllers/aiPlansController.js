const axios =
  require("axios");

const generateAIPlans =
  async (req, res) => {

    try {

      const {

        vehicleNumber,
        vehicleModel,
        registrationYear,
        fuelType,
        insuranceType,
        previousInsurance,
        ncb,
        selectedAddons

      } = req.body;

      const prompt = `

You are an AI-powered Indian auto insurance advisor.

Generate ONLY valid JSON.

Vehicle Details:

Vehicle Number:
${vehicleNumber}

Vehicle Model:
${vehicleModel}

Registration Year:
${registrationYear}

Fuel Type:
${fuelType}

Insurance Type:
${insuranceType}

Previous Insurance:
${previousInsurance}

NCB:
${ncb}

Selected Addons:
${selectedAddons?.join(", ")}

Return JSON format:

{
  "recommended_policies": [
    {
      "insurer": "",
      "policy_name": "",
      "premium": "",
      "cashless_garages": "",
      "ncb": "",
      "addons": [],
      "benefits": [],
      "buy_link": ""
    }
  ]
}
`;

      const response =
        await axios.post(

          `${process.env.FOUNDRY_ENDPOINT}/openai/deployments/${process.env.FOUNDRY_MODEL}/chat/completions?api-version=2024-02-15-preview`,

          {

            messages: [

              {
                role: "system",

                content:
                  "You are an AI Insurance Advisor."
              },

              {
                role: "user",

                content: prompt
              }
            ],

            temperature: 0.7,

            max_tokens: 1500
          },

          {

            headers: {

              "api-key":
                process.env
                .FOUNDRY_API_KEY,

              "Content-Type":
                "application/json"
            }
          }
        );

      console.log(
        "FULL RESPONSE:",
        JSON.stringify(
          response.data,
          null,
          2
        )
      );

      // SAFETY CHECK

      if (
        !response.data ||
        !response.data.choices ||
        !response.data.choices[0]
      ) {

        return res.status(500)
        .json({

          message:
            "Invalid AI response",

          data:
            response.data
        });
      }

      const aiText =

        response.data
        .choices[0]
        .message
        .content;

      console.log(
        "AI TEXT:",
        aiText
      );

      const parsedData =
        JSON.parse(aiText);

      res.json(parsedData);

    } catch (error) {

      console.log(
        "========= AI ERROR ========="
      );

      if (error.response) {

        console.log(

          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      }

      else {

        console.log(error);
      }

      res.status(500).json({

        message:
          "AI recommendation failed"
      });
    }
  };

module.exports = {
  generateAIPlans
};