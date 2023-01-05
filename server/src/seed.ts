import { AppDataSource } from "./data-source";
import { Admin } from "./entity/Admin";
import { Administrator } from "./entity/Administrator";
import { Configs } from "./entity/Configs";
import { DisplayedConfigs } from "./entity/DisplayedConfigs";
import { hashPassword } from "./utils";

AppDataSource.initialize()
  .then(async () => {
    console.log("DB ready");

    // create admin user
    AppDataSource.createQueryBuilder()
      .insert()
      .into(Admin)
      .values({
        email: "admin@admin.com",
        firstName: "Timber",
        lastName: "Saw",
        password: await hashPassword("123456"),
      })
      .execute();

    // website configs

    AppDataSource.createQueryBuilder()
      .insert()
      .into(Configs)
      .values({
        email: "someone@admin.com",
        tel1: "(O11) 2291-3440",
        tel2: "(O11) 9710-1466",
        whatsapp: "(O11) 9710-1466",
        cnpj: "00.000.000/0000-00",
        form: "Form A",
        address: "Rua dos Bobos, 0",
        officeHours: "Segunda a Sexta das 8h às 18h",
      })
      .execute();
    AppDataSource.createQueryBuilder()
      .insert()
      .into(DisplayedConfigs)
      .values([
        {
          config: "email",
          display: true,
        },
        {
          config: "tel1",
          display: true,
        },
        {
          config: "tel2",
          display: true,
        },
        {
          config: "whatsapp",
          display: true,
        },
        {
          config: "officeHours",
          display: true,
        },
        {
          config: "address",
          display: true,
        },
        {
          config: "cnpj",
          display: false,
        },
      ])
      .execute();
    console.log("seed completed");
  })
  .catch((error) => console.log(error));
