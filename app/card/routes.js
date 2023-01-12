import { Router } from "express";
import CardController from "./controller.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const card = await CardController.getCard(req.params.id).catch((err) => {
    res.status(500).json({ message: err.message });
  });

  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

export default router;
