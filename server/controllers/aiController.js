const axios =
  require("axios");

const pool =
  require("../db/db");

/* =========================
   ENV VARIABLES
========================= */

const endpoint =
  process.env
  .INSUR_AGENT_RESPONSES_ENDPOINT;

const apiKey =
  process.env
  .FOUNDRY_API_KEY;

/* =========================
   CHAT WITH AI
========================= */

const chatWithAI =
  async (req, res) => {

    try {

      const {

        message,

        history = [],

        user_id

      } = req.body;

      /* =========================
         SEND TO AZURE AGENT
      ========================= */

      const response =

        await axios.post(

          endpoint,

          {

            input: [

              ...history.map(

                (msg) => ({

                  role:

                    msg.sender ===
                    "user"

                      ? "user"

                      : "assistant",

                  content:
                    msg.text
                })
              ),

              {

                role: "user",

                content:
                  message
              }
            ]
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

      /* =========================
         FULL RESPONSE LOG
      ========================= */

      console.log(

        "FULL RESPONSE:",

        JSON.stringify(

          response.data,

          null,

          2
        )
      );

      /* =========================
         FIND MESSAGE OUTPUT
      ========================= */

      const messageOutput =

        response.data.output.find(

          (item) =>

            item.type ===
            "message"
        );

      /* =========================
         EXTRACT AI RESPONSE
      ========================= */

      const aiReply =

        typeof messageOutput
          ?.content?.[0]
          ?.text === "string"

          ? messageOutput
              ?.content?.[0]
              ?.text

          : messageOutput
              ?.content?.[0]
              ?.text?.value || "";

      console.log(
        "AI REPLY:",
        aiReply
      );

      /* =========================
         SAVE CHAT IN DATABASE
      ========================= */

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

      /* =========================
         SEND RESPONSE
      ========================= */

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