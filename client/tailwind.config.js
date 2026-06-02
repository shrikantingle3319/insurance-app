/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        primary: "#2563eb",

        secondary: "#38bdf8",

        dark: "#0f172a",

        glass: "rgba(255,255,255,0.08)"
      },

      boxShadow: {

        glow:
          "0 0 20px rgba(56,189,248,0.35)",

        card:
          "0 10px 40px rgba(0,0,0,0.25)"
      },

      backdropBlur: {

        xs: "2px"
      },

      borderRadius: {

        xl2: "1.25rem",

        xl3: "1.75rem"
      },

      animation: {

        pulseGlow:
          "pulseGlow 2s infinite",

        fadeIn:
          "fadeIn 0.5s ease-in-out"
      },

      keyframes: {

        pulseGlow: {

          "0%,100%": {

            boxShadow:
              "0 0 0 rgba(56,189,248,0.2)"
          },

          "50%": {

            boxShadow:
              "0 0 20px rgba(56,189,248,0.4)"
          }
        },

        fadeIn: {

          "0%": {

            opacity: "0",

            transform:
              "translateY(10px)"
          },

          "100%": {

            opacity: "1",

            transform:
              "translateY(0)"
          }
        }
      }
    }
  },

  plugins: [],
};