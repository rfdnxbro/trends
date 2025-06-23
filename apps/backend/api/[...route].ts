import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel';

// Create Hono app instance
const app = new Hono().basePath('/api');

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:3000',
    'https://*.vercel.app',
    /^https:\/\/.*\.vercel\.app$/,
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/trends', (c) => {
  return c.json({
    trends: [
      { id: 1, title: 'Sample Trend 1', popularity: 85 },
      { id: 2, title: 'Sample Trend 2', popularity: 72 },
      { id: 3, title: 'Vercel Deployment', popularity: 95 },
    ],
  });
});

// Export Vercel handler
export default handle(app);