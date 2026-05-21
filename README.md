# mobile-serp-tracker
Mobile SERP Tracker API - Built on Android/Termux
Mobile search results API built entirely on Android phone using Termux.

## Features
- ✅ Mobile device simulation
- ✅ Proxy support
- ✅ Clean REST API
- ✅ Real Google mobile results via SerpAPI

## 🌐 Live Deployment

**Deployment URL:**  
https://mobile-serp-tracker.onrender.com/

**Health Check:**  
https://mobile-serp-tracker.onrender.com/health

**Example API Call:**  
https://mobile-serp-tracker.onrender.com/api/serp?q=pizza&country=US

---

## x402 Payment Support

This API includes x402-compatible USDC payment-gated endpoints.

Protected Endpoint:
`/api/premium-serp`

Network:
`Base Sepolia`

Payment Standard:
`x402`

## 📌 About This Service

This service provides mobile Google SERP tracking using Hono + SerpAPI. It supports country-based mobile search queries and returns structured organic search results through a public API endpoint.
## Setup
```bash
npm install
npx tsx index.ts
```

## Usage
```bash
curl "http://localhost:3000/api/serp?q=pizza&country=US"
```

## API Endpoints

**Search:**
**Health:**
## Tech Stack
- Hono (Node.js framework)
- TypeScript
- SerpAPI
- Axios

Built for Proxies.sx Marketplace Bounty ($50 Wave 2)
~/mobile-serp-tracker $
