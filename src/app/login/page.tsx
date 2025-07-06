import React from 'react'
import LoginForm from "@/features/auth/components/LoginForm"
import AuthCardLayout from '@/features/auth/components/AuthCardLayout'

const LoginPage = () => {
  return (
    <AuthCardLayout title="ログイン" description="ログインしてください" footer={<p>Card Footer</p>}>
      <LoginForm />
    </AuthCardLayout>
  )
}

export default LoginPage