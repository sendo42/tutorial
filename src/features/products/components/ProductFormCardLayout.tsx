import React, { ReactNode } from 'react'
import {
  Card,
//   CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PropsType = {
    title: string
    description: string
    children: ReactNode
}

const ProductFormCardLayout = ({ title, description, children }: PropsType) => {
  return (
        <Card className="mx-auto max-w-3xl ">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
  )
}

export default ProductFormCardLayout