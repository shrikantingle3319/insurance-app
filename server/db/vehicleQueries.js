const pool =
  require("./db");

/* =========================================
   GET VEHICLE BY NUMBER
========================================= */

const getVehicleByNumber =
  async (vehicleNumber) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM vehicles

          WHERE vehicle_number = $1
          `,

          [vehicleNumber]
        );

      return result.rows[0];

    } catch (error) {

      console.log(
        "GET VEHICLE ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   SAVE NEW VEHICLE
========================================= */

const saveVehicle =
  async (vehicleData) => {

    try {

      const result =
        await pool.query(

          `
          INSERT INTO vehicles (

            owner_id,
            vehicle_number,
            manufacturer,
            vehicle_model,
            registration_year,
            fuel_type,
            vehicle_type,
            rto_location,
            city,
            state,
            owner_status

          )

          VALUES (

            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11
          )

          RETURNING *
          `,

          [

            vehicleData.owner_id,

            vehicleData.vehicle_number,

            vehicleData.manufacturer,

            vehicleData.vehicle_model,

            vehicleData.registration_year,

            vehicleData.fuel_type,

            vehicleData.vehicle_type,

            vehicleData.rto_location,

            vehicleData.city,

            vehicleData.state,

            vehicleData.owner_status
          ]
        );

      return result.rows[0];

    } catch (error) {

      console.log(
        "SAVE VEHICLE ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   UPDATE VEHICLE
========================================= */

const updateVehicle =
  async (

    vehicleNumber,
    updatedData

  ) => {

    try {

      const result =
        await pool.query(

          `
          UPDATE vehicles

          SET

            manufacturer = $1,
            vehicle_model = $2,
            registration_year = $3,
            fuel_type = $4,
            vehicle_type = $5,
            rto_location = $6,
            city = $7,
            state = $8,
            owner_status = $9

          WHERE vehicle_number = $10

          RETURNING *
          `,

          [

            updatedData.manufacturer,

            updatedData.vehicle_model,

            updatedData.registration_year,

            updatedData.fuel_type,

            updatedData.vehicle_type,

            updatedData.rto_location,

            updatedData.city,

            updatedData.state,

            updatedData.owner_status,

            vehicleNumber
          ]
        );

      return result.rows[0];

    } catch (error) {

      console.log(
        "UPDATE VEHICLE ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET OWNER VEHICLES
========================================= */

const getOwnerVehicles =
  async (ownerId) => {

    try {

      const result =
        await pool.query(

          `
          SELECT *

          FROM vehicles

          WHERE owner_id = $1
          `,

          [ownerId]
        );

      return result.rows;

    } catch (error) {

      console.log(
        "GET OWNER VEHICLES ERROR:"
      );

      console.log(error);

      throw error;
    }
};

/* =========================================
   GET VEHICLE HISTORY
========================================= */

const getVehicleHistory =
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
   EXPORTS
========================================= */

module.exports = {

  getVehicleByNumber,

  saveVehicle,

  updateVehicle,

  getOwnerVehicles,

  getVehicleHistory
};