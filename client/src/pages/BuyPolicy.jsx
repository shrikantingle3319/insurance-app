import {

  useLocation,
  useNavigate

} from "react-router-dom";

import { useState }
from "react";

import axios
from "axios";

function BuyPolicy() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const policy =
    location.state?.policy;

  const [loading,
    setLoading] =
    useState(false);

  const handlePurchase =
    async () => {

      try {

        setLoading(true);

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            )
          );

        await axios.post(

          "http://localhost:5000/api/policy/buy",

          {

            user_id:
              user?.user_id || 1,

            vehicle_id: 1,

            insurer_name:
              policy?.insurer,

            policy_name:
              policy?.policy_name,

            premium_paid:
              policy?.premium
          }
        );

        alert(
          "Policy Purchased Successfully 😎"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Policy Purchase Failed"
        );
      }

      setLoading(false);
    };

  return (

    <div className="container">

      <h1 className="section-title">
        Buy Policy
      </h1>

      <div className="contact-box">

        <h2>
          {policy?.insurer}
        </h2>

        <h3>
          {
            policy?.policy_name
          }
        </h3>

        <h1>
          ₹ {policy?.premium}
        </h1>

        <input
          type="text"
          placeholder="Nominee Name"
        />

        <input
          type="text"
          placeholder="PAN Number"
        />

        <input
          type="text"
          placeholder="Aadhaar Number"
        />

        <input
          type="text"
          placeholder="Engine Number"
        />

        <input
          type="text"
          placeholder="Chassis Number"
        />

        <textarea
          placeholder="Address"
        />

        <button
          onClick={
            handlePurchase
          }
        >

          {

            loading

            ?

            "Processing..."

            :

            "Buy Policy"
          }

        </button>

      </div>

    </div>
  );
}

export default BuyPolicy;