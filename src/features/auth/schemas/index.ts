import { z } from "zod"
import { UserOptionalDefaultsSchema } from "../../../../prisma/generated/zod/modelSchema/UserSchema"

export const signupFormValuesSchema = UserOptionalDefaultsSchema.pick ({
    name: true,
    email: true,
    password: true,
}).extend({
    image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "画像を選択してください",
    }).optional(),
})

export const loginFormValuesSchema = UserOptionalDefaultsSchema.pick({
    email: true,
    password:true,
})