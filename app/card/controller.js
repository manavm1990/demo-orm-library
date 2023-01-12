import Card from "./model.js";
import Reader from "../reader/model.js";

export default {
  getCard(id) {
    return Card.findByPk(id, { include: [Reader] });
  },
};
