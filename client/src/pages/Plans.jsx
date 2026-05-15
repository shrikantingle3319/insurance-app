import {

  useEffect,
  useState

} from "react";

import {

  useLocation,
  useNavigate

} from "react-router-dom";

import axios from "axios";

function Plans() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const formData =
    location.state?.formData;

  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedAddons,
    setSelectedAddons] =
    useState([]);

  useEffect(() => {

    generatePlans();

  }, [selectedAddons]);

  const generatePlans =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.post(

            "http://localhost:5000/api/ai-plans/recommend",

            {

              ...formData,

              selectedAddons
            }
          );

        setPlans(

          response.data
          .recommended_policies
        );

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

  const handleAddonChange =
    (addon) => {

      if (
        selectedAddons.includes(
          addon
        )
      ) {

        setSelectedAddons(

          selectedAddons.filter(
            (item) =>
              item !== addon
          )
        );
      }

      else {

        setSelectedAddons([

          ...selectedAddons,

          addon
        ]);
      }
    };

  return (

    <div className="plans-page">

      <h1 className="section-title">
        Insurance Quotes
      </h1>

      <div className="plans-layout">

        {/* LEFT SIDEBAR */}

        <div className="plans-sidebar">

          <div className="vehicle-card">

            <h2>
              Vehicle Details
            </h2>

            <p>
              <strong>
                Vehicle:
              </strong>
              {" "}
              {
                formData
                ?.vehicleModel
              }
            </p>

            <p>
              <strong>
                Number:
              </strong>
              {" "}
              {
                formData
                ?.vehicleNumber
              }
            </p>

            <p>
              <strong>
                Fuel:
              </strong>
              {" "}
              {
                formData
                ?.fuelType
              }
            </p>

            <p>
              <strong>
                Insurance:
              </strong>
              {" "}
              {
                formData
                ?.insuranceType
              }
            </p>

            <p>
              <strong>
                NCB:
              </strong>
              {" "}
              {
                formData?.ncb
              }
            </p>

          </div>

          {/* CUSTOMIZE */}

          <div className="customize-card">

            <h2>
              Customize Insurance
            </h2>

            <label>

              <input
                type="checkbox"

                onChange={() =>
                  handleAddonChange(
                    "Zero Depreciation"
                  )
                }
              />

              Zero Depreciation

            </label>

            <label>

              <input
                type="checkbox"

                onChange={() =>
                  handleAddonChange(
                    "Engine Protection"
                  )
                }
              />

              Engine Protection

            </label>

            <label>

              <input
                type="checkbox"

                onChange={() =>
                  handleAddonChange(
                    "Roadside Assistance"
                  )
                }
              />

              Roadside Assistance

            </label>

            <label>

              <input
                type="checkbox"

                onChange={() =>
                  handleAddonChange(
                    "Return To Invoice"
                  )
                }
              />

              Return To Invoice

            </label>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="plans-content">

          <div className="ai-header">

            <h2>
              AI Recommended Policies
            </h2>

            <p>

              Policies dynamically
              updated using AI based
              on selected add-ons,
              vehicle profile,
              insurance history,
              affordability and risk.

            </p>

          </div>

          {

            loading

            ?

            (
              <h2>
                Loading...
              </h2>
            )

            :

            plans.map(

              (
                policy,
                index
              ) => (

                <div
                  className="plan-card"

                  key={index}
                >

                  <div
                    className="plan-left"
                  >

                    <h2

                      style={{
                        cursor:
                          "pointer"
                      }}

                      onClick={() =>
                        navigate(
                          "/policy-details",

                          {
                            state: {
                              policy
                            }
                          }
                        )
                      }
                    >

                      {
                        policy.insurer
                      }

                    </h2>

                    <h3>
                      {
                        policy
                        .policy_name
                      }
                    </h3>

                    <p>
                      Cashless
                      Garages:
                      {" "}
                      {
                        policy
                        .cashless_garages
                      }
                    </p>

                    <p>
                      NCB:
                      {" "}
                      {
                        policy.ncb
                      }
                    </p>

                  </div>

                  <div
                    className="plan-right"
                  >

                    <h2>
                      ₹
                      {" "}
                      {
                        policy.premium
                      }
                    </h2>

                    <button

                      className="buy-btn"

                      onClick={() =>
                        navigate(
                          "/policy-details",

                          {
                            state: {
                              policy
                            }
                          }
                        )
                      }
                    >

                      Buy Now

                    </button>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Plans;