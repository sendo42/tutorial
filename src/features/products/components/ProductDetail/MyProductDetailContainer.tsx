import React from 'react'
import {getCurrentUserProductWithUser } from '../../queries/getCurrentUserProductWithUser'
import { notFound } from 'next/navigation'
import ProductDetailPresentation from './Presentation'

type PropsType = {
    id: number
}

const MyProductDetailContainer = async ({ id }: PropsType) => {
    const product = await getCurrentUserProductWithUser(id)
  
    if( product == null) {
        return notFound()
    }
    return (
        <ProductDetailPresentation product={product} />
  )
}

export default MyProductDetailContainer