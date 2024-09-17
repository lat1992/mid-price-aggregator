import express, { Application } from "express";
import routes from "./routes";
import { startBinanceWebSocket } from "./services/binance";
import { updateKrakenPrice } from "./services/kraken";
import { startHuobiWebSocket } from "./services/huobi";

startBinanceWebSocket();
startHuobiWebSocket();

setTimeout(updateKrakenPrice());

const app: Application = express();

// Routes
app.use("/api", routes);

export default app;
