import React from "react";

import {

  Link,
  useLocation

} from "react-router-dom";

/* =========================================
   NAVBAR
========================================= */

const Navbar = () => {

  const location =
    useLocation();

  /* =====================================
     ACTIVE LINK
  ===================================== */

  const isActive =
    (path) => {

      return location.pathname === path;
    };

  return (

    <nav className="bg-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* =================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">

            AI

          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-800">

              PolicyPilot

            </h1>

            <p className="text-sm text-gray-500">

              AI Insurance Intelligence

            </p>

          </div>

        </Link>

        {/* =================================
            NAV LINKS
        ================================= */}

        <div className="hidden md:flex items-center gap-8">

          {/* =============================
              HOME
          ============================= */}

          <Link

            to="/"

            className={`

              transition-all font-medium

              ${isActive("/")

                ? "text-blue-600"

                : "text-gray-700 hover:text-blue-600"
              }

            `}
          >

            Home

          </Link>

          {/* =============================
              QUOTE
          ============================= */}

          <Link

            to="/quote"

            className={`

              transition-all font-medium

              ${isActive("/quote")

                ? "text-blue-600"

                : "text-gray-700 hover:text-blue-600"
              }

            `}
          >

            AI Underwriting

          </Link>

          {/* =============================
              PLANS
          ============================= */}

          <Link

            to="/plans"

            className={`

              transition-all font-medium

              ${isActive("/plans")

                ? "text-blue-600"

                : "text-gray-700 hover:text-blue-600"
              }

            `}
          >

            Insurance Plans

          </Link>

          {/* =============================
              DASHBOARD
          ============================= */}

          <Link

            to="/dashboard"

            className={`

              transition-all font-medium

              ${isActive("/dashboard")

                ? "text-blue-600"

                : "text-gray-700 hover:text-blue-600"
              }

            `}
          >

            Dashboard

          </Link>

          {/* =============================
              CONTACT
          ============================= */}

          <Link

            to="/contact"

            className={`

              transition-all font-medium

              ${isActive("/contact")

                ? "text-blue-600"

                : "text-gray-700 hover:text-blue-600"
              }

            `}
          >

            Contact

          </Link>

        </div>

        {/* =================================
            AI STATUS BADGE
        ================================= */}

        <div className="hidden lg:flex items-center gap-3">

          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse">

          </div>

          <span className="text-sm font-medium text-gray-700">

            AI Workflow Active

          </span>

        </div>

        {/* =================================
            MOBILE MENU BUTTON
        ================================= */}

        <button className="md:hidden bg-gray-100 p-2 rounded-lg">

          <svg

            xmlns="http://www.w3.org/2000/svg"

            className="h-6 w-6"

            fill="none"

            viewBox="0 0 24 24"

            stroke="currentColor"

          >

            <path

              strokeLinecap="round"

              strokeLinejoin="round"

              strokeWidth={2}

              d="M4 6h16M4 12h16M4 18h16"

            />

          </svg>

        </button>

      </div>

      {/* =================================
          WORKFLOW BAR
      ================================= */}

      {

        location.pathname === "/quote" && (

          <div className="bg-blue-600 text-white px-6 py-3">

            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">

              <div className="flex items-center gap-4">

                <span>

                  Vehicle Validation

                </span>

                <span>

                  →

                </span>

                <span>

                  Fraud Analysis

                </span>

                <span>

                  →

                </span>

                <span>

                  AI Quote Generation

                </span>

              </div>

              <div className="font-medium">

                Intelligent Underwriting Workflow

              </div>

            </div>

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;