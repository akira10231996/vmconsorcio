import express from "express";
import { JWTClaims, JWT_SECRET } from "../api";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";

async function reqAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const header = req.get("Authorization");
    if (!header) throw new Error("Authorization header missing");
    const token = header.replace("Bearer ", "");
    const claims = await authenticate(token);
    if (!claims) throw new Error("claims are empty. token invalid");
    const admin = await AppDataSource.getRepository(Admin)
      .createQueryBuilder("admin")
      .addSelect("admin.password")
      .where("admin.email = :email", { email: claims.email })
      .getOne();
    if (!admin) throw new Error("user not found");
    res.locals.admin = admin;
    next();
  } catch (err) {
    res.status(401);
    res.send("You dont have access to this path");
    res.end();
  }
}

export function authenticate(token: string): Promise<JWTClaims> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) reject(err);
      // @ts-ignore
      if (decoded) return resolve(decoded.data as JWTClaims);
      reject("decoded data is empty");
    });
  });
}

export default reqAuth;
