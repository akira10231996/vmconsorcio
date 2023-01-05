import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  return hashedPassword;
};

export const convertQStoObject = (qs) => {
  if (!qs) return {};
  let filters = {};
  for (let query in qs) {
    if (typeof qs[query] === "string") {
      filters[query] = qs[query] ? qs[query] : undefined;
    }
  }
  return filters;
};
