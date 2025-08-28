🚀 Crypto Price Tracker

Track your favorite cryptos in real time with charts, dark mode, and a personal watchlist.

A sleek and responsive Crypto Price Tracker web app built with React + Vite + TailwindCSS, designed to make monitoring the crypto market both easy and fun. Powered by the CoinGecko API, it delivers live cryptocurrency data with a clean UI, smooth animations, and useful features.

✨ Features

🔍 Search & Browse – Explore top 50 cryptocurrencies with live data

📊 Interactive Charts – View 24h / 7d / 30d price history

⭐ Watchlist – Save favorite coins (persisted in localStorage)

🌙 Dark/Light Mode – Toggle themes with saved preferences

📱 Responsive Design – Works seamlessly on desktop and mobile

🎬 Smooth Animations – Powered by Framer Motion

⚡ Error & Loading States – Clean handling of API responses

🛠 Tech Stack

React + Vite → frontend framework

TailwindCSS → modern styling

Recharts / Chart.js → price history charts

Framer Motion → animations

CoinGecko API → real-time crypto data

## Running locally

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Build the client:

```bash
npm run build
```

2. Push to a Git repo and import the project in Vercel.

Vercel will:

- Install dependencies
- Run `npm run build` (outputs to `dist/public`)
- Serve API at `/api` using `api/index.ts`
- Serve static site from `dist/public`

Configure any environment variables in Vercel Project Settings.
