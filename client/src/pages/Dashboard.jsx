import {

  useEffect,
  useState

} from "react";

import axios from "axios";

function Dashboard() {

  const [dashboard,
    setDashboard] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  // TEMP USER

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/policy/dashboard/${user.user_id}`
          );

        setDashboard(
          response.data
        );

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

  if (loading) {

    return (

      <div className="plans-page">

        <h1>
          Loading Dashboard...
        </h1>

      </div>
    );
  }

  return (

    <div className="plans-page">

      <h1 className="section-title">

        Welcome,
        {" "}
        {
          dashboard?.user
          ?.full_name
        }

      </h1>

      <div className="dashboard-card">

        <h2>
          Dashboard
        </h2>

        <p>

          Active Policies:
          {" "}

          {
            dashboard
            ?.totalPolicies
          }

        </p>

        <p>

          Claims Raised:
          {" "}

          {
            dashboard
            ?.totalClaims
          }

        </p>

      </div>

      {/* POLICIES */}

      <div
        style={{
          marginTop: "40px"
        }}
      >

        <h2>
          My Policies
        </h2>

        {

          dashboard?.policies
          ?.map(

            (
              policy
            ) => (

              <div

                key={
                  policy.policy_id
                }

                className="plan-card"
              >

                <div
                  className="plan-left"
                >

                  <h2>
                    {
                      policy.insurer_name
                    }
                  </h2>

                  <p>

                    Policy No:
                    {" "}

                    {
                      policy.policy_number
                    }

                  </p>

                  <p>

                    Start:
                    {" "}

                    {
                      policy
                      .policy_start_date
                    }

                  </p>

                  <p>

                    End:
                    {" "}

                    {
                      policy
                      .policy_end_date
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
                      policy
                      .premium_paid
                    }

                  </h2>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;