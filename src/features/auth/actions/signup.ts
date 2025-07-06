"use server";

import { actionClient } from "@/lib/safe-action";
import { UserOptionalDefaultsSchema } from "@/../prisma/generated/zod/modelSchema/UserSchema";
import prisma from "@/lib/prisma";

export const signup = actionClient
    .schema(UserOptionalDefaultsSchema)
    .action(async ({ parsedInput: { name, email, password } }) => {
        try {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                }
            })
            return {
                succes: true,
                message: "User created successfully",
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: "Failed to create user",   
            }
        }
});