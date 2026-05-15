const axios = require("axios");

const getAIPlans = async (
  req,
  res
) => {

  try {

    const {

      vehicleNumber,

      vehicleModel,

      registrationYear,

      fuelType,

      insuranceType,

      previousInsurance,

      ncb,

      addons

    } = req.body;

    const prompt = `

You are an AI-powered Indian insurance advisor.

Return ONLY valid JSON.

Do not return markdown.

Do not return explanation.

Vehicle Details:

{
  "vehicleNumber":
  "${vehicleNumber}",

  "vehicleModel":
  "${vehicleModel}",

  "registrationYear":
  "${registrationYear}",

  "fuelType":
  "${fuelType}",

  "insuranceType":
  "${insuranceType}",

  "previousInsurance":
  "${previousInsurance}",

  "ncb":
  "${ncb}"
}

Selected Addons:

${JSON.stringify(addons)}

Generate 4 Indian insurance policies.

Response JSON format:

{
  "recommended_policies": [
    {
      "insurer": "",
      "policy_name": "",
      "premium": "",
      "coverage": "",
      "add_ons": [],
      "cashless_garages": "",
      "claim_ratio": "",
      "suitability": ""
    }
  ]
}

`;

    const response =
      await axios.post(

        `${process.env.FOUNDRY_ENDPOINT}/models/chat/completions?api-version=2024-05-01-preview`,

        {

          model:
            process.env.FOUNDRY_MODEL,

          messages: [

            {
              role: "system",

              content:
                "You are an AI insurance advisor."
            },

            {
              role: "user",

              content: prompt
            }
          ],

          temperature: 0.7,

          max_tokens: 1200
        },

        {

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${process.env.FOUNDRY_API_KEY}`
          }
        }
      );

    console.log(
      "FULL AI RESPONSE:"
    );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    let aiText =

      response.data
      ?.choices?.[0]
      ?.message?.content

      ||

      "";

    console.log(
      "RAW AI TEXT:"
    );

    console.log(aiText);

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "CLEANED AI TEXT:"
    );

    console.log(aiText);

    const parsedData =
      JSON.parse(aiText);

    return res.json(
      parsedData
    );

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

    } else {

      console.log(
        error.message
      );
    }

    return res
      .status(500)
      .json({

        message:
          "AI recommendation failed"
      });
  }
};

module.exports = {
  getAIPlans
};