import z from "zod/v4";

const uuid7Schema = z.uuidv7("Invalid UUID format");

const userIdParamsSchema = z
  .object({
    userId: uuid7Schema,
  })
  .strict();

const idParamsSchema = z
  .object({
    id: uuid7Schema,
  })
  .strict();

export { userIdParamsSchema, idParamsSchema, uuid7Schema };
