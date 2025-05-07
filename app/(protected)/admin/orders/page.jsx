'use client'
import React,{useState} from 'react'
import { useGetOrdersQuery } from '@/lib/api/orderApi'
import Loader from '@/components/Loader'
import SingleOrderItem from '@/components/admin/orders/SingleOrderItem'




const page = () => {
  const [showLoader, setShowLoader] = useState(false)


  const {data, isLoading, isError, error} = useGetOrdersQuery()

  if(isError){
    console.log("error", error)
  }

  if(isLoading){
    return <Loader />
  }

  console.log("data",data)
  const orders = data?.orders;

  if(orders.length == 0){
    return 'No order found!'
  }

  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between ">
        <h1 className='text-xl font-bold'>Orders</h1>
        {/* <div className="buttn_wrap"><BlackButton link="/admin/products/new">Add New Product</BlackButton></div> */}
      </div>

      <div className="products_list">
        <h1 className='text-lg font-semibold'>All Orders:</h1>
        
        <div className="products_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
          <div className="prod_sl flex-1">SL.</div>
          <div className="prod_img flex-3">Customer Name</div>
          {/* <div className="title flex-6">Title</div> */}
          <div className="title flex-3">Amount</div>
          <div className="title flex-3">Status</div>
          <div className="title flex-3">Payment</div>
          {/* <div className="title flex-3">Best Seller</div> */}
          <div className="title flex-1 flex justify-center">Actions</div>
        </div>
        
        <div className="prod_wrap flex flex-col gap-4">
          {orders.map((item,index) => <SingleOrderItem key={index} order={item} sl={index} /> )}
        </div>

      </div>
    </div>
  )
}

export default page