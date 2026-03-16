import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../../config/env.config.js";
import { APP_NAME, DEVELOPER_NAME } from "../../constants/app.constants.js";
import {
  JWT_ALGORITHM,
  TOKEN_TYPE,
} from "../../constants/security.constants.js";
import ApiError from "../http/api.error.js";

const generateToken = (user, type) => {
  return jwt.sign(
    {
      id: user.id,
    },
    type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn:
        type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY,
      issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
      audience: `${APP_NAME} - Users`,
      jwtid: crypto.randomUUID(),
    }
  );
};

const verifyToken = (token, type) => {
  try {
    return jwt.verify(
      token,
      type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
      {
        algorithms: [JWT_ALGORITHM],
        issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
        audience: `${APP_NAME} - Users`,
      }
    );
  } catch (error) {
    throw error.name === "TokenExpiredError"
      ? ApiError.unauthorized("Token has expired", error)
      : ApiError.unauthorized("Invalid token", error);
  }
};

const generateTokens = (user) => {
  return {
    accessToken: generateToken(user, TOKEN_TYPE.ACCESS),
    refreshToken: generateToken(user, TOKEN_TYPE.REFRESH),
  };
};

export { generateToken, verifyToken, generateTokens };
