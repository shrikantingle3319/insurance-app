import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Quote() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    registrationYear: "",
    fuelType: "",
    ownerName: "",
    mobile: "",
    insuranceType: "",
    previousInsurance: "",
    ncb: ""
  });

  const [premium, setPremium] =
    useState(null);

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

  const generateQuote = async () => {

    try {

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

      alert(
        "Failed to calculate premium"
      );
    }
  };

  return (

    <div className="container">

      <h1 className="section-title">
        Generate Insurance Quote
      </h1>

      <div className="quote-wrapper">

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

              <option value="">
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

              <option value="">
                Last Issued Insurance Status
              </option>

              <option value="Active">
                Not Expired Yet
              </option>

              <option value="ExpiredWithin90">
                Expired Within 90 Days
              </option>

              <option value="ExpiredMoreThan90">
                Expired More Than 90 Days
              </option>

            </select>

            <select
              name="ncb"
              className="insurance-select"
              onChange={handleChange}
            >

              <option value="">
                Select No Claim Bonus
              </option>

              <option value="0">
                0%
              </option>

              <option value="20">
                20%
              </option>

              <option value="35">
                35%
              </option>

              <option value="50">
                50%
              </option>

            </select>

            <button onClick={generateQuote}>
              Generate Quote
            </button>

          </div>

          {
            premium && (

              <div className="premium-box">

                <h2>
                  Estimated Premium
                </h2>

                <h1
                  style={{
                    marginTop: "15px",
                    fontSize: "52px"
                  }}
                >
                  ₹ {premium}
                </h1>

                <p
                  style={{
                    marginTop: "20px",
                    lineHeight: "1.8"
                  }}
                >
                  {recommendation}
                </p>

                <button
                  style={{
                    marginTop: "25px"
                  }}
                  onClick={() =>
                    navigate(
                      "/plans",
                      {
                        state: {
                          formData,
                          premium
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

    </div>
  );
}

export default Quote;