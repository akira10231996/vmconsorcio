import express from "express";

export class UserError extends Error {
  name = "UserError";
}

export function isUserError(err: UserError) {
  return err instanceof UserError;
}

export default () =>
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("fkwklfewkl", err);
    if (err) {
      if (
        err.name === UserError.name ||
        // @ts-ignore
        (err.statusCode && err.statusCode === 400) // express itself throw such errors like in body-parser
      ) {
        res.status(400).send({ error: err.message });
      } else {
        // system error
        // if (process.env.IS_DEV) {
        //   return next(err);
        // }
        res
          .status(500)
          .send(
            "Oops, something went wrong! Our engineers have been alerted and will fix this asap."
          );
      }
      console.log(err);
    } else {
      next();
    }
  };
