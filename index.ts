import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

const SERPAPI_KEY = '9ef797730a31a3467d0ce4d2c1968300b08d5b0b7655199512ea98ce03f5e224';

app.get('/', (c) => {
  return c.text("Mobile SERP Tracker API\nusage: '/api/serp?q=pizza&country=US'");
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/serp', async (c) => {
  try {
    const query = c.req.query('q');
    const country = c.req.query('country') || 'us';

    if (!query) {
      return c.json({ error: 'Missing query parameter "q"' }, 400);
    }

    console.log('🔍 Searching:', query);
    console.log('📱 Using SerpAPI...');

    const serpApiUrl = 'https://serpapi.com/search';

    const response = await axios.get(serpApiUrl, {
      params: {
        engine: 'google',
        q: query,
        gl: country.toLowerCase(), // Google country code (us, ng, uk, etc)
        device: 'mobile',
        api_key: SERPAPI_KEY
      },
      timeout: 30000
    });

    console.log('✅ Got results from SerpAPI');

    const data = response.data;
    const results = (data.organic_results || []).map((result: any) => ({
      title: result.title,
      url: result.link,
      snippet: result.snippet || '',
      position: result.position
    }));

    console.log('✅ Found', results.length, 'results');

    return c.json({
      query,
      country: country.toUpperCase(),
      source: 'Google Mobile (via SerpAPI)',
      timestamp: new Date().toISOString(),
      results
    });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return c.json({
      error: error.message,
      details: error.response?.data || 'No details'
    }, 500);
  }
});

const port = 3000;
console.log(`🚀 Server starting on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
~/mobile-serp-tracker $
