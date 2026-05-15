const pool =
  require("../db/db");

const nodemailer =
  require("nodemailer");

const submitContact =
  async (req, res) => {

    try {

      const {

        full_name,
        email,
        subject,
        message

      } = req.body;

      // SAVE TO DB

      await pool.query(

        `
        INSERT INTO contact_messages
        (
          full_name,
          email,
          subject,
          message
        )

        VALUES
        ($1,$2,$3,$4)
        `,

        [
          full_name,
          email,
          subject,
          message
        ]
      );

      res.json({

        success: true
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false
      });
    }
  };

module.exports = {
  submitContact
};