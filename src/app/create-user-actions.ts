"use server"

import { z } from "zod"
import prisma from "../../lib/prisma"

const createUserSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})

type CreateUserData = z.infer<typeof createUserSchema>

export const createUserActions = async (data: CreateUserData) => {
    const varidation = createUserSchema.safeParse(data)
    if (!varidation.success) {
        return varidation.error
    }

    const { name, email, password } = varidation.data

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  return user
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
