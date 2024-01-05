'use client'
import { Input } from '@nextui-org/react'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  return (
    <div>
      <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
  )
}
