import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Route Handlers
import { POST as loginPost } from './src/app/api/auth/login/route.js';
import { GET as meGet } from './src/app/api/auth/me/route.js';
import { POST as userLoginPost } from './src/app/api/auth/user/login/route.js';
import { POST as userRegisterPost } from './src/app/api/auth/user/register/route.js';
import { GET as userMeGet } from './src/app/api/auth/user/me/route.js';
import { POST as userGoogleLoginPost } from './src/app/api/auth/user/google-login/route.js';
import { GET as userOrdersGet } from './src/app/api/auth/user/orders/route.js';
import { PUT as userUpdatePut } from './src/app/api/auth/user/update/route.js';
import { POST as newsletterPost, GET as newsletterGet } from './src/app/api/newsletter/route.js';
import { POST as ordersPost, GET as ordersGet } from './src/app/api/orders/route.js';
import { PUT as orderStatusPut } from './src/app/api/orders/[id]/status/route.js';
import { POST as createOrderPost } from './src/app/api/payments/create-order/route.js';
import { POST as verifyPaymentPost } from './src/app/api/payments/verify/route.js';
import { GET as productsGet, POST as productsPost } from './src/app/api/products/route.js';
import { GET as productDetailGet, PUT as productDetailPut, DELETE as productDetailDelete } from './src/app/api/products/[id]/route.js';

const app = express();

// Restore original URL path if rewritten by Vercel routing
app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl !== req.url) {
    req.url = req.originalUrl;
  }
  next();
});

app.use(cors());
app.use(express.json());

// Adapter to convert Web Request/Response route handlers to Express
const adapt = (handler) => {
  return async (req, res) => {
    try {
      const protocol = req.protocol;
      const host = req.get('host');
      const url = `${protocol}://${host}${req.originalUrl}`;
      
      const body = ['POST', 'PUT', 'PATCH'].includes(req.method) 
        ? JSON.stringify(req.body) 
        : undefined;

      const headers = new Headers();
      Object.entries(req.headers).forEach(([key, val]) => {
        if (val) {
          if (Array.isArray(val)) {
            val.forEach(v => headers.append(key, v));
          } else {
            headers.set(key, val);
          }
        }
      });

      // Construct standard Web Request
      const nextReq = new Request(url, {
        method: req.method,
        headers,
        body,
      });

      const params = req.params;
      const nextRes = await handler(nextReq, { params });

      const status = nextRes.status;
      const resHeaders = {};
      nextRes.headers.forEach((val, key) => {
        resHeaders[key] = val;
      });

      const contentType = resHeaders['content-type'] || '';
      if (contentType.includes('application/json')) {
        const data = await nextRes.json();
        res.status(status).set(resHeaders).json(data);
      } else {
        const text = await nextRes.text();
        res.status(status).set(resHeaders).send(text);
      }
    } catch (err) {
      console.error(`Error in ${req.method} ${req.originalUrl}:`, err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
};

// Mount API routes
app.post('/api/auth/login', adapt(loginPost));
app.get('/api/auth/me', adapt(meGet));
app.post('/api/auth/user/login', adapt(userLoginPost));
app.post('/api/auth/user/register', adapt(userRegisterPost));
app.get('/api/auth/user/me', adapt(userMeGet));
app.post('/api/auth/user/google-login', adapt(userGoogleLoginPost));
app.get('/api/auth/user/orders', adapt(userOrdersGet));
app.put('/api/auth/user/update', adapt(userUpdatePut));

app.post('/api/newsletter', adapt(newsletterPost));
app.get('/api/newsletter', adapt(newsletterGet));

app.post('/api/orders', adapt(ordersPost));
app.get('/api/orders', adapt(ordersGet));
app.put('/api/orders/:id/status', adapt(orderStatusPut));

app.post('/api/payments/create-order', adapt(createOrderPost));
app.post('/api/payments/verify', adapt(verifyPaymentPost));

app.get('/api/products', adapt(productsGet));
app.post('/api/products', adapt(productsPost));
app.get('/api/products/:id', adapt(productDetailGet));
app.put('/api/products/:id', adapt(productDetailPut));
app.delete('/api/products/:id', adapt(productDetailDelete));

// Serve Vite production build static assets if built
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🌿 Express API Server running on port ${PORT}`);
  });
}

export default app;
