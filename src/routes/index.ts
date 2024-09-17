import { Router } from "express";
import { getAvgPrice } from "../services/prices";
import { updateKrakenPrice } from "../services/kraken";

const router = Router();

router.get("/getPrice", (req, res) => {
  updateKrakenPrice();
  res.status(200).json({
    price: getAvgPrice(),
  });
});

export default router;
