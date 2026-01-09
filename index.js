const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    name: "MemeCoin Radar API",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
