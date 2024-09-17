import WebSocket from "ws";
import { updatePrice } from "./prices";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";
const exchange = "binance";

export const startBinanceWebSocket = async () => {
  const ws = new WebSocket(BINANCE_WS_URL);

  ws.onopen = () => {
    const subscribeMessage = JSON.stringify({
      method: "SUBSCRIBE",
      params: ["btcusdt@depth5"],
      id: 1,
    });
    ws.send(subscribeMessage);
    console.info(exchange + " ws connected");
  };

  ws.onclose = () => {
    console.warn(exchange + " ws closed");
  };

  ws.onmessage = (msg: any) => {
    const json = JSON.parse(msg.data);
    if (json.id === 1 && json.result === null) {
      console.log("successfully subscribed to streams");
      return;
    }
    const bestBid = parseFloat(json.bids[0][0]);
    const bestAsk = parseFloat(json.asks[0][0]);
    updatePrice(exchange, (bestBid + bestAsk) / 2);
  };

  ws.on("ping", () => {
    ws.pong();
  });

  ws.on("error", (err: any) => console.error(err));
};
