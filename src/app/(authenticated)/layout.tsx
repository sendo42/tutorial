import React, { ReactNode } from 'react'

type PropsType = {
    children: ReactNode
}

const AuthenticatedLayout = ({children}: PropsType) => {
  return (
    <>{children}</>
  )
}

export default AuthenticatedLayout