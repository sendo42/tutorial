import { z } from "zod";

export const pathParamIdSchema = z
    .string()
    .refine((val) => !isNaN(parseInt(val)), {message: "形式が異なります"})
    .transform((val) => parseInt(val))