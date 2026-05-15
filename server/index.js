require("dotenv").config();

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const quoteRoutes =
require("./routes/quoteRoutes");

const aiPlansRoutes =
require("./routes/aiPlansRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use(
  "/api/contact", 
  contactRoutes);

app.use(
  "/api/quote",
  quoteRoutes
);

app.use(
  "/api/ai-plans",
  aiPlansRoutes
);

app.get("/", (req, res) => {
  res.send("Insurance AI Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});