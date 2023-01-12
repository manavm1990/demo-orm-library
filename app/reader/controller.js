import Book from "../book/model.js";
import Card from "../card/model.js";
import Reader from "./model.js";

export default {
  create(payload) {
    return Reader.create(payload);
  },

  show(id) {
    return Reader.findByPk(id, {
      include: [Card, Book],
    });
  },

  delete(id) {
    return Reader.destroy({ where: { id } });
  },
};
