import {

  Routes,
  Route

} from "react-router-dom";

import Navbar
from "./components/Navbar";

import Home
from "./pages/Home";

import Contact
from "./pages/Contact";

import Quote
from "./pages/Quote";

import Plans
from "./pages/Plans";

import PolicyDetails
from "./pages/PolicyDetails";

import Login
from "./pages/Login";

import BuyPolicy
from "./pages/BuyPolicy";

import Dashboard
from "./pages/Dashboard";

import Chatbot
from "./components/Chatbot";

import "./index.css";

function App() {

  return (

    <>
      <Navbar />

      <Chatbot />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/quote"
          element={<Quote />}
        />

        <Route
          path="/plans"
          element={<Plans />}
        />

        <Route
          path="/policy-details"
          element={
            <PolicyDetails />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/buy-policy"
          element={
            <BuyPolicy />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </>
  );
}

export default App;