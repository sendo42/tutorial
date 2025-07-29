"use server";

import { authedClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { productCreateFormValuesSchema, productUpdateFormValuesSchema } from "../schemas";
import { uploadImageToS3 } from "@/lib/s3";
import { Prisma } from "@prisma/client";

export const updateProduct = authedClient
    .schema(productUpdateFormValuesSchema)
    .action(async ({ parsedInput: { id, title, description, price, stock, image },
            ctx: { userId },
        }) => {
        try {
            const product = await prisma.product.findUnique({
                where: { id, userId },
            })
            if (product == null) {
                return {
                    success: false,
                    message: "Product not found",
                }
            }
            let data: Prisma.ProductUpdateInput = {
                title,
                description,
                price,
                stock,
            }
            if (image != null) {
                const imageUrl = await uploadImageToS3(image, "products");
                data.imageUrl = imageUrl;
            }
            await prisma.product.update({
                where: { id },
                data,
            })
            return {
                success: true,
                message: "Product update successfully",
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: "Failed to update product",
            }
        }
});