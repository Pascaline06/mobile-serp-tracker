import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

app.get('/api/serp', async (c) => {
  // your API logic
});

export default app;
