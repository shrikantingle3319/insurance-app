import React, {

  useState

} from "react";

import axios from "axios";

import {

  useNavigate,
  useLocation

} from "react-router-dom";

/* =========================================
   QUOTE PAGE
========================================= */

const Quote = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* =====================================
     FORM STATE
  ===================================== */

  const [

    formData,

    setFormData

  ] = useState({

    vehicleNumber:

      location.state
      ?.vehicleNumber || "",

    manufacturer:

      location.state
      ?.manufacturer || "",

    vehicleModel:

      location.state
      ?.vehicleModel || "",

    registrationYear:

      location.state
      ?.registrationYear || "",

    fuelType:

      location.state
      ?.fuelType || "",

    vehicleType:

      location.state
      ?.vehicleType || "",

    city:

      location.state
      ?.city || "",

    state:

      location.state
      ?.state || "",

    rtoLocation:

      location.state
      ?.rtoLocation || "",

    ownerStatus:

      location.state
      ?.ownerStatus || ""
  });

  /* =====================================
     UI STATES
  ===================================== */

  const [

    loading,

    setLoading

  ] = useState(false);

  const [

    error,

    setError

  ] = useState("");

  const [

    editableFields,

    setEditableFields

  ] = useState([]);

  const [

    currentStep,

    setCurrentStep

  ] = useState(1);

  const [

    loadingMessage,

    setLoadingMessage

  ] = useState("");

  /* =====================================
     HANDLE INPUT
  ===================================== */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  /* =====================================
     SUBMIT FORM
  ===================================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setEditableFields([]);

      try {

        /* ===============================
           VALIDATION STEP
        =============================== */

        setCurrentStep(2);

        setLoadingMessage(
          "Checking vehicle history..."
        );

        await new Promise(

          (resolve) =>
            setTimeout(resolve, 1000)
        );

        /* ===============================
           FRAUD ANALYSIS STEP
        =============================== */

        setCurrentStep(3);

        setLoadingMessage(
          "Running fraud analysis..."
        );

        await new Promise(

          (resolve) =>
            setTimeout(resolve, 1000)
        );

        /* ===============================
           QUOTE GENERATION STEP
        =============================== */

        setCurrentStep(4);

        setLoadingMessage(
          "Generating insurance quotes..."
        );

        /* ===============================
           API REQUEST
        =============================== */

        const response =
          await axios.post(

            "http://localhost:5000/api/aiplans/generate",

            formData
          );

        /* ===============================
          SUCCESS
        =============================== */

        console.log(
          "API RESPONSE:",
          response.data
        );

        const workflow =
          response.data.workflow;

        if (
          workflow?.insuranceResult
            ?.success
        ) {

          setCurrentStep(5);

          navigate(
            "/plans",
            {
              state: {

                validation:
                  workflow.validationResult,

                policies:
                  workflow.insuranceResult
                    .recommended_policies,

                bestPolicy:
                  workflow.insuranceResult
                    .best_policy,

                totalQuotes:
                  workflow.insuranceResult
                    .total_quotes
              }
            }
          );

          return;
        }

        if (
          !workflow?.insuranceResult
            ?.success
        ) {

          setError(

            workflow
              ?.insuranceResult
              ?.message ||

            "No insurance plans found."
          );

          return;
        }

        /* ===============================
           OWNERSHIP QUESTION
        =============================== */

        else if (

          response.data.status ===
          "OWNERSHIP_MISMATCH"

        ) {

          navigate(

            "/plans",

            {

              state: {

                question:

                  response.data
                  .question,

                vehicleData:
                  formData
              }
            }
          );
        }

      } catch (err) {

        console.log(err);

        /* ===============================
           INVALID DETAILS
        =============================== */

        if (

          err.response?.data
          ?.status === "FALSE"

        ) {

          setError(

            err.response.data
            .message
          );
        }

        /* ===============================
           DETAILS MISMATCH
        =============================== */

        else if (

          err.response?.data
          ?.status ===
          "MISMATCH"

        ) {

          setError(

            err.response.data
            .message
          );

          setEditableFields(

            err.response.data
            .editableFields || []
          );

          const dbRecord =

            err.response.data
            .dbRecord || {};

          setFormData({

            ...formData,

            ...dbRecord
          });
        }

        else {

          setError(
            "Something went wrong"
          );
        }

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        {/* ===========================
            TITLE
        =========================== */}

        <h1 className="text-4xl font-bold mb-8">

          AI Insurance Underwriting
        </h1>

        {/* ===========================
            STEP INDICATOR
        =========================== */}

        <div className="flex items-center justify-between mb-10">

          {

            [

              "Vehicle Details",

              "Validation",

              "Fraud Analysis",

              "Quote Generation",

              "Plans"

            ].map(

              (step, index) => (

                <div

                  key={index}

                  className="flex flex-col items-center flex-1"

                >

                  <div

                    className={`

                      w-10 h-10 rounded-full flex items-center justify-center text-white font-bold

                      ${currentStep > index

                        ? "bg-green-500"

                        : currentStep === index + 1

                          ? "bg-blue-600"

                          : "bg-gray-300"
                      }

                    `}
                  >

                    {

                      currentStep > index

                        ? "✓"

                        : index + 1
                    }

                  </div>

                  <p className="text-sm mt-2 text-center">

                    {step}

                  </p>

                </div>
              )
            )
          }

        </div>

        {/* ===========================
            LOADING STATUS
        =========================== */}

        {

          loading && (

            <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">

              {loadingMessage}

            </div>
          )
        }

        {/* ===========================
            ERROR MESSAGE
        =========================== */}

        {

          error && (

            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">

              {error}

            </div>
          )
        }

        {/* ===========================
            CONVERSATIONAL PROMPT
        =========================== */}

        <div className="bg-gray-100 p-5 rounded-xl mb-8">

          <p className="text-gray-700">

            Tell us about your vehicle and our AI underwriting system
            will validate ownership, analyze fraud risk, and generate
            personalized insurance recommendations.

          </p>

        </div>

        {/* ===========================
            FORM
        =========================== */}

        <form

          onSubmit={handleSubmit}

          className="grid grid-cols-1 md:grid-cols-2 gap-5"

        >

          {/* ===========================
              VEHICLE NUMBER
          =========================== */}

          <input

            type="text"

            name="vehicleNumber"

            placeholder="Vehicle Number"

            value={formData.vehicleNumber}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          />

          {/* ===========================
              MANUFACTURER
          =========================== */}

          <div>

            <input

              type="text"

              name="manufacturer"

              placeholder="Manufacturer"

              value={formData.manufacturer}

              onChange={handleChange}

              required

              className={`

                w-full border p-3 rounded-lg

                ${editableFields.includes(
                  "manufacturer"
                )

                  ? "border-red-500 bg-red-50"

                  : ""
                }

              `}
            />

            {

              editableFields.includes(
                "manufacturer"
              ) && (

                <p className="text-red-500 text-sm mt-1">

                  Manufacturer mismatch detected.
                  Please verify details.

                </p>
              )
            }

          </div>

          {/* ===========================
              VEHICLE MODEL
          =========================== */}

          <div>

            <input

              type="text"

              name="vehicleModel"

              placeholder="Vehicle Model"

              value={formData.vehicleModel}

              onChange={handleChange}

              required

              className={`

                w-full border p-3 rounded-lg

                ${editableFields.includes(
                  "vehicleModel"
                )

                  ? "border-red-500 bg-red-50"

                  : ""
                }

              `}
            />

            {

              editableFields.includes(
                "vehicleModel"
              ) && (

                <p className="text-red-500 text-sm mt-1">

                  Vehicle model mismatch detected.

                </p>
              )
            }

          </div>

          {/* ===========================
              REGISTRATION YEAR
          =========================== */}

          <input

            type="number"

            name="registrationYear"

            placeholder="Registration Year"

            value={formData.registrationYear}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          />

          {/* ===========================
              FUEL TYPE
          =========================== */}

          <div>

            <select

              name="fuelType"

              value={formData.fuelType}

              onChange={handleChange}

              required

              className={`

                w-full border p-3 rounded-lg

                ${editableFields.includes(
                  "fuelType"
                )

                  ? "border-red-500 bg-red-50"

                  : ""
                }

              `}
            >

              <option value="">
                Select Fuel Type
              </option>

              <option value="Petrol">
                Petrol
              </option>

              <option value="Diesel">
                Diesel
              </option>

              <option value="Electric">
                Electric
              </option>

              <option value="CNG">
                CNG
              </option>

            </select>

            {

              editableFields.includes(
                "fuelType"
              ) && (

                <p className="text-red-500 text-sm mt-1">

                  Fuel type mismatch detected.

                </p>
              )
            }

          </div>

          {/* ===========================
              VEHICLE TYPE
          =========================== */}

          <select

            name="vehicleType"

            value={formData.vehicleType}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          >

            <option value="">
              Select Vehicle Type
            </option>

            <option value="Car">
              Car
            </option>

            <option value="Bike">
              Bike
            </option>

          </select>

          {/* ===========================
              CITY
          =========================== */}

          <input

            type="text"

            name="city"

            placeholder="City"

            value={formData.city}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          />

          {/* ===========================
              STATE
          =========================== */}

          <input

            type="text"

            name="state"

            placeholder="State"

            value={formData.state}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          />

          {/* ===========================
              RTO LOCATION
          =========================== */}

          <input

            type="text"

            name="rtoLocation"

            placeholder="RTO Location"

            value={formData.rtoLocation}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          />

          {/* ===========================
              OWNER STATUS
          =========================== */}

          <select

            name="ownerStatus"

            value={formData.ownerStatus}

            onChange={handleChange}

            required

            className="border p-3 rounded-lg"

          >

            <option value="">
              Select Owner Status
            </option>

            <option value="First Owner">
              First Owner
            </option>

            <option value="Second Owner">
              Second Owner
            </option>

            <option value="Third Owner">
              Third Owner
            </option>

            <option value="Fourth Owner">
              Fourth Owner
            </option>

          </select>

          {/* ===========================
              BUTTON
          =========================== */}

          <button

            type="submit"

            disabled={loading}

            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all text-lg font-semibold"

          >

            {

              loading

                ? "Processing Workflow..."

                : "Start AI Underwriting"
            }

          </button>

        </form>

      </div>

    </div>
  );
};

export default Quote;