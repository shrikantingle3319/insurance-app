const axios = require("axios");

const chatWithAI = async (
  req,
  res
) => {

  try {

    const { message } = req.body;

    const response =
      await axios.post(

        `${process.env.FOUNDRY_ENDPOINT}/models/chat/completions?api-version=2024-05-01-preview`,

        {

          model:
            process.env.FOUNDRY_MODEL,

          messages: [

            {
              role: "system",

              content: `

You are an AI-powered Indian Auto Insurance Assistant.

You help users with:

- Car insurance
- Insurance quotes
- Claims
- Renewals
- IDV
- NCB
- Add-ons
- Premium calculation
- Vehicle insurance guidance

Keep responses concise, smart, and user-friendly.

`
            },

            {
              role: "user",

              content: message
            }
          ],

          temperature: 0.7,

          max_tokens: 400
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
      "CHATBOT RESPONSE:"
    );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    const reply =

      response.data
      ?.choices?.[0]
      ?.message?.content

      ||

      "Sorry, I could not respond.";

    res.json({

      success: true,

      reply
    });

  } catch (error) {

    console.log(
      "CHATBOT AI ERROR:"
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

      console.log(error.message);
    }

    res.status(500).json({

      success: false,

      reply:
        "AI assistant unavailable right now."
    });
  }
};

module.exports = {
  chatWithAI
};