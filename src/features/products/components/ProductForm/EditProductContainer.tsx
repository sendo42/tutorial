import React from 'react'
import ProductFormPresentation from './Presentation'
import { getCurrentUserProductById } from '../../queries/getCurrentUserProduct'
import { notFound } from 'next/navigation'

type PropsType = {
    id: number
}

const UpdateProductFormContainer = async ({ id }: PropsType) => {
  const product = await getCurrentUserProductById(id)

  if(product == null ) {
    return notFound()
  }
  return (
    <ProductFormPresentation product={product} />
  )
}

export default UpdateProductFormContainer