import prisma from "@/lib/prisma"
import { withUserId } from "@/lib/query-handler";

export const getCurrentUserProductById = withUserId(
    async (userId: number, id: number) => {    
        return prisma.product.findUnique({
            where: {
                id,
                userId
            },
        })
    }, "商品取得エラー"
)
