const axios =
  require("axios");

const pool =
  require("../db/db");

const chatWithAI =
  async (req, res) => {

    try {

      const {

        message,

        user_id

      } = req.body;

      const endpoint =
        process.env
        .FOUNDRY_ENDPOINT;

      const apiKey =
        process.env
        .FOUNDRY_API_KEY;

      const deployment =
        process.env
        .FOUNDRY_MODEL;

      const response =
        await axios.post(

          `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`,

          {

            messages: [

              {
                role: "system",

                content:

                  `You are an strict AI-powered automobile insurance assistant.
                  
                  Help users with:
                  - car insurance
                  - claims
                  - premiums
                  - IDV
                  - add-ons
                  - renewals
                  - no response for other topic`
              },

              {
                role: "user",

                content:
                  message
              }
            ],

            temperature: 0.7,

            max_tokens: 500
          },

          {

            headers: {

              "Content-Type":
                "application/json",

              "api-key":
                apiKey
            }
          }
        );

      const aiReply =

        response.data
        .choices[0]
        .message.content;

      /* SAVE CHAT */

      await pool.query(

        `
        INSERT INTO ai_chat_logs
        (
          user_id,
          user_message,
          ai_response
        )

        VALUES ($1,$2,$3)
        `,

        [

          user_id || null,

          message,

          aiReply
        ]
      );

      res.json({

        success: true,

        reply: aiReply
      });

    } catch (error) {

      console.log(
        "CHATBOT ERROR:"
      );

      console.log(

        error?.response?.data
        || error.message
      );

      res.status(500).json({

        success: false,

        message:
          "AI Chat Failed"
      });
    }
  };

module.exports = {

  chatWithAI
};