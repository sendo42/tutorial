import React from 'react'
import LoginForm from "@/features/auth/components/LoginForm"
import AuthCardLayout from '@/features/auth/components/AuthCardLayout'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <AuthCardLayout 
      title="ログイン" 
      description="ログインしてください" 
      footer={
        <p className="mt-5 text-center text-sm w-full">
          アカウントをお持ちでない方は、
          <Link href="/signup" className="text-blue-500 hover:underline">
          こちら</Link>
        </p>
      }>
      <LoginForm />
    </AuthCardLayout>
  )
}

export default LoginPage