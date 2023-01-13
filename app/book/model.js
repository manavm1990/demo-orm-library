import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import Reader from "../reader/model.js";

const Book = sequelize.define(
  // Avoid seeing capital letters in table names and response objects
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

    // Add a foreign key to the reader table
    readerId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
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
