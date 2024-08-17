'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Wyloguj się
    </button>
  )
}
