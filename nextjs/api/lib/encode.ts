import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

export interface SessionPayload {
    userId: string
    expiresAt: Date
    [key: string]: string | Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null

function isCompactJws(token: string): boolean {
    // JWT compact form: header.payload.signature
    const parts = token.split('.')
    return parts.length === 3 && parts.every((part) => part.length > 0)
}

export async function encrypt(payload: SessionPayload) {
    if (!encodedKey) {
        throw new Error('SESSION_SECRET is required to create a signed session token.')
    }

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    if (!session || !encodedKey || !isCompactJws(session)) {
        return null
    }

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch {
        // Invalid, expired, or tampered token.
        return null
    }
}