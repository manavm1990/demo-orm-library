import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import config from "../config.js";
import sequelize from "../conn.js";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(config.saltRounds);
  return bcrypt.hash(password, salt);
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
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {}
);

// Hash password before saving to DB
Reader.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

Reader.beforeUpdate(async (user) => {
  user.password = await hashPassword(user.password);
});

export default Reader;
