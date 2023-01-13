import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import bcrypt from "bcrypt";
import config from "../config.js";

function sanitizeUser(user) {
  user.email = user.email.toLowerCase();
  user.password = bcrypt.hashSync(user.password, config.saltRounds);
}

const Reader = sequelize.define(
  "reader",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        msg: "Please enter a valid email address",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
        msg: "Password must be between 8 and 32 characters",
      },
    },
  },
  {}
);

Reader.beforeCreate(sanitizeUser);

export default Reader;
