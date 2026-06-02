import React from "react";

import {

  Link

} from "react-router-dom";

/* =========================================
   HOME PAGE
========================================= */

const Home = () => {

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ===============================
              LEFT CONTENT
          =============================== */}

          <div>

            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">

              AI-Powered Insurance Intelligence Platform

            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">

              Intelligent Vehicle Insurance Underwriting

            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">

              Validate vehicles, analyze fraud risks, verify ownership,
              and generate personalized insurance recommendations using
              AI-powered underwriting workflows.

            </p>

            {/* =============================
                CTA BUTTONS
            ============================= */}

            <div className="flex flex-wrap gap-5">

              <Link

                to="/quote"

                className="bg-white text-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all"

              >

                Start AI Underwriting

              </Link>

              <Link

                to="/plans"

                className="border border-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"

              >

                Explore Plans

              </Link>

            </div>

            {/* =============================
                AI STATUS
            ============================= */}

            <div className="flex items-center gap-3 mt-10">

              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse">

              </div>

              <p className="text-blue-100">

                AI Workflow Engine Active

              </p>

            </div>

          </div>

          {/* ===============================
              RIGHT CARD
          =============================== */}

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">

              Live Underwriting Workflow

            </h2>

            <div className="space-y-5">

              {/* =========================
                  STEP
              ========================= */}

              {

                [

                  "Vehicle Validation",

                  "Ownership Verification",

                  "Fraud Analysis",

                  "Risk Assessment",

                  "AI Quote Generation",

                  "Insurance Recommendations"

                ].map(

                  (step, index) => (

                    <div

                      key={index}

                      className="flex items-center gap-4"

                    >

                      <div className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold">

                        {index + 1}

                      </div>

                      <div className="flex-1">

                        <div className="bg-white/20 p-3 rounded-xl">

                          {step}

                        </div>

                      </div>

                    </div>
                  )
                )
              }

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          FEATURES SECTION
      ===================================== */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          {/* ===============================
              TITLE
          =============================== */}

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-gray-800 mb-5">

              Enterprise AI Insurance Architecture

            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">

              Built using AI agents, LangGraph orchestration, fraud intelligence,
              and stateful underwriting workflows.

            </p>

          </div>

          {/* ===============================
              FEATURE GRID
          =============================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                🤖

              </div>

              <h3 className="text-2xl font-bold mb-4">

                AI Validation Agent

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Intelligent vehicle validation with ownership verification,
                fraud detection, and contextual underwriting analysis.

              </p>

            </div>

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                🛡️

              </div>

              <h3 className="text-2xl font-bold mb-4">

                Fraud Intelligence

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Behavioral fraud tracking with validation history,
                suspicious activity detection, and AI risk scoring.

              </p>

            </div>

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                🔄

              </div>

              <h3 className="text-2xl font-bold mb-4">

                Workflow Orchestration

              </h3>

              <p className="text-gray-600 leading-relaxed">

                LangGraph-powered intelligent workflow routing with
                conditional execution and conversational underwriting.

              </p>

            </div>

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                📊

              </div>

              <h3 className="text-2xl font-bold mb-4">

                AI Risk Assessment

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Dynamic fraud probability scoring, confidence analysis,
                and intelligent underwriting recommendations.

              </p>

            </div>

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                🧠

              </div>

              <h3 className="text-2xl font-bold mb-4">

                Multi-Agent Architecture

              </h3>

              <p className="text-gray-600 leading-relaxed">

                AI agents collaborate for validation, underwriting,
                insurance recommendation, and fraud analysis workflows.

              </p>

            </div>

            {/* ===========================
                FEATURE CARD
            =========================== */}

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">

              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl mb-6">

                🚗

              </div>

              <h3 className="text-2xl font-bold mb-4">

                Personalized Policies

              </h3>

              <p className="text-gray-600 leading-relaxed">

                AI-generated insurance recommendations tailored
                according to vehicle profile and underwriting analysis.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          WORKFLOW SECTION
      ===================================== */}

      <section className="bg-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-gray-800 mb-5">

              Intelligent Underwriting Pipeline

            </h2>

            <p className="text-xl text-gray-600">

              AI-driven end-to-end insurance workflow orchestration.

            </p>

          </div>

          {/* ===============================
              PIPELINE
          =============================== */}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            {

              [

                "Vehicle Input",

                "AI Validation",

                "Fraud Analysis",

                "Quote Generation",

                "Insurance Plans"

              ].map(

                (step, index) => (

                  <div

                    key={index}

                    className="bg-gray-100 p-8 rounded-3xl text-center relative"

                  >

                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold">

                      {index + 1}

                    </div>

                    <h3 className="text-xl font-bold">

                      {step}

                    </h3>

                    {

                      index !== 4 && (

                        <div className="hidden md:block absolute top-1/2 -right-5 text-3xl text-blue-600">

                          →

                        </div>
                      )
                    }

                  </div>
                )
              )
            }

          </div>

        </div>

      </section>

      {/* =====================================
          CTA SECTION
      ===================================== */}

      <section className="bg-blue-700 text-white py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold mb-6">

            Experience AI-Powered Insurance Intelligence

          </h2>

          <p className="text-xl text-blue-100 mb-10 leading-relaxed">

            Start intelligent vehicle underwriting with validation,
            fraud detection, and personalized policy generation.

          </p>

          <Link

            to="/quote"

            className="inline-block bg-white text-blue-700 px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-100 transition-all"

          >

            Launch Underwriting Workflow

          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;