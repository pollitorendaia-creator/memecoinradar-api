import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "memecoinradar-api", ts: new Date().toISOString() });
});

// MVP endpoint (placeholder) to validate frontend <-> backend integration
app.get("/api/tokens", (req, res) => {
  res.json({
    ok: true,
    tokens: [
      {
        symbol: "PEPE",
        name: "Pepe",
        chain: "ETH",
        priceUsd: 0.00000123,
        change24hPct: 5.4,
      },
      {
        symbol: "WOJAK",
        name: "Wojak",
        chain: "SOL",
        priceUsd: 0.000045,
        change24hPct: -2.1,
      },
    ],
    ts: new Date().toISOString(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`MemecoinRadar API listening on ${port}`);
});
