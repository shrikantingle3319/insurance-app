import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <h1>
          Smart Auto Insurance
          Platform 🚗
        </h1>

        <p>
          Compare policies, calculate
          premiums, and get AI-powered
          insurance recommendations
          instantly.
        </p>

        <button
          onClick={() =>
            navigate("/quote")
          }
        >
          Explore Insurance Plans
        </button>
      </div>

      <h1 className="section-title">
        Why Choose Us?
      </h1>

      <div className="card-grid">
        <div className="info-card">
          <h2>
            ⚡ Instant Quotes
          </h2>

          <p>
            Get insurance quotes within
            seconds using intelligent
            AI-powered vehicle analysis.
          </p>
        </div>

        <div className="info-card">
          <h2>
            🤖 AI Assistant
          </h2>

          <p>
            Our AI chatbot helps users
            choose the best policy based
            on vehicle risk analysis.
          </p>
        </div>

        <div className="info-card">
          <h2>
            🔒 Secure Policies
          </h2>

          <p>
            Trusted by thousands with
            secure claims and reliable
            insurance partners.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;