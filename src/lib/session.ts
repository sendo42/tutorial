import * as jose from 'jose'
import { cookies } from 'next/headers'
import { AuthenticationError } from './error'

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

export const verifyJWT = async(token: string): Promise<JWTPayload> => {
    const secret = new TextEncoder().encode(JWT_SECRET) 


    const { payload } = await jose.jwtVerify<JWTPayload>(token, secret, {
        issuer: ISSUER,
        audience: AUDIENCE,
    })

    return payload
}

export const getAuthToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value
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

export const getCurrentUser = async () => {
    const token = await getAuthToken()

    if (token == null) {
        throw new AuthenticationError("認証トークンが見つかりません")
    }

    try {
        const payload = await verifyJWT(token)
        return payload
    } catch {
        throw new AuthenticationError("認証トークンが無効です")
    }
}