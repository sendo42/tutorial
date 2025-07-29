import React from 'react'
import { getCurrentUserProductById } from '../../queries/getCurrentUserProductById'
import { notFound } from 'next/navigation'
import ProductDetailPresentation from './Presentation'

type PropsType = {
    id: number
}

const MyProductDetailContainer = async ({ id }: PropsType) => {
    const product = await getCurrentUserProductById(id)
  
    if( product == null) {
        return notFound()
    }
    return (
        <ProductDetailPresentation product={product} />
  )
}

export default MyProductDetailContainer