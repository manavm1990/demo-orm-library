import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import Reader from "../reader/model.js";

const Card = sequelize.define(
  "card",
  {
    cardNumber: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    readerId: {
      type: DataTypes.INTEGER,
      references: { model: Reader, key: "id" },
    },
  },
  { sequelize, timestamps: false, underscored: true }
);

export default Card;
