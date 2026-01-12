import express from "express";
import { prisma } from "./src/prisma.js";
import { updateTokensAndAlerts } from "./src/jobs.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "memecoinradar-api", ts: new Date().toISOString() });
});

app.get("/api/tokens", async (req, res) => {
  const limit = Number(req.query.limit || 50);
  const tokens = await prisma.token.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
  res.json({ ok: true, tokens });
});


app.get("/api/alerts", async (req, res) => {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { token: true },
  });
  res.json({ ok: true, alerts });
});

// job simples (loop)
setInterval(() => {
  updateTokensAndAlerts().catch(err =>
    console.error("JOB ERROR:", err.message)
  );
}, 60 * 1000); // 1 min

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`MemecoinRadar API listening on ${port}`);
});
