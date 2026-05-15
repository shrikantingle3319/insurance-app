import {
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Chatbot from "./components/Chatbot";

import Home from "./pages/Home";

import Contact from "./pages/Contact";

import Login from "./pages/Login";

import Quote from "./pages/Quote";

import Plans from "./pages/Plans";

import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <>

      <Navbar />

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
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/quote"
          element={<Quote />}
        />

        <Route
          path="/plans"
          element={<Plans />}
        />

      </Routes>

      <Chatbot />

    </>
  );
}

export default App;