import WebSocket from "ws";
import { updatePrice } from "./prices";

const KRAKEN_WS_URL =
  "https://api.kraken.com/0/public/Depth?pair=BTCUSDT&count=1";
const exchange = "kraken";

export const updateKrakenPrice = async () => {
  fetch(KRAKEN_WS_URL)
    .then((response) => response.json())
    .then((data) => {
      const bestBid = parseFloat(data.result.XBTUSDT.bids[0][0]);
      const bestAsk = parseFloat(data.result.XBTUSDT.asks[0][0]);
      updatePrice(exchange, (bestBid + bestAsk) / 2);
    });
};
