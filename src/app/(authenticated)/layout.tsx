import React, { ReactNode } from 'react'
import Header from '@/components/layouts/Header'

type PropsType = {
    children: ReactNode
}

const AuthenticatedLayout = ({children}: PropsType) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default AuthenticatedLayout