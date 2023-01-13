import { Router } from "express";
import CardController from "./controller.js";

const router = Router();

router.get("/:di", async (req, res) => {
  const card = await CardController.getCard(req.params.id).catch((err) => {
    res.status(500).send({ message: err.message });
  });

  if (card) {
    res.send(card);
  } else {
    res.status(404).send({ message: "Card not found" });
  }
});

export default router;
