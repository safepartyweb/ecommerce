import React from 'react'
import BlackButton from '@/components/BlackButton'

const ProductsPage = () => {
  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between ">
        <h1 className='text-xl font-bold'>Products</h1>
        <div className="buttn_wrap"><BlackButton link="/admin/products/new">Add New Product</BlackButton></div>
      </div>
      
    </div>
  )
}

export default ProductsPage