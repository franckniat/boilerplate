import 'server-only'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from './encode'

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!payload || typeof payload.userId !== 'string') {
        return null
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const refreshedSession = await encrypt({ userId: payload.userId, expiresAt })

    const cookieStore = await cookies()
    cookieStore.set('session', refreshedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    return { userId: payload.userId }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}