import { ZodError, z } from "zod/v4";
import ApiError from "../http/api.error.js";
import { ValidationSource } from "../../constants/validation.constants.js";

const validate = (schema, source = ValidationSource.BODY) => {
  return async (req, _res, next) => {
    try {
      const result = await schema.safeParseAsync(req[source]);

      if (!result.success) {
        const flattenError = z.flattenError(result.error);

        return next(ApiError.validationError("Validation Error", flattenError));
      }

      req[source] = result.data;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const flattenError = z.flattenError(error);

        return next(ApiError.validationError("Validation Error", flattenError));
      }

      return next(ApiError.from(error));
    }
  };
};

export default validate;
