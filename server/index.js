const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();

/* =========================================
   EXPRESS APP
========================================= */

const app =
  express();

/* =========================================
   MIDDLEWARES
========================================= */

app.use(cors());

app.use(express.json());

/* =========================================
   ROUTES
========================================= */

const aiPlansRoutes =
  require(
    "./routes/aiPlansRoutes"
  );

const aiRoutes =
  require(
    "./routes/aiRoutes"
  );

const contactRoutes =
  require(
    "./routes/contactRoutes"
  );

const policyRoutes =
  require(
    "./routes/policyRoutes"
  );

/* =========================================
   API ROUTES
========================================= */

app.use(
  "/api/aiplans",
  aiPlansRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/policy",
  policyRoutes
);

/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "PolicyPilot AI Server Running 🚀"
  });
});

/* =========================================
   PORT
========================================= */

const PORT =
  process.env.PORT || 5000;

/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});