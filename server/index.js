const express =
  require("express");

const cors =
  require("cors");

require("dotenv")
.config();

const app =
  express();

app.use(cors());

app.use(express.json());

/* ROUTES */

const quoteRoutes =
  require(
    "./routes/quoteRoutes"
  );

const aiRoutes =
  require(
    "./routes/aiRoutes"
  );

const aiPlansRoutes =
  require(
    "./routes/aiPlansRoutes"
  );

const contactRoutes =
  require(
    "./routes/contactRoutes"
  );

const policyRoutes =
  require(
    "./routes/policyRoutes"
  );

/* API ROUTES */

app.use(
  "/api/quote",
  quoteRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/ai-plans",
  aiPlansRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/policy",
  policyRoutes
);

/* SERVER */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`
  );
});