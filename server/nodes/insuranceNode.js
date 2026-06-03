const {
  generateInsuranceQuotes
} = require("../agents/quoteAgent");

/* =========================================
   INSURANCE NODE
========================================= */

const insuranceNode = async (state) => {
  try {
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

        nextStep: "END",

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

    const aiValidation =
      validationResult
        ?.aiValidation || {};

    /* =====================================
       INSURANCE INPUT
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

    console.log(
      "INSURANCE RESPONSE:"
    );

    console.log(
      JSON.stringify(
        insuranceResponse,
        null,
        2
      )
    );

    /* =====================================
       AGENT FAILURE
    ===================================== */

    if (
      !insuranceResponse.success
    ) {
      return {
        ...state,

        nextStep: "END",

        insuranceResult: {
          success: false,

          message:
            insuranceResponse.message ||
            "Insurance quote generation failed."
        }
      };
    }

    /* =====================================
       EXTRACT POLICIES
    ===================================== */

    const policies =
      insuranceResponse.policies || [];

    /* =====================================
       NO POLICIES
    ===================================== */

    if (
      policies.length === 0
    ) {
      return {
        ...state,

        nextStep: "END",

        insuranceResult: {
          success: false,

          message:
            "No insurance plans available for this vehicle profile."
        }
      };
    }

    /* =====================================
       SORT POLICIES
    ===================================== */

    const sortedPolicies =
      policies.sort((a, b) => {
        const premiumA =
          Number(
            String(
              a.premium
            ).replace(/[^\d]/g, "")
          ) || 0;

        const premiumB =
          Number(
            String(
              b.premium
            ).replace(/[^\d]/g, "")
          ) || 0;

        return (
          premiumA - premiumB
        );
      });

    /* =====================================
       BEST POLICY
    ===================================== */

    const bestPolicy =
      sortedPolicies[0];

    /* =====================================
       SUCCESS
    ===================================== */

    return {
      ...state,

      nextStep: "COMPLETE",

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

      nextStep: "END",

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