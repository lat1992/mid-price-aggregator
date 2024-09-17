# Mid-Price Aggregator

This project is a cryptocurrency mid-price aggregator that collects real-time price data from multiple exchanges (Binance, Huobi, and Kraken) and calculates the average mid-price for BTC/USDT.

## Features

- Real-time price data collection from Binance and Huobi via WebSocket connections
- Periodic price updates from Kraken via REST API
- Calculation of average mid-price across all connected exchanges
- Express.js API endpoint to retrieve the current average price

## Prerequisites

- Node.js (v20 or later recommended)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/lat1992/mid-price-aggregator.git
   cd mid-price-aggregator
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the server:

```
npm run serve
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

- `GET /api/getPrice`: Returns the current average mid-price across all exchanges.

Response example: `{"price":60787.05}`

## Development

- `npm run build`: Compiles TypeScript files to JavaScript
- `npm test`: Runs the test suite (tests not included in the provided code)

## Project Structure

- `src/app.ts`: Main application setup
- `src/index.ts`: Server entry point
- `src/routes/index.ts`: API routes
- `src/services/`:
  - `binance.ts`: Binance WebSocket connection and price updates
  - `huobi.ts`: Huobi WebSocket connection and price updates
  - `kraken.ts`: Kraken REST API price updates
  - `prices.ts`: Price management and calculation logic
