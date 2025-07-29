import ProductFormCardLayout from '@/features/products/components/ProductFormCardLayout'
import React from 'react'
import ProductForm from '@/features/products/components/ProductForm'

const ProductCreatePage = () => {
  return (
    <ProductFormCardLayout 
        title="商品登録"
        description="新しい商品を登録します。">
        <ProductForm />
    </ProductFormCardLayout>
    )
}

export default ProductCreatePage