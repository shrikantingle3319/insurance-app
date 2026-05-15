const pool =
  require("../db/db");

const calculateQuote =
  async (req, res) => {

    try {

      const {

        userId,

        vehicleNumber,

        vehicleModel,

        manufacturer,

        registrationYear,

        fuelType,

        vehicleType,

        rtoLocation,

        city,

        state,

        insuranceType,

        previousInsurance,

        ncb

      } = req.body;

      let premium = 5000;

      const vehicleAge =

        new Date().getFullYear()

        - Number(registrationYear);

      premium += vehicleAge * 500;

      // VEHICLE TYPE

      if (
        vehicleType === "SUV"
      ) {

        premium += 3000;
      }

      if (
        vehicleType === "Commercial"
      ) {

        premium += 5000;
      }

      // FUEL TYPE

      if (fuelType === "Diesel") {

        premium += 2000;
      }

      if (
        fuelType === "Electric"
      ) {

        premium -= 1000;
      }

      // INSURANCE TYPE

      if (
        insuranceType ===
        "Comprehensive"
      ) {

        premium += 4000;
      }

      // METRO CITY RISK

      const metroCities = [

        "Mumbai",
        "Delhi",
        "Pune",
        "Bangalore",
        "Chennai"
      ];

      if (
        metroCities.includes(city)
      ) {

        premium += 3000;
      }

      // NCB

      if (ncb === "20%") {

        premium -= 1500;
      }

      if (ncb === "25%") {

        premium -= 2000;
      }

      if (ncb === "35%") {

        premium -= 3000;
      }

      if (ncb === "50%") {

        premium -= 4000;
      }

      let vehicle_id;

      // CHECK EXISTING VEHICLE

      const existingVehicle =
        await pool.query(

          `
          SELECT vehicle_id
          FROM vehicles
          WHERE vehicle_number = $1
          `,

          [vehicleNumber]
        );

      // IF EXISTS

      if (
        existingVehicle.rows.length > 0
      ) {

        vehicle_id =

          existingVehicle.rows[0]
          .vehicle_id;
      }

      // INSERT NEW VEHICLE

      else {

        const vehicleResult =
          await pool.query(

            `
            INSERT INTO vehicles
            (
              user_id,
              vehicle_number,
              vehicle_model,
              manufacturer,
              registration_year,
              fuel_type,
              vehicle_type,
              rto_location,
              city,
              state
            )

            VALUES
            (
              $1,$2,$3,$4,$5,
              $6,$7,$8,$9,$10
            )

            RETURNING vehicle_id
            `,

            [

              userId,

              vehicleNumber,

              vehicleModel,

              manufacturer,

              registrationYear,

              fuelType,

              vehicleType,

              rtoLocation,

              city,

              state
            ]
          );

        vehicle_id =

          vehicleResult.rows[0]
          .vehicle_id;
      }

      // SAVE QUOTE

      await pool.query(

        `
        INSERT INTO user_quotes
        (
          vehicle_id,
          insurance_type,
          previous_insurance_status,
          ncb,
          calculated_premium,
          is_logged_in
        )

        VALUES
        ($1,$2,$3,$4,$5,$6)
        `,

        [
          vehicle_id,
          insuranceType,
          previousInsurance,
          ncb,
          premium,
          false
        ]
      );

      let recommendation =

        "AI Recommendation: Comprehensive policy recommended for balanced protection.";

      if (vehicleAge > 10) {

        recommendation =

          "AI Recommendation: Third-party policy may be more economical.";
      }

      res.json({

        premium,

        recommendation
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"
      });
    }
  };

module.exports = {
  calculateQuote
};