import { z } from "zod"
import { ProductOptionalDefaultsSchema } from "../../../../prisma/generated/zod/modelSchema/ProductSchema"

export const productCreateFormValuesSchema = ProductOptionalDefaultsSchema.pick ({
    title: true,
    description: true,
    stock: true,
}).extend({
    price: z.coerce.number().min(1),
    stock: z.coerce.number().min(0),
    image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "画像を選択してください",
    }).optional(),
})
