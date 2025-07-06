import * as jose from 'jose'
import { cookies } from 'next/headers'

type JWTPayload = {
    userId: number
    name: string
    imageUrl: string | null
}

const JWT_SECRET = process.env.JWT_SECRET ?? "invalid"

const ISSUER = "ec-app"
const AUDIENCE = "ec-app-web"
const COOKIE_NAME = "auth-token"
export const signJWT = async(payload: JWTPayload): Promise<string> =>{
    const secret = new TextEncoder().encode(JWT_SECRET)
    const alg = 'HS256'

    return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime('24h')
    .sign(secret)

}

export const setAuthToken = async (token: string) => {
    const cookieStore = await cookies()

    cookieStore.set(COOKIE_NAME, token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day 
    })

}