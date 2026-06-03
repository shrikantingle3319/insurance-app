import React from "react";

import {

  useLocation,
  useNavigate

} from "react-router-dom";

/* =========================================
   PLANS PAGE
========================================= */

const Plans = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  console.log(
    "PLANS PAGE DATA:",
    location.state
  );

  /* =====================================
     STATE FROM NAVIGATION
  ===================================== */

  const {

  policies = [],

  validation = null,

  question = "",

  vehicleData = {},

  bestPolicy = null,

  totalQuotes = 0

} = location.state || {};

  /* =====================================
     HANDLE OWNER RESPONSE
  ===================================== */

  const handleOwnerSelection =
    async (ownerStatus) => {

      navigate(

        "/quote",

        {

          state: {

            ...vehicleData,

            ownerStatus
          }
        }
      );
    };

  /* =====================================
     RISK BADGE COLOR
  ===================================== */

  const getRiskColor =
    (riskLevel) => {

      if (
        riskLevel === "HIGH"
      ) {

        return "bg-red-100 text-red-700";
      }

      if (
        riskLevel === "MEDIUM"
      ) {

        return "bg-yellow-100 text-yellow-700";
      }

      return "bg-green-100 text-green-700";
    };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* ===============================
            PAGE TITLE
        =============================== */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            AI Insurance Results
          </h1>

          <p className="text-gray-600 mt-2">

            Intelligent underwriting workflow completed successfully.

          </p>

        </div>

        {/* ===============================
            WORKFLOW TIMELINE
        =============================== */}

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

          <div className="flex items-center justify-between">

            {

              [

                "Vehicle Validation",

                "Fraud Analysis",

                "Ownership Verification",

                "Quote Generation",

                "Plans Ready"

              ].map(

                (step, index) => (

                  <div

                    key={index}

                    className="flex flex-col items-center flex-1"

                  >

                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">

                      ✓

                    </div>

                    <p className="text-sm mt-2 text-center">

                      {step}

                    </p>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* ===============================
            OWNERSHIP QUESTION
        =============================== */}

        {

          question && (

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

              <div className="flex items-center mb-5">

                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">

                  ⚠️

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">

                    Ownership Verification Required
                  </h2>

                  <p className="text-gray-600">

                    Historical ownership records need clarification.

                  </p>

                </div>

              </div>

              <div className="bg-gray-100 p-5 rounded-xl mb-6">

                <p className="text-gray-700 text-lg">

                  {question}

                </p>

              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <button

                  onClick={() =>
                    handleOwnerSelection(
                      "First Owner"
                    )
                  }

                  className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"

                >

                  First Owner

                </button>

                <button

                  onClick={() =>
                    handleOwnerSelection(
                      "Second Owner"
                    )
                  }

                  className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"

                >

                  Second Owner

                </button>

                <button

                  onClick={() =>
                    handleOwnerSelection(
                      "Third Owner"
                    )
                  }

                  className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"

                >

                  Third Owner

                </button>

                <button

                  onClick={() =>
                    handleOwnerSelection(
                      "Fourth Owner"
                    )
                  }

                  className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"

                >

                  Fourth Owner

                </button>

              </div>

            </div>
          )
        }

        {/* ===============================
            FRAUD WARNING
        =============================== */}

        {

          validation
          ?.aiValidation
          ?.fraudProbability > 60 && (

            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-5 rounded-2xl mb-8">

              <h3 className="text-xl font-semibold mb-2">

                Suspicious Vehicle Profile Detected
              </h3>

              <p>

                Additional verification may be required before policy approval.

              </p>

            </div>
          )
        }

        {/* ===============================
            VALIDATION SUMMARY
        =============================== */}

        {

          validation && (

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-3xl font-bold">

                    AI Validation Summary
                  </h2>

                  <p className="text-gray-600 mt-1">

                    Intelligent fraud analysis and underwriting results.

                  </p>

                </div>

                {

                  validation
                  ?.aiValidation
                  ?.riskLevel && (

                    <div

                      className={`

                        px-5 py-2 rounded-full text-sm font-semibold

                        ${getRiskColor(

                          validation
                          ?.aiValidation
                          ?.riskLevel
                        )}

                      `}
                    >

                      {

                        validation
                        ?.aiValidation
                        ?.riskLevel
                      } RISK

                    </div>
                  )
                }

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* =======================
                    STATUS
                ======================= */}

                <div className="bg-gray-100 p-5 rounded-xl">

                  <p className="text-gray-500 mb-1">

                    Validation Status
                  </p>

                  <h3 className="text-2xl font-bold">

                    {

                      validation
                      ?.status
                    }

                  </h3>

                </div>

                {/* =======================
                    FRAUD PROBABILITY
                ======================= */}

                <div className="bg-gray-100 p-5 rounded-xl">

                  <p className="text-gray-500 mb-1">

                    Fraud Probability
                  </p>

                  <h3 className="text-2xl font-bold">

                    {

                      validation
                      ?.aiValidation
                      ?.fraudProbability || 0

                    }%

                  </h3>

                </div>

                {/* =======================
                    CONFIDENCE SCORE
                ======================= */}

                <div className="bg-gray-100 p-5 rounded-xl">

                  <p className="text-gray-500 mb-1">

                    AI Confidence Score
                  </p>

                  <h3 className="text-2xl font-bold">

                    {

                      validation
                      ?.aiValidation
                      ?.confidenceScore || 0

                    }%

                  </h3>

                </div>

                {/* =======================
                    MESSAGE
                ======================= */}

                <div className="bg-gray-100 p-5 rounded-xl">

                  <p className="text-gray-500 mb-1">

                    Workflow Message
                  </p>

                  <h3 className="text-lg font-semibold">

                    {

                      validation
                      ?.message
                    }

                  </h3>

                </div>

              </div>

              {/* =======================
                  AI ANALYSIS
              ======================= */}

              {

                validation
                ?.aiValidation
                ?.analysis && (

                  <div className="mt-8">

                    <h3 className="text-xl font-semibold mb-3">

                      AI Underwriting Analysis
                    </h3>

                    <div className="bg-blue-50 p-5 rounded-xl text-gray-700">

                      {

                        validation
                        ?.aiValidation
                        ?.analysis
                      }

                    </div>

                  </div>
                )
              }

              {/* =======================
                  MISMATCHES
              ======================= */}

              {

                validation
                ?.aiValidation
                ?.mismatches
                ?.length > 0 && (

                  <div className="mt-8">

                    <h3 className="text-xl font-semibold mb-3">

                      Detected Inconsistencies
                    </h3>

                    <div className="bg-red-50 p-5 rounded-xl">

                      <ul className="list-disc ml-6 text-red-700">

                        {

                          validation
                          ?.aiValidation
                          ?.mismatches
                          ?.map(

                            (
                              mismatch,
                              index
                            ) => (

                              <li key={index}>

                                {mismatch}

                              </li>
                            )
                          )
                        }

                      </ul>

                    </div>

                  </div>
                )
              }

            </div>
          )
        }

{
  bestPolicy && (

    <div className="bg-green-100 border border-green-300 p-6 rounded-2xl shadow-lg mb-8">

      <h2 className="text-2xl font-bold text-green-700">

        🏆 Best Recommended Policy

      </h2>

      <div className="mt-4">

        <p>

          <strong>Insurer:</strong>
          {" "}
          {bestPolicy.insurer}

        </p>

        <p>

          <strong>Policy:</strong>
          {" "}
          {bestPolicy.policy_name}

        </p>

        <p>

          <strong>Premium:</strong>
          {" "}
          ₹{bestPolicy.premium}

        </p>

        <p>

          <strong>Total Quotes Generated:</strong>
          {" "}
          {totalQuotes}

        </p>

      </div>

    </div>
  )
}

        {/* ===============================
            INSURANCE POLICIES
        =============================== */}

        {

          policies.length > 0 && (

            <div>

              <div className="mb-8">

                <h2 className="text-4xl font-bold">

                  Recommended Insurance Plans
                </h2>

                <p className="text-gray-600 mt-2">

                  Personalized AI-generated insurance recommendations.

                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {

                  policies.map(

                    (policy, index) => (

                      <div

                        key={index}

                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"

                      >

                        {/* ===================
                            HEADER
                        =================== */}

                        <div className="flex items-center justify-between mb-5">

                          <div>

                            <h3 className="text-3xl font-bold">

                              {

                                policy.insurer
                              }

                            </h3>

                            <p className="text-gray-600 mt-1">

                              {

                                policy.policy_name
                              }

                            </p>

                          </div>

                          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                            AI Recommended

                          </div>

                        </div>

                        {/* ===================
                            PREMIUM
                        =================== */}

                        <div className="bg-blue-50 p-5 rounded-xl mb-5">

                          <p className="text-gray-500 mb-1">

                            Estimated Premium
                          </p>

                          <h2 className="text-4xl font-bold text-blue-700">

                            {

                              policy.premium
                            }

                          </h2>

                        </div>

                        {/* ===================
                            POLICY DETAILS
                        =================== */}

                        <div className="space-y-4 mb-6">

                          <div className="flex justify-between">

                            <span className="font-medium">

                              Cashless Garages
                            </span>

                            <span>

                              {

                                policy.cashless_garages
                              }

                            </span>

                          </div>

                          <div className="flex justify-between">

                            <span className="font-medium">

                              No Claim Bonus
                            </span>

                            <span>

                              {

                                policy.ncb
                              }

                            </span>

                          </div>

                        </div>

                        {/* ===================
                            ADDONS
                        =================== */}

                        <div className="mb-6">

                          <h4 className="text-lg font-semibold mb-3">

                            Recommended Add-ons
                          </h4>

                          <div className="flex flex-wrap gap-2">

                            {

                              policy
                              ?.addons
                              ?.map(

                                (
                                  addon,
                                  i
                                ) => (

                                  <div

                                    key={i}

                                    className="bg-gray-100 px-3 py-2 rounded-full text-sm"

                                  >

                                    {addon}

                                  </div>
                                )
                              )
                            }

                          </div>

                        </div>

                        {/* ===================
                            BENEFITS
                        =================== */}

                        <div>

                          <h4 className="text-lg font-semibold mb-3">

                            Key Benefits
                          </h4>

                          <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-700">

                              {policy.benefits}

                            </p>

                          </div>

                        </div>

                        {/* ===================
                            BUTTON
                        =================== */}

                        <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all text-lg font-semibold">

                          Buy Policy

                        </button>

                      </div>
                    )
                  )
                }

              </div>

            </div>
          )
        }

        {/* ===============================
            NO POLICIES
        =============================== */}

        {

          !question &&
          policies.length === 0 && (

            <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

              <h2 className="text-3xl font-bold mb-4">

                No Insurance Plans Found
              </h2>

              <p className="text-gray-600 mb-8">

                Please verify vehicle details and retry the underwriting workflow.

              </p>

              <button

                onClick={() =>
                  navigate("/quote")
                }

                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all text-lg"

              >

                Retry Validation

              </button>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Plans;