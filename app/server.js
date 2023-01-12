import express from "express";
import cardRoutes from "./card/routes.js";
import readerRoutes from "./reader/routes.js";

const server = express();

const PORT = 3001;

// Middleware to parse incoming request bodies (e.g. POST - CREATE)
server.use(express.json());

server.use("/api/cards", cardRoutes);
server.use("/api/readers", readerRoutes);

server.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

export default function init() {
  server.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
}
