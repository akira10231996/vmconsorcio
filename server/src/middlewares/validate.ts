import { Response, Request, NextFunction } from "express";
import { validateOrReject, ValidationError } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";

type In = "params" | "body" | "query";

const validate =
  (where: In, scheme: ClassConstructor<object>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("user", req.body);
    try {
      await validateOrReject(plainToClass(scheme, req[where]), {
        forbidUnknownValues: true,
        validationError: {
          target: false,
        },
        stopAtFirstError: true,
      });
      next();
    } catch (errors) {
      res.status(400).send({
        errors: formatErrors(errors),
      });
    }
  };

const formatErrors = (errors: ValidationError[]) =>
  Object.assign(
    {},
    ...errors.map((e: any) => ({
      [e.property]: Object.values(e.constraints)[0],
    }))
  );

export default validate;
