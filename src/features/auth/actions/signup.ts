"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signupFormValuesSchema } from "../schemas";
import { uploadImageToS3 } from "@/lib/s3";

export const signup = actionClient
    .schema(signupFormValuesSchema)
    .action(async ({ parsedInput: { name, email, password, image } }) => {
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
            let imageUrl: string | undefined
            if (image != null) {
                imageUrl = await uploadImageToS3(image, "users");
            }
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    imageUrl,
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