const {

  validateVehicle

} = require(
  "../agents/validationAgent"
);

const {

  getVehicleByNumber,
  saveVehicle

} = require(
  "../db/vehicleQueries"
);

const {

  saveValidationLog

} = require(
  "../db/validationLogQueries"
);

/* =========================================
   VALIDATION NODE
========================================= */

const validationNode =
  async (state) => {

    try {

      /* =====================================
         USER INPUT
      ===================================== */

      const vehicleData =

        state.vehicleData;

      /* =====================================
         FETCH VEHICLE FROM DB
      ===================================== */

      const dbVehicle =

        await getVehicleByNumber(

          vehicleData.vehicleNumber
        );

      /* =====================================
         NEW VEHICLE
      ===================================== */

      if (!dbVehicle) {

        /* =================================
           AI VALIDATION
        ================================= */

        const aiValidation =

          await validateVehicle({

            ...vehicleData,

            dbVehicle: null
          });

        /* =================================
           VALIDATION FAILED
        ================================= */

        if (

          !aiValidation.success ||

          !aiValidation.validation
          ?.isValid

        ) {

          return {

            ...state,

            nextStep:
              "INVALID",

            validationResult: {

              status:
                "FALSE",

              message:

                "Vehicle details could not be validated. Please verify details again.",

              aiValidation:
                aiValidation.validation
            }
          };
        }

        /* =================================
           SAVE NEW VEHICLE
        ================================= */

        await saveVehicle({

          owner_id:
            vehicleData.owner_id || 1,

          vehicle_number:
            vehicleData.vehicleNumber,

          manufacturer:
            vehicleData.manufacturer,

          vehicle_model:
            vehicleData.vehicleModel,

          registration_year:
            vehicleData.registrationYear,

          fuel_type:
            vehicleData.fuelType,

          vehicle_type:
            vehicleData.vehicleType,

          rto_location:
            vehicleData.rtoLocation,

          city:
            vehicleData.city,

          state:
            vehicleData.state,

          owner_status:
            vehicleData.ownerStatus
        });

        /* =================================
           SAVE VALIDATION LOG
        ================================= */

        await saveValidationLog(

          vehicleData.vehicleNumber,

          vehicleData.owner_id || 1,

          aiValidation.validation
        );

        /* =================================
           VALID VEHICLE
        ================================= */

        return {

          ...state,

          nextStep:
            "VALID",

          validationResult: {

            status:
              "TRUE",

            message:
              "New vehicle validated successfully",

            aiValidation:
              aiValidation.validation
          }
        };
      }

      /* =====================================
         MANUFACTURER MISMATCH
      ===================================== */

      if (

        dbVehicle.manufacturer
          ?.toLowerCase() !==

        vehicleData.manufacturer
          ?.toLowerCase()

      ) {

        return {

          ...state,

          nextStep:
            "EDIT_REQUIRED",

          validationResult: {

            status:
              "MISMATCH",

            message:

              "Manufacturer mismatch detected. Please verify details.",

            editableFields: [

              "manufacturer"
            ],

            dbRecord: {

              manufacturer:
                dbVehicle.manufacturer
            }
          }
        };
      }

      /* =====================================
         VEHICLE MODEL MISMATCH
      ===================================== */

      if (

        dbVehicle.vehicle_model
          ?.toLowerCase() !==

        vehicleData.vehicleModel
          ?.toLowerCase()

      ) {

        return {

          ...state,

          nextStep:
            "EDIT_REQUIRED",

          validationResult: {

            status:
              "MISMATCH",

            message:

              "Vehicle model mismatch detected. Please verify details.",

            editableFields: [

              "vehicleModel"
            ],

            dbRecord: {

              vehicleModel:
                dbVehicle.vehicle_model
            }
          }
        };
      }

      /* =====================================
         FUEL TYPE MISMATCH
      ===================================== */

      if (

        dbVehicle.fuel_type
          ?.toLowerCase() !==

        vehicleData.fuelType
          ?.toLowerCase()

      ) {

        return {

          ...state,

          nextStep:
            "EDIT_REQUIRED",

          validationResult: {

            status:
              "MISMATCH",

            message:

              "Fuel type mismatch detected. Please verify details.",

            editableFields: [

              "fuelType"
            ],

            dbRecord: {

              fuelType:
                dbVehicle.fuel_type
            }
          }
        };
      }

      /* =====================================
         OWNER STATUS MISMATCH
      ===================================== */

      if (

        dbVehicle.owner_status
          ?.toLowerCase() !==

        vehicleData.ownerStatus
          ?.toLowerCase()

      ) {

        return {

          ...state,

          nextStep:
            "ASK_OWNER",

          validationResult: {

            status:
              "OWNERSHIP_MISMATCH",

            question:

              "We detected a different ownership history for this vehicle. Are you the first, second, third, or fourth owner?",

            dbRecord: {

              ownerStatus:
                dbVehicle.owner_status
            }
          }
        };
      }

      /* =====================================
         AI VALIDATION
      ===================================== */

      const aiValidation =

        await validateVehicle({

          ...vehicleData,

          dbVehicle
        });

      /* =====================================
         VALIDATION FAILURE
      ===================================== */

      if (

        !aiValidation.success ||

        !aiValidation.validation
        ?.isValid

      ) {

        /* =================================
           SAVE FRAUD HISTORY
        ================================= */

        await saveValidationLog(

          vehicleData.vehicleNumber,

          dbVehicle.owner_id,

          aiValidation.validation
        );

        return {

          ...state,

          nextStep:
            "INVALID",

          validationResult: {

            status:
              "FALSE",

            message:

              "Vehicle validation failed. Please recheck details.",

            aiValidation:
              aiValidation.validation
          }
        };
      }

      /* =====================================
         HIGH FRAUD DETECTION
      ===================================== */

      if (

        aiValidation.validation
        ?.fraudProbability > 70

      ) {

        await saveValidationLog(

          vehicleData.vehicleNumber,

          dbVehicle.owner_id,

          aiValidation.validation
        );

        return {

          ...state,

          nextStep:
            "INVALID",

          validationResult: {

            status:
              "FALSE",

            message:

              "Suspicious activity detected. Additional verification required.",

            aiValidation:
              aiValidation.validation
          }
        };
      }

      /* =====================================
         SAVE VALIDATION LOG
      ===================================== */

      await saveValidationLog(

        vehicleData.vehicleNumber,

        dbVehicle.owner_id,

        aiValidation.validation
      );

      /* =====================================
         VALID VEHICLE
      ===================================== */

      return {

        ...state,

        nextStep:
          "VALID",

        validationResult: {

          status:
            "TRUE",

          message:
            "Vehicle validated successfully",

          aiValidation:
            aiValidation.validation
        }
      };

    } catch (error) {

      console.log(
        "VALIDATION NODE ERROR:"
      );

      console.log(error);

      return {

        ...state,

        nextStep:
          "INVALID",

        validationResult: {

          status:
            "FALSE",

          message:
            "Validation workflow failed"
        }
      };
    }
};

module.exports = {
  validationNode
};