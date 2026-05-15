const pool =
  require("../db/db");

/* =========================================
   BUY POLICY
========================================= */

const buyPolicy =
  async (req, res) => {

    try {

      const {

        user_id,

        vehicle_id,

        insurer_name,

        policy_name,

        premium_paid

      } = req.body;

      /* =========================
         CLEAN PREMIUM
      ========================= */

      const cleanPremium =

        Number(

          premium_paid

            .replace("₹", "")

            .replace(/,/g, "")

        );

      /* =========================
         GENERATE POLICY NUMBER
      ========================= */

      const policy_number =

        "POL" +

        Math.floor(
          Math.random() * 1000000
        );

      /* =========================
         INSERT POLICY
      ========================= */

      const result =
        await pool.query(

          `
          INSERT INTO user_policies
          (
            user_id,
            vehicle_id,
            insurer_name,
            policy_name,
            policy_number,
            premium_paid,
            policy_start_date,
            policy_end_date
          )

          VALUES
          (
            $1,$2,$3,$4,$5,$6,
            CURRENT_DATE,
            CURRENT_DATE + INTERVAL '1 year'
          )

          RETURNING *
          `,

          [

            user_id,

            vehicle_id,

            insurer_name,

            policy_name,

            policy_number,

            cleanPremium
          ]
        );

      res.json({

        success: true,

        policy:
          result.rows[0]
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Policy Purchase Failed"
      });
    }
  };

/* =========================================
   SAVE PAYMENT
========================================= */

const savePayment =
  async (req, res) => {

    try {

      const {

        policy_id,

        amount,

        payment_method

      } = req.body;

      const payment_reference =

        "PAY" +

        Math.floor(
          Math.random() * 1000000
        );

      const result =
        await pool.query(

          `
          INSERT INTO payments
          (
            policy_id,
            payment_reference,
            payment_method,
            payment_status,
            amount
          )

          VALUES
          (
            $1,$2,$3,$4,$5
          )

          RETURNING *
          `,

          [

            policy_id,

            payment_reference,

            payment_method,

            "SUCCESS",

            amount
          ]
        );

      res.json({

        success: true,

        payment:
          result.rows[0]
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Payment Failed"
      });
    }
  };

/* =========================================
   USER DASHBOARD
========================================= */

const getDashboard =
  async (req, res) => {

    try {

      const { user_id } =
        req.params;

      /* =========================
         USER DETAILS
      ========================= */

      const userResult =
        await pool.query(

          `
          SELECT
            user_id,
            full_name,
            email
          FROM users
          WHERE user_id = $1
          `,

          [user_id]
        );

      /* =========================
         POLICIES
      ========================= */

      const policiesResult =
        await pool.query(

          `
          SELECT

            policy_id,
            insurer_name,
            policy_name,
            policy_number,
            premium_paid,
            policy_start_date,
            policy_end_date

          FROM user_policies

          WHERE user_id = $1

          ORDER BY
          created_at DESC
          `,

          [user_id]
        );

      /* =========================
         CLAIMS
      ========================= */

      const claimsResult =
        await pool.query(

          `
          SELECT *

          FROM user_claims

          WHERE user_id = $1
          `,

          [user_id]
        );

      res.json({

        success: true,

        user:
          userResult.rows[0],

        totalPolicies:
          policiesResult.rows.length,

        totalClaims:
          claimsResult.rows.length,

        policies:
          policiesResult.rows,

        claims:
          claimsResult.rows
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Dashboard Error"
      });
    }
  };

module.exports = {

  buyPolicy,

  savePayment,

  getDashboard
};