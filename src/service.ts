import { Hono } from 'hono';
import axios from 'axios';
import { paymentMiddleware } from "@x402/hono";

const app = new Hono();

app.use(
  "/api/premium-serp",
  paymentMiddleware({
    "GET /api/premium-serp": {
      price: "$0.01",
      network: "base-sepolia",
      config: {
        description: "Premium mobile SERP tracking endpoint",
        payTo: process.env.WALLET_ADDRESS!,
      },
    },
  })
);

app.get('/api/serp', async (c) => {
  return c.json({
    success: true,
    message: "Free mobile SERP endpoint",
  });
});

app.get("/api/premium-serp", async (c) => {
  const query = c.req.query("q");

  return c.json({
    success: true,
    premium: true,
    query,
    message: "x402 protected premium endpoint",
  });
});

export default app;
