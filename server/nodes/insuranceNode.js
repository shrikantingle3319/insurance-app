const {

  generateInsuranceQuotes

} = require(
  "../agents/quoteAgent"
);

/* =========================================
   INSURANCE NODE
========================================= */

const insuranceNode =
  async (state) => {

    try {

      /* =====================================
         VALIDATION RESULT
      ===================================== */

      const validationResult =

        state.validationResult;

      /* =====================================
         BLOCK INVALID VEHICLES
      ===================================== */

      if (

        validationResult?.status !==
        "TRUE"

      ) {

        return {

          ...state,

          nextStep:
            "END",

          insuranceResult: {

            success: false,

            message:

              "Insurance quote generation blocked due to validation failure."
          }
        };
      }

      /* =====================================
         VEHICLE DATA
      ===================================== */

      const vehicleData =

        state.vehicleData;

      /* =====================================
         AI VALIDATION CONTEXT
      ===================================== */

      const aiValidation =

        validationResult
        ?.aiValidation || {};

      /* =====================================
         INSURANCE AGENT INPUT
      ===================================== */

      const insuranceInput = {

        vehicleData,

        aiValidation
      };

      /* =====================================
         GENERATE QUOTES
      ===================================== */

      const insuranceResponse =

        await generateInsuranceQuotes(

          insuranceInput
        );

      /* =====================================
         AGENT FAILURE
      ===================================== */

      if (

        !insuranceResponse.success
      ) {

        return {

          ...state,

          nextStep:
            "END",

          insuranceResult: {

            success: false,

            message:

              insuranceResponse.message ||

              "Insurance quote generation failed."
          }
        };
      }

      /* =====================================
         EMPTY POLICIES
      ===================================== */

      if (

        !insuranceResponse
        ?.recommended_policies ||

        insuranceResponse
        ?.recommended_policies
        ?.length === 0

      ) {

        return {

          ...state,

          nextStep:
            "END",

          insuranceResult: {

            success: false,

            message:

              "No insurance plans available for this vehicle profile."
          }
        };
      }

      /* =====================================
         SORT BY PREMIUM
      ===================================== */

      const sortedPolicies =

        insuranceResponse
        .recommended_policies
        .sort(

          (a, b) => {

            const premiumA =

              parseInt(

                a.premium
                ?.replace(/[^\d]/g, "")

              ) || 0;

            const premiumB =

              parseInt(

                b.premium
                ?.replace(/[^\d]/g, "")

              ) || 0;

            return premiumA - premiumB;
          }
        );

      /* =====================================
         TOP RECOMMENDED POLICY
      ===================================== */

      const bestPolicy =

        sortedPolicies[0];

      /* =====================================
         FINAL SUCCESS
      ===================================== */

      return {

        ...state,

        nextStep:
          "COMPLETE",

        insuranceResult: {

          success: true,

          recommended_policies:

            sortedPolicies,

          best_policy:
            bestPolicy,

          total_quotes:

            sortedPolicies.length,

          generated_at:
            new Date()
        }
      };

    } catch (error) {

      console.log(
        "INSURANCE NODE ERROR:"
      );

      console.log(error);

      return {

        ...state,

        nextStep:
          "END",

        insuranceResult: {

          success: false,

          message:
            "Insurance workflow failed."
        }
      };
    }
};

module.exports = {
  insuranceNode
};