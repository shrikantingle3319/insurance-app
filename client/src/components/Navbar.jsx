import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      <h2>
        🚗 InsuranceAI
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/quote">
          Quote
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        {
          user ? (

            <>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
              >
                Logout
              </button>

            </>

          ) : (

            <Link to="/login">
              Login
            </Link>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;