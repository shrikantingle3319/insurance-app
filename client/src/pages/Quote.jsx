import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Quote() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      userId: null,

      vehicleNumber: "",

      vehicleModel: "",

      manufacturer: "",

      registrationYear: "",

      fuelType: "",

      vehicleType: "",

      rtoLocation: "",

      city: "",

      state: "",

      ownerName: "",

      mobile: "",

      insuranceType:
        "Comprehensive",

      previousInsurance:
        "Not Expired Yet",

      ncb: "0%"
    });

  const [premium, setPremium] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [recommendation,
    setRecommendation] =
    useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const generateQuote =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.post(

            "/quote/calculate",

            formData
          );

        setPremium(
          response.data.premium
        );

        setRecommendation(
          response.data.recommendation
        );

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

  return (

    <div className="container">

      <h1 className="section-title">
        Generate Insurance Quote
      </h1>

      <div className="contact-box">

        <div className="contact-form">

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="vehicleModel"
            placeholder="Vehicle Model"
            onChange={handleChange}
          />

          <input
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            onChange={handleChange}
          />

          <input
            type="number"
            name="registrationYear"
            placeholder="Registration Year"
            onChange={handleChange}
          />

          <select
            name="fuelType"
            className="insurance-select"
            onChange={handleChange}
          >

            <option>
              Select Fuel Type
            </option>

            <option value="Petrol">
              Petrol
            </option>

            <option value="Diesel">
              Diesel
            </option>

            <option value="CNG">
              CNG
            </option>

            <option value="Electric">
              Electric
            </option>

          </select>

          <select
            name="vehicleType"
            className="insurance-select"
            onChange={handleChange}
          >

            <option>
              Select Vehicle Type
            </option>

            <option value="Two Wheeler">
              Two Wheeler
            </option>

            <option value="Private Car">
              Private Car
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Commercial">
              Commercial
            </option>

          </select>

          <input
            type="text"
            name="rtoLocation"
            placeholder="RTO Location"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
          />

          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
          />

          <select
            name="insuranceType"
            className="insurance-select"
            onChange={handleChange}
          >

            <option value="Comprehensive">
              Comprehensive
            </option>

            <option value="Third Party">
              Third Party
            </option>

          </select>

          <select
            name="previousInsurance"
            className="insurance-select"
            onChange={handleChange}
          >

            <option value="Not Expired Yet">
              Not Expired Yet
            </option>

            <option value="Expired Within 90 Days">
              Expired Within 90 Days
            </option>

            <option value="Expired More Than 90 Days">
              Expired More Than 90 Days
            </option>

          </select>

          <select
            name="ncb"
            className="insurance-select"
            onChange={handleChange}
          >

            <option value="0%">
              0% NCB
            </option>

            <option value="20%">
              20% NCB
            </option>

            <option value="25%">
              25% NCB
            </option>

            <option value="35%">
              35% NCB
            </option>

            <option value="50%">
              50% NCB
            </option>

          </select>

          <button
            onClick={generateQuote}
          >

            {
              loading
              ? "Calculating..."
              : "Generate Quote"
            }

          </button>

        </div>

        {

          premium && (

            <div className="premium-box">

              <h2>
                Estimated Premium
              </h2>

              <h1>
                ₹ {premium}
              </h1>

              <p
                style={{
                  marginTop: "20px"
                }}
              >
                {recommendation}
              </p>

              <button

                className="buy-btn"

                style={{
                  marginTop: "20px"
                }}

                onClick={() =>
                  navigate(
                    "/plans",
                    {
                      state: {
                        formData
                      }
                    }
                  )
                }
              >
                Show Quotes
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Quote;