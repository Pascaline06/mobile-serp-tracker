import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

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
    message: "Premium endpoint working",
  });
});

export default app;
