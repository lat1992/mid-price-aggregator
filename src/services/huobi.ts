import zlib from "node:zlib";
import WebSocket from "ws";
import { updatePrice } from "./prices";

const BINANCE_WS_URL = "wss://api.huobi.pro/ws";
const exchange = "huobi";

export const startHuobiWebSocket = async () => {
  const ws = new WebSocket(BINANCE_WS_URL);

  ws.onopen = () => {
    const subscribeMessage = JSON.stringify({
      sub: "market.btcusdt.bbo",
      id: "2",
    });
    ws.send(subscribeMessage);
    console.info(exchange + " ws connected");
  };

  ws.onclose = () => {
    console.warn(exchange + " ws closed");
  };

  ws.onmessage = (msg: any) => {
    zlib.gunzip(msg.data, (err, decompressed) => {
      if (err) {
        console.error("error when decompressing data:", err);
        return;
      }
      const json = JSON.parse(decompressed.toString());
      if (json.id === "2" && json.status === "ok") {
        console.log("successfully subscribed to streams");
        return;
      }
      if (json.ping !== undefined) {
        ws.send(
          JSON.stringify({
            pong: json.ping,
          }),
        );
        return;
      }
      const bestBid = parseFloat(json.tick.bid);
      const bestAsk = parseFloat(json.tick.ask);
      updatePrice(exchange, (bestBid + bestAsk) / 2);
    });
  };

  ws.on("error", (err: any) => console.error(err));
};
