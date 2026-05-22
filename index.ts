import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = new Hono();

const PROXIES_API_KEY = process.env.PROXIES_API_KEY || '';


app.get('/', (c) => {
  return c.json({
    status: '✅ Online',
    version: '1.0',
    usage: '/api/serp?q=pizza&country=US'
  });
});

app.get('/api/serp', async (c) => {
  try {
    const query = c.req.query('q');
    const country = c.req.query('country') || 'US';

    if (!query) {
      return c.json({ error: 'Missing query' }, 400);
    }

    if (!PROXIES_API_KEY) {
      return c.json({ error: 'API key not set' }, 500);
    }

    console.log(`🔍 Searching: "${query}"`);

    return c.json({
      success: true,
      query,
      country,
      type: "free endpoint"
    });

  } catch (error: any) {
    return c.json({
      error: error.message || 'Unknown error'
    }, 500);
  }
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

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
});

console.log("🚀 Server running");
