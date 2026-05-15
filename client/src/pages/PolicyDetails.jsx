import {
  useLocation,
  useNavigate
} from "react-router-dom";

function PolicyDetails() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const policy =
    location.state?.policy;

  const handleBuyNow = () => {

    const user =
      localStorage.getItem(
        "user"
      );

    // USER NOT LOGGED IN

    if (!user) {

      navigate("/login");

      return;
    }

    // USER LOGGED IN

    navigate(
      "/buy-policy",

      {
        state: {
          policy
        }
      }
    );
  };

  if (!policy) {

    return (

      <div className="container">

        <h1>
          No Policy Found
        </h1>

      </div>
    );
  }

  return (

    <div className="plans-page">

      <h1 className="section-title">
        Policy Details
      </h1>

      <div className="policy-details-card">

        <h1>
          {policy.insurer}
        </h1>

        <h2>
          {policy.policy_name}
        </h2>

        <h3>
          ₹ {policy.premium}
        </h3>

        <p>
          <strong>
            Cashless Garages:
          </strong>
          {" "}
          {
            policy.cashless_garages
          }
        </p>

        <p>
          <strong>
            NCB:
          </strong>
          {" "}
          {policy.ncb}
        </p>

        <h3>
          Add-ons
        </h3>

        <ul>

          {
            policy.addons?.map(

              (
                addon,
                index
              ) => (

                <li key={index}>
                  {addon}
                </li>
              )
            )
          }

        </ul>

        <h3>
          Benefits
        </h3>

        <ul>

          {
            policy.benefits?.map(

              (
                benefit,
                index
              ) => (

                <li key={index}>
                  {benefit}
                </li>
              )
            )
          }

        </ul>

        <button

          className="buy-btn"

          onClick={
            handleBuyNow
          }
        >

          Buy Now

        </button>

      </div>

    </div>
  );
}

export default
PolicyDetails;