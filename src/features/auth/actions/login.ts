"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginFormValuesSchema } from "../schemas";
import { setAuthToken, signJWT } from "@/lib/session";

export const login = actionClient
    .schema(loginFormValuesSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if(user == null) {
                return {
                    success: false,
                    message: "メールアドレスもしくはパスワードが間違っています",
                };
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "メールアドレスもしくはパスワードが間違っています",
                };
            }
            const token = await signJWT({
                userId: user.id,
                name: user.name,
                imageUrl: user.imageUrl,
            })
            await setAuthToken(token)
            return {
                success: true,
                message: "ログインしました",
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: "ログインに失敗しました",   
            }
        }
});