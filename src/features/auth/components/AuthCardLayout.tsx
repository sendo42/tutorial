import React, { ReactNode } from 'react'
import {
  Card,
//   CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PropsType = {
    title: string
    description: string
    children: ReactNode
    footer: ReactNode
}

const AuthCardLayout = ({ title, description, children, footer }: PropsType) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {footer}
            </CardFooter>
        </Card>
    </div>
  )
}

export default AuthCardLayout