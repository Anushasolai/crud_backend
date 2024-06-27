// import { DataSource } from "typeorm";
// import { UserTable } from "./entities/user";
// require("dotenv").config();

// export const AppSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "cdadmin@55",
//   database: "Curdoperation",
//   synchronize: false,
//   logging: true,
//   entities: [UserTable],
//   migrations: ["src/migrations/**/*.ts"],
// });

// export const checkConnection = async () => {
//   try {
//     await AppSource.initialize();
//     console.log("SuccessFully Connected DB ");
//   } catch (error) {
//     console.log("Cannot Connect to DB", error);
//   }
// };
import { DataSource } from "typeorm";
import { UserTable } from "./entities/user";
require("dotenv").config();

export const AppSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOSTNAME || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "cdadmin@55",
  database: process.env.DATABASE_NAME || "Curdoperation",
  synchronize: false,
  logging: true,
  entities: [UserTable],
  migrations: ["src/migrations/**/*.ts"],
});

export const checkConnection = async () => {
  try {
    await AppSource.initialize();
    console.log("Successfully Connected to DB");
  } catch (error) {
    console.log("Cannot Connect to DB", error);
  }
};
