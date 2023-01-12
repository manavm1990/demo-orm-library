import { Router } from "express";
import ReaderController from "./controller.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const reader = await ReaderController.show(req.params.id).catch((err) => {
    res.status(500).json({ message: err.message });
  });

  if (reader) {
    res.json(reader);
  } else {
    res.status(404).json({ message: "Reader not found" });
  }
});

router.post("/", async (req, res) => {
  const reader = await ReaderController.create(req.body).catch((err) => {
    if (err.message.search(/Validation/i) || err.message.search(/Null/i)) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  });

  res.status(201).json(reader);
});

router.delete("/:id", async (req, res) => {
  const reader = await ReaderController.delete(req.params.id).catch((err) => {
    res.status(500).json({ message: err.message });
  });

  if (reader) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Reader not found" });
  }
});

export default router;
