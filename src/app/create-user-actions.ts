"use server"

import { z } from "zod"
import prisma from "../../lib/prisma"
import { actionClient } from "@/lib/safe-actions"

export type CreateUserResult = {
    success: boolean
    messeage: string
}

const createUserSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})


// export const createUserActions = async (data: CreateUserData): Promise<CreateUserResult> => {
//     const varidation = createUserSchema.safeParse(data)
//     if (!varidation.success) {
//         console.error("Validation failed:", varidation.error)
//         return {
//             success: false,
//             messeage: "varidation failed",
//         }
//     }

//     const { name, email, password } = varidation.data

//     try {
//         await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password,
//             },
//         })
//         return {
//             success: true,
//             messeage: "user created successfully",
//         }
//     } catch (error) {
//         console.error("Error creating user:", error)
//         return {
//             success: false,
//             messeage: "error creating user",
//         }
//     }
// }

export const createUserActions = actionClient
    .schema(createUserSchema)
    .action(async ({ parsedInput: { name, email, password } }) => {
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulate delay
        try {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            })
            return {
                success: true,
                messeage: "user created successfully",
            }
        } catch (error) {
            console.error("Error creating user:", error)
            return {
                success: false,
                messeage: "error creating user",
            }
        }
    })


