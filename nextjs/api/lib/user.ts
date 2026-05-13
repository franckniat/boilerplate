import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/encode';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { fetcher } from './api';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session || typeof session.userId !== 'string') {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const data = await fetcher(`/users/${session.userId}`)

        const user = data[0]

        return user
    } catch (error) {
        console.log('Failed to fetch user : ', error)
        return null
    }
})