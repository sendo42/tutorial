import { pathParamIdSchema } from '@/schemas'
import React from 'react'
import { notFound } from 'next/navigation'

type PropsType = {
  params: Promise<{ id: string }>
}

const UserProductDetailPage = async ({ params }: PropsType) => {
    const { id } = await params

    const validation = pathParamIdSchema.safeParse(id)

    if(!validation.success) {
        return notFound()
    }
  return (
    <div>UserProductDetailPage: {id}</div>
  )
}

export default UserProductDetailPage