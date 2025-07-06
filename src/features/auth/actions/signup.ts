"use server";

import { actionClient } from "@/lib/safe-action";
import { UserOptionalDefaultsSchema } from "@/../prisma/generated/zod/modelSchema/UserSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signup = actionClient
    .schema(UserOptionalDefaultsSchema)
    .action(async ({ parsedInput: { name, email, password } }) => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if(existingUser != null) {
                return {
                    success: false,
                    message: "email already exists",
                };
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
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