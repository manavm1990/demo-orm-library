// This is the only place from which we will access environment variables.
import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  saltRounds: Number(process.env.SALT_ROUNDS),
};
