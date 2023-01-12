import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import Reader from "../reader/model.js";

const Book = sequelize.define(
  "book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    edition: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    isPaperback: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    readerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Reader,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
  }
);

export default Book;
