import React from 'react'

import SignupForm from "@/features/auth/components/SignupForm"
import AuthCardLayout from '@/features/auth/components/AuthCardLayout'
import Link from 'next/link'

const SignupPage = () => {
  return (
    <AuthCardLayout  
    title="ユーザー登録" 
      description="ユーザーを作成してください"       
      footer={
        <p className="mt-5 text-center text-sm w-full">
          アカウントをお持ちでない方は、
          <Link href="/login" className="text-blue-500 hover:underline">
          こちら</Link>
        </p>
      }>
      <SignupForm />
    </AuthCardLayout>
  )
}

export default SignupPage