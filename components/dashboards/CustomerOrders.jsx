'use client'
import React from 'react'
import SingleOrder from '../customer/SingleOrder'

const CustomerOrders = ({orders}) => {


  console.log("Orders", orders)
  return (
    <>
      <div className="prod_wrap flex flex-col gap-4">
        {orders.map((order,index) => <SingleOrder key={order._id} order={order} sl={index} />)}
      </div>
      
    </>
  )
}

export default CustomerOrders