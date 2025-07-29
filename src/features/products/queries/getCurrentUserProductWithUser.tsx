import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session";
import { ApplicationError } from "@/lib/error";

export const getCurrentUserProductWithUser = async (id: number) => {
    try {
        const { userId } = await getCurrentUser()
    
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
    } catch (err) {
        console.error(err)
        throw new ApplicationError("Failed to fetch product")
    }

}