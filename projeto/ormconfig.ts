import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  migrations: ["./src/database/migrations/**.ts"],
});

export default AppDataSource;
