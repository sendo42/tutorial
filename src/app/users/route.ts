import { email } from "zod/v4"
import prisma from "../../../lib/prisma"
import { z } from "zod"

const createUserSchema  = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})

export async function POST(request: Request) {
  const res = await request.json()

    const varidation = createUserSchema.safeParse(res)
    if (!varidation.success) {
        return Response.json(varidation.error, { status: 400 })
    }

    const { name, email, password } = varidation.data
    console.log("Creating user:", name, email, password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  return Response.json( user )
}