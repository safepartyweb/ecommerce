'use client'

import React,{use} from 'react'
import { useParams } from 'next/navigation'
const page = () => {

  const {orderId} = useParams()


  return (
    <div>
        Order details page for customer...
        Order Id: {orderId}
    </div>
  )
}

export default page