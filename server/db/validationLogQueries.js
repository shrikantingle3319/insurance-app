const pool =
  require("./db");

/* =========================================
   SAVE VALIDATION LOG
========================================= */

const saveValidationLog =
  async (

    vehicleNumber,
    ownerId,
    validation

  ) => {

    try {

      const result =
        await pool.query(

          `
          INSERT INTO validation_logs (

            vehicle_number,
            owner_id,
            fraud_probability,
            risk_level,
            validation_status,
            mismatches,
            ai_analysis

          )

          VALUES (

            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )

          RETURNING *
          `,

          [

            vehicleNumber,

            ownerId,

            validation
            ?.fraudProbability || 0,

            validation
            ?.riskLevel || "LOW",

            validation
            ?.isValid
              ? "TRUE"
              : "FALSE",

            JSON.stringify(

              validation
              ?.mismatches || []

            ),

            validation
            ?.analysis || ""
          ]
        );

      return result.rows[0];

    } catch (error) {

      console.log(
        "SAVE VALIDATION LOG ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET VEHICLE VALIDATION HISTORY
========================================= */

const getVehicleValidationHistory =
  async (vehicleNumber) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM validation_logs

          WHERE vehicle_number = $1

          ORDER BY created_at DESC
          `,

          [vehicleNumber]
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET VEHICLE HISTORY ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET OWNER VALIDATION HISTORY
========================================= */

const getOwnerValidationHistory =
  async (ownerId) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM validation_logs

          WHERE owner_id = $1

          ORDER BY created_at DESC
          `,

          [ownerId]
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET OWNER HISTORY ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET HIGH FRAUD ATTEMPTS
========================================= */

const getHighFraudAttempts =
  async (

    vehicleNumber,
    fraudThreshold = 70

  ) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM validation_logs

          WHERE vehicle_number = $1

          AND fraud_probability >= $2

          ORDER BY created_at DESC
          `,

          [

            vehicleNumber,

            fraudThreshold
          ]
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET HIGH FRAUD ATTEMPTS ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET FRAUD ATTEMPT COUNT
========================================= */

const getFraudAttemptCount =
  async (

    vehicleNumber,
    fraudThreshold = 70

  ) => {

    try {

      const result =
        await pool.query(

          `
          SELECT COUNT(*) AS total

          FROM validation_logs

          WHERE vehicle_number = $1

          AND fraud_probability >= $2
          `,

          [

            vehicleNumber,

            fraudThreshold
          ]
        );

      return parseInt(
        result.rows[0].total
      );

    } catch (error) {

      console.log(
        "GET FRAUD COUNT ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET RECENT VALIDATIONS
========================================= */

const getRecentValidations =
  async (limit = 10) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM validation_logs

          ORDER BY created_at DESC

          LIMIT $1
          `,

          [limit]
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET RECENT VALIDATIONS ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET RISK ANALYTICS
========================================= */

const getRiskAnalytics =
  async () => {

    try {

      const result =
        await pool.query(

          `
          SELECT

            risk_level,

            COUNT(*) AS total

          FROM validation_logs

          GROUP BY risk_level
          `
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET RISK ANALYTICS ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   EXPORTS
========================================= */

module.exports = {

  saveValidationLog,

  getVehicleValidationHistory,

  getOwnerValidationHistory,

  getHighFraudAttempts,

  getFraudAttemptCount,

  getRecentValidations,

  getRiskAnalytics
};