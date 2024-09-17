import express, { Application } from "express";
import routes from "./routes";
import { startBinanceWebSocket } from "./services/binance";
import { updateKrakenPrice } from "./services/kraken";
import { startHuobiWebSocket } from "./services/huobi";

startBinanceWebSocket();
startHuobiWebSocket();
// if needed, add a setTimeout() with updateKrakenPrice(), to update kraken price every x ms.

const app: Application = express();

// Routes
app.use("/api", routes);

export default app;
