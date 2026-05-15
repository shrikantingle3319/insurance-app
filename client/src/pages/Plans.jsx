import {
  useLocation
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Plans() {

  const location = useLocation();

  const {
    formData
  } = location.state || {};

  const [aiData,
    setAiData] = useState([]);

  const [loading,
    setLoading] = useState(true);

  const [addons,
    setAddons] = useState({

      zeroDep: false,

      engineProtect: false,

      roadside: false,

      returnInvoice: false
    });

  // FETCH AI PLANS

  const fetchAIPlans = async (
    selectedAddons
  ) => {

    setLoading(true);

    try {

      const response =
        await API.post(

          "/ai-plans/recommend",

          {

            ...formData,

            addons:
              selectedAddons
          }
        );

      setAiData(

        response.data
        ?.recommended_policies

        ||

        []
      );

    } catch (error) {

      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {

    fetchAIPlans(addons);

  }, []);

  // HANDLE CHECKBOX

  const handleAddonChange = (
    e
  ) => {

    const updatedAddons = {

      ...addons,

      [e.target.name]:
        e.target.checked
    };

    setAddons(
      updatedAddons
    );

    fetchAIPlans(
      updatedAddons
    );
  };

  return (

    <div className="container">

      <h1 className="section-title">
        Insurance Quotes
      </h1>

      <div className="plans-layout">

        {/* SIDEBAR */}

        <div className="plans-sidebar">

          {/* VEHICLE */}

          <div className="sidebar-card">

            <div className="card-header">

              <h3>
                Vehicle Details
              </h3>

            </div>

            <p>
              <strong>Vehicle:</strong>
              {" "}
              {formData?.vehicleModel}
            </p>

            <p>
              <strong>Number:</strong>
              {" "}
              {formData?.vehicleNumber}
            </p>

            <p>
              <strong>Fuel:</strong>
              {" "}
              {formData?.fuelType}
            </p>

            <p>
              <strong>Insurance:</strong>
              {" "}
              {formData?.insuranceType}
            </p>

            <p>
              <strong>NCB:</strong>
              {" "}
              {formData?.ncb}%
            </p>

          </div>

          {/* CUSTOMIZE */}

          <div className="sidebar-card">

            <h3>
              Customize Insurance
            </h3>

            <div className="addons">

              <label>

                <input
                  type="checkbox"
                  name="zeroDep"
                  checked={
                    addons.zeroDep
                  }
                  onChange={
                    handleAddonChange
                  }
                />

                {" "}
                Zero Depreciation

              </label>

              <label>

                <input
                  type="checkbox"
                  name="engineProtect"
                  checked={
                    addons.engineProtect
                  }
                  onChange={
                    handleAddonChange
                  }
                />

                {" "}
                Engine Protection

              </label>

              <label>

                <input
                  type="checkbox"
                  name="roadside"
                  checked={
                    addons.roadside
                  }
                  onChange={
                    handleAddonChange
                  }
                />

                {" "}
                Roadside Assistance

              </label>

              <label>

                <input
                  type="checkbox"
                  name="returnInvoice"
                  checked={
                    addons.returnInvoice
                  }
                  onChange={
                    handleAddonChange
                  }
                />

                {" "}
                Return To Invoice

              </label>

            </div>

          </div>

        </div>

        {/* MAIN */}

        <div className="plans-main">

          <div className="ai-recommendation-box">

            <h2>
              AI Recommended Policies
            </h2>

            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.8"
              }}
            >
              Policies dynamically
              updated using AI based
              on selected add-ons,
              vehicle profile,
              insurance history,
              affordability and risk.
            </p>

          </div>

          {
            loading ? (

              <h2>
                Updating AI Plans...
              </h2>

            ) : (

              <div className="plans-list">

                {
                  aiData.map(
                    (
                      quote,
                      index
                    ) => (

                      <div
                        key={index}
                        className="insurance-plan-card"
                      >

                        {/* LEFT */}

                        <div>

                          <h2>

                            {
                              quote.insurer

                              ||

                              "Insurance Provider"
                            }

                          </h2>

                          <p>

                            {
                              quote.policy_name

                              ||

                              "Insurance Policy"
                            }

                          </p>

                          <p
                            style={{
                              marginTop: "12px",
                              lineHeight: "1.7"
                            }}
                          >

                            {
                              quote.suitability

                              ||

                              quote.coverage

                              ||

                              "Suitable insurance coverage."
                            }

                          </p>

                          <div className="addons-row">

                            {

                              (
                                quote
                                ?.features
                                ?.add_ons

                                ||

                                quote
                                ?.add_ons

                                ||

                                []
                              ).map(
                                (
                                  addon,
                                  i
                                ) => (

                                  <span key={i}>
                                    {addon}
                                  </span>
                                )
                              )
                            }

                          </div>

                        </div>

                        {/* RIGHT */}

                        <div className="buy-section">

                          <h2>

                            ₹ {

                              quote.premium

                              ||

                              quote.final_premium_after_ncb

                              ||

                              "N/A"
                            }

                          </h2>

                          <p
                            style={{
                              marginTop: "10px"
                            }}
                          >

                            <strong>
                              NCB:
                            </strong>

                            {" "}

                            {

                              quote
                              ?.features
                              ?.no_claim_bonus

                              ||

                              "Available"
                            }

                          </p>

                          <p
                            style={{
                              marginTop: "10px"
                            }}
                          >

                            <strong>
                              Cashless Garages:
                            </strong>

                            {" "}

                            {

                              quote
                              ?.features
                              ?.cashless_garages

                              ||

                              "3500+"
                            }

                          </p>

                          <button
                            className="buy-btn"
                            style={{
                              marginTop: "20px"
                            }}
                          >
                            Buy Now
                          </button>

                        </div>

                      </div>
                    )
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Plans;