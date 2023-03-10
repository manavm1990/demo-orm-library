import Reader from "../reader/model.js";
import Card from "./model.js";

export default {
  getCard(id) {
    return Card.findByPk(id, { include: [Reader] });
  },
};
