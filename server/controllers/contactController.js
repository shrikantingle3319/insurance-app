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

      await pool.query(

        `
        INSERT INTO contact_messages
        (
          full_name,
          email,
          subject,
          message
        )
        VALUES ($1, $2, $3, $4)
        `,

        [
          full_name,
          email,
          subject,
          message
        ]
      );

      // EMAIL

      const transporter =
        nodemailer.createTransport({

          service: "gmail",

          auth: {

            user:
              process.env.EMAIL_USER,

            pass:
              process.env.EMAIL_PASS
          }
        });

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          process.env.RECEIVER_EMAIL,

        subject:
          `New Contact Message: ${subject}`,

        html: `

          <h2>
            New Contact Form Submission
          </h2>

          <p>
            <strong>Name:</strong>
            ${full_name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Subject:</strong>
            ${subject}
          </p>

          <p>
            <strong>Message:</strong>
            ${message}
          </p>
        `
      });

      res.status(200).json({

        success: true,

        message:
          "Message sent successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message
      });
    }
  };

module.exports = {
  submitContact
};