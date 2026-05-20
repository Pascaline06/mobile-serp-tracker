import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

// Environment variable (important for Railway)
const SERPAPI_KEY = process.env.SERPAPI_KEY;

if (!SERPAPI_KEY) {
  console.error("❌ Missing SERPAPI_KEY environment variable");
}

// Root route
app.get('/', (c) => {
  return c.text(
    "Mobile SERP Tracker API\nUsage: /api/serp?q=pizza&country=US"
  );
});

// Health check route (useful for Railway)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// SERP API endpoint
app.get('/api/serp', async (c) => {
  try {
    const query = c.req.query('q');
    const country = c.req.query('country') || 'us';

    if (!query) {
      return c.json({ error: 'Missing query parameter "q"' }, 400);
    }

    if (!SERPAPI_KEY) {
      return c.json({ error: 'Server misconfigured: missing API key' }, 500);
    }

    console.log('🔍 Searching:', query);

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        q: query,
        gl: country.toLowerCase(),
        device: 'mobile',
        api_key: SERPAPI_KEY,
      },
      timeout: 30000,
    });

    const data = response.data;

    const results = (data.organic_results || []).map((result: any) => ({
      title: result.title,
      url: result.link,
      snippet: result.snippet || '',
      position: result.position,
    }));

    console.log(`✅ Found ${results.length} results`);

    return c.json({
      query,
      country: country.toUpperCase(),
      source: 'Google Mobile (via SerpAPI)',
      timestamp: new Date().toISOString(),
      results,
    });

  } catch (error: any) {
    console.error('❌ Error:', error.message);

    return c.json(
      {
        error: error.message,
        details: error.response?.data || 'No additional details',
      },
      500
    );
  }
});

// IMPORTANT: Railway uses dynamic PORT
const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Server running on port ${port}`);
