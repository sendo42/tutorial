import prisma from "@/lib/prisma"
import { withUserId } from "@/lib/query-handler";

export const getCurrentUserProductWithUserById = withUserId (
    async (userId:number, id: number) => {
    
        return prisma.product.findUnique({
            where: {
                id,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true
                    }
                }
            }
        })


}, "商品取得エラー")