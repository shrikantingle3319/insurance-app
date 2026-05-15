import { useState } from "react";
import axios from "axios";

function InsuranceForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    car_model: "",
    car_year: "",
    insurance_type: "",
  });

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/insurance/quote",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        car_model: "",
        car_year: "",
        insurance_type: "",
      });
    } catch (error) {
      console.log(error);

      setMessage(
        "❌ Failed to save quote."
      );
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1>
          Get Insurance Quote 🚗
        </h1>

        <p>
          Fill your vehicle details and
          receive a personalized insurance
          quote instantly.
        </p>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="car_model"
            placeholder="Car Model"
            value={formData.car_model}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="car_year"
            placeholder="Manufacturing Year"
            value={formData.car_year}
            onChange={handleChange}
            required
          />

          <select
            name="insurance_type"
            value={
              formData.insurance_type
            }
            onChange={handleChange}
            className="insurance-select"
            required
          >
            <option value="">
              Select Insurance Type
            </option>

            <option value="Third Party">
              Third Party
            </option>

            <option value="Comprehensive">
              Comprehensive
            </option>
          </select>

          <button type="submit">
            Submit Quote Request
          </button>
        </form>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default InsuranceForm;