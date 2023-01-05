import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";
import { Administrator } from "./entity/Administrator";
import { ClienteComprando } from "./entity/ClienteComprando";
import { ClienteVendendo } from "./entity/ClienteVendendo";
import { Configs } from "./entity/Configs";
import { DisplayedConfigs } from "./entity/DisplayedConfigs";
import { GeneratedForms } from "./entity/GeneratedForms";
import { SaleFormRegistration } from "./entity/SaleFormRegistration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "qufqjrtjrj",
  database: "Database2",
  synchronize: true,
  logging: false,
  entities: [
    Admin,
    Configs,
    Administrator,
    ClienteVendendo,
    ClienteComprando,
    DisplayedConfigs,
    SaleFormRegistration,
    GeneratedForms,
  ],
  migrations: [],
  subscribers: [],
});
