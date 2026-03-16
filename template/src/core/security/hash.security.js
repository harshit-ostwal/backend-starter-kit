import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../../constants/security.constants.js";

const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(value, salt);
};

const compareHash = async (value, hash) => {
  return await bcrypt.compare(value, hash);
};

export { hashValue, compareHash };
