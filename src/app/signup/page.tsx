import React from 'react'

import SignupForm from "@/features/auth/components/SignupForm"
import AuthCardLayout from '@/features/auth/components/AuthCardLayout'

const SignupPage = () => {
  return (
    <AuthCardLayout  title="ユーザー登録" description="ユーザーを作成してください" footer={<p>Card Footer</p>}>
      <SignupForm />
    </AuthCardLayout>
  )
}

export default SignupPage