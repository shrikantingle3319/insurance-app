import { signInWithPopup } from "firebase/auth";

import {
  auth,
  provider
} from "../services/firebase";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const googleLogin = async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");
    }
  };

  return (

    <div className="container">

      <div className="contact-container">

        <div className="contact-box">

          <h1>Welcome Back</h1>

          <p>
            Login to access your
            insurance dashboard.
          </p>

          <button
            onClick={googleLogin}
            className="buy-btn"
          >
            Continue with Google
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;