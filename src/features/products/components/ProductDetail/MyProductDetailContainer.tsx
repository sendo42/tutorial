import React from 'react'
import { getCurrentUserProductWithUserById } from '../../queries/getCurrentUserProductWithUserById'
import { notFound } from 'next/navigation'
import ProductDetailPresentation from './Presentation'

type PropsType = {
    id: number
}

const MyProductDetailContainer = async ({ id }: PropsType) => {
    const product = await getCurrentUserProductWithUserById(id)
  
    if( product == null) {
        return notFound()
    }
    return (
        <ProductDetailPresentation product={product} />
  )
}

export default MyProductDetailContainer