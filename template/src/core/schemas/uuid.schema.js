import z from "zod/v4";

const uuid7Schema = z.uuidv7("Invalid UUID format");

const createUuidSchema = (name) => {
    return z.object({
        [name]: uuid7Schema,
    });
};

export { createUuidSchema, uuid7Schema };
