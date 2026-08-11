'use client'
import { useSession } from 'next-auth/react'

export default function Profile() {
    const session = useSession();

    if (session.data?.user) {
        return <div>from client: signed in.</div>
    } else {
        return <div>from client: user is NOT signed in.</div>
    }

}