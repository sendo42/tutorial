import { pathParamIdSchema } from '@/schemas'
import React from 'react'
import { notFound } from 'next/navigation'
import UpdateProductFormContainer from '@/features/products/components/ProductForm/EditProductContainer'
import ProductFormCardLayout from '@/features/products/components/ProductFormCardLayout'

type PropsType = {
  params: Promise<{ id: string }>
}

const UserProductEditPage = async ({ params }: PropsType) => {
    const { id } = await params

    const validation = pathParamIdSchema.safeParse(id)

    if(!validation.success) {
        return notFound()
    }
    return (
        <ProductFormCardLayout title="商品編集" description='商品情報を編集します。'>
            <UpdateProductFormContainer id={validation.data} />
        </ProductFormCardLayout>
    )
}

export default UserProductEditPage