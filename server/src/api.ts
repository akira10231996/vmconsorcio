import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IsEmail, Length, IsDefined } from "class-validator";
import * as nano from "nanoid";
import validate from "./middlewares/validate";
import { Admin } from "./entity/Admin";
import { AppDataSource } from "./data-source";
import { UserError } from "./middlewares/error-handler";
import { Configs } from "./entity/Configs";
import { Administrator } from "./entity/Administrator";
import { ClienteComprando } from "./entity/ClienteComprando";
import { convertQStoObject } from "./utils";
import reqAuth from "./middlewares/req-auth";
import { DisplayedConfigs } from "./entity/DisplayedConfigs";
import { SaleFormRegistration } from "./entity/SaleFormRegistration";
import { GeneratedForms } from "./entity/GeneratedForms";

export const api = Router();
const nanoid = nano.customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4);
class AdminLoginSchema {
  @IsDefined()
  @IsEmail()
  @Length(5, 100)
  email: string;

  @IsDefined()
  password: string;
}

export interface JWTClaims {
  email: string;
}
export const JWT_SECRET = "greedisgood";

async function adminLogin(req, res) {
  const { email, password } = req.body as AdminLoginSchema;
  const admin = await AppDataSource.getRepository(Admin)
    .createQueryBuilder("admin")
    .addSelect("admin.password")
    .where("admin.email = :email", { email })
    .getOne();
  if (!admin) {
    throw new UserError("User with this email address not found");
  }

  const response = await bcrypt.compare(password, admin.password);
  if (response !== true) {
    throw new UserError("passwords do not match");
  }

  function generateToken(admin: Admin) {
    const data: JWTClaims = {
      email: admin.email.toString(),
    };
    const signature = JWT_SECRET;
    const expiration = "1000h";

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  }

  let token = generateToken(admin);

  delete admin.password;

  res.json({
    admin,
    token,
  });
}

api.post("/admin/login", validate("body", AdminLoginSchema), adminLogin);

api.get("/admin/get-configs", async (req, res) => {
  let c = await AppDataSource.getRepository(Configs).findOne({
    where: { id: 1 },
  });
  let q = await AppDataSource.getRepository(DisplayedConfigs).find();
  res.send({ c, q });
});
api.get("/admin/token", reqAuth, async (req, res) => {
  try{

    const token = req.headers.authorization.split(" ")[1];
    const email = jwt.verify(token, JWT_SECRET).data.email;
    const admin = await AppDataSource.getRepository(Admin).findOne({
      where: { email },
    });
    res.send({ firstname: admin.firstName, lastname: admin.lastName });
  }catch(error) {
    res.status(401).send(error);
  }
});
api.post("/admin/update-configs", reqAuth, async (req, res) => {
  if (req.body.displayed !== undefined) {
    await AppDataSource.createQueryBuilder()
      .update(DisplayedConfigs)
      .set({ display: req.body.displayed })
      .where("config = :config", { config: Object.keys(req.body)[0] })
      .execute();
    delete req.body.displayed;
  }
  await AppDataSource.createQueryBuilder()
    .update(Configs)
    .set(req.body)
    .where("id = :id", { id: 1 })
    .execute();
  res.send({ ok: true });
});
api.post("/admin/sales", async (req, res) => {
  await AppDataSource.createQueryBuilder()
    .insert()
    .into(GeneratedForms)
    .values({
      timestamp: new Date().toISOString(),
      readed: false,
    })
    .execute();
  await AppDataSource.createQueryBuilder()
    .insert()
    .into(SaleFormRegistration)
    .values(req.body)
    .execute();
  res.send({ ok: true });
});

api.get("/admin/generated-forms", async (req, res) => {
  let r = await AppDataSource.getRepository(GeneratedForms).find();
  res.send(r);
});

api.post("/admin/administrators", reqAuth, async (req, res) => {
  if (!req.body.id) {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Administrator)
      .values(req.body)
      .execute();
  } else {
    await AppDataSource.createQueryBuilder()
      .update(Administrator)
      .set(req.body)
      .where("id = :id", { id: req.body.id })
      .execute();
  }

  res.send({ ok: true });
});

api.get("/admin/administrators", async (req, res) => {
  let r = await AppDataSource.getRepository(Administrator).find({
    order: { id: "DESC" },
    where: convertQStoObject(req.query),
  });
  res.send(r);
});

api.delete("/admin/administrators/:id", reqAuth, async (req, res) => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Administrator)
    .where("id = :id", { id: req.params.id })
    .execute();
  res.send({ ok: true });
});

api.post("/admin/cliente-comprando", reqAuth, async (req, res) => {
  if (!req.body.id) {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(ClienteComprando)
      .values({ ...req.body, cod: "C-" + nanoid() })
      .execute();
  } else {
    await AppDataSource.createQueryBuilder()
      .update(Administrator)
      .set(req.body)
      .where("id = :id", { id: req.body.id })
      .execute();
  }

  res.send({ ok: true });
});

api.get("/admin/cliente-comprando", reqAuth, async (req, res) => {
  const { nome, email, cod } = req.query;
  let r = await AppDataSource.getRepository(ClienteComprando).find({
    order: { id: "DESC" },
  });
  res.send(r);
});

api.delete("/admin/cliente-comprando/:id", reqAuth, async (req, res) => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Administrator)
    .where("id = :id", { id: req.params.id })
    .execute();
  res.send({ ok: true });
});
