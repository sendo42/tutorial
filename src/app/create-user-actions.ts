"use server"

import { z } from "zod"
import prisma from "../../lib/prisma"

export type CreateUserResult = {
    success: boolean
    messeage: string
}

const createUserSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})

type CreateUserData = z.infer<typeof createUserSchema>

export const createUserActions = async (data: CreateUserData): Promise<CreateUserResult> => {
    const varidation = createUserSchema.safeParse(data)
    if (!varidation.success) {
        console.error("Validation failed:", varidation.error)
        return {
            success: false,
            messeage: "varidation failed",
        }
    }

    const { name, email, password } = varidation.data

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
}

export const createUserActionFromServerComponent = async (FormData: FormData) => {
    const userData = Object.fromEntries(FormData.entries())

    const varidation = createUserSchema.safeParse(userData)
    if (!varidation.success) {
        throw new Error("varidation failed")
    }

    const { name, email, password } = varidation.data

      const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  
}
