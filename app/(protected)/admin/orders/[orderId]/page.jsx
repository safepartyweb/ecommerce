'use client'
import React,{useState, useEffect} from 'react'
import { useParams } from 'next/navigation'
import { useGetSingleOrderQuery, useEditOrderMutation } from '@/lib/api/orderApi'
import Loader from '@/components/Loader'
import Image from 'next/image'
import dayjs from 'dayjs'
import BlackButton from '@/components/BlackButton'
import Button from '@/components/Button'
import { toast } from 'react-toastify'


const page = () => {
  const {orderId} = useParams()
  // console.log("Order Id", orderId)

  const [showEdit, setShowEdit] = useState(false)
  const [payment,setPayment] = useState()
  const [status, setStatus] = useState()
  const {data,isLoading} = useGetSingleOrderQuery({orderId})
  const [editOrder,{isLoading:editLoading}] = useEditOrderMutation()

  useEffect(() => {

    if(data){
      setPayment(data.order.isPaid)
      setStatus(data.order.status)
    }
  },[data])



  if(isLoading){
    return <Loader />
  }
  console.log("Oder Data:", data)
  const order = data.order;
  const user = data.order.user

  const editOrderHandler = async (e) => {
    e.preventDefault();
    console.log("Edit form submitted!")


    const data = {
      status,
      isPaid:payment,
      orderId
    }
    

    try {
      const apiRes = await editOrder(data).unwrap();
      console.log("apiRes", apiRes)
      toast.success("Order updated!")
      setShowEdit(false)
    } catch (error) {
      console.log("Error:", error)
      toast.error("Something went wrong!")
      setShowEdit(false)
    }



  }


  return (
    <>
      <div className="flex justify-between">
        <BlackButton link="/admin/orders">Back to orders</BlackButton>
        <button onClick={e => setShowEdit(true)} className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer'>Edit Order</button>
      </div>
      
      <h1 className="text-xl font-bold mt-6">Order Details</h1>
      
      <div className="border-b pb-4 mb-6">
        <h1 className="text-lg font-medium">Order #{order._id}</h1>
        <p className="text-sm text-gray-600"><span className='font-bold'>Placed on:</span> {dayjs(order.createdAt).format('DD MMM, YYYY')} </p>

        <span className='font-bold'>Status: </span>
        <span className={`px-2 py-1 text-sm rounded 
          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>
        <p>{user.fullName}</p>
        <p>{user.address}, {user.city}, {user.country}</p>
        <p>Phone: {user.phone}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Items in this Order</h2>
        {order.orderItems.map((item,index) => (
          <div key={index} className="flex gap-4 border-b py-3">
            <Image src={item.image} alt={item.name} width={60} height={60} />
            <div className="flex-grow">
              <p className="font-medium">{item.name}  {item.isVariable ? ` - ${item.variationLabel}`  : ''}</p>
              <p className="text-sm">Qty: {item.quantity} × ${item.price}</p>
            </div>
            <p className="font-semibold">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded shadow-sm max-w-md">
        <h2 className="font-semibold text-lg mb-3">Payment Summary</h2>
        <div className="flex justify-between mb-1"><span>Subtotal:</span><span>${order.itemsPrice}</span></div>
        <div className="flex justify-between mb-1"><span>Shipping Fee:</span><span>${order.shippingPrice}</span></div>
        {order.discount && (
          <div className="flex justify-between mb-1"><span>Discount:</span><span>-${order.discount}</span></div>
        )}
        <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span><span>${order.totalPrice}</span></div>
      </div>


      {/* <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Order Activity</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>🛒 Ordered: </li>
          <li>🚚 Shipped: </li>
          <li>📦 Delivered: </li>
        </ul>
      </div> */}

      {showEdit && (
        <div className="overlay fixed w-full h-full top-0 left-0 backdrop-blur-sm flex items-center justify-center z-[90] p-4">

          <div className="modal_inner flex flex-col justify-center w-full max-w-[500px] p-6 bg-siteGray text-white rounded">
            <h1 className='text-center text-2xl font-bold mb-6'>Edit Order!</h1>
            
            <form onSubmit={editOrderHandler} className="mb-6"  action="">
              <p className="text-lg font-bold mb-4">Change Payment Status</p>
              <select value={payment} onChange={e => setPayment(e.target.value) } className="mb-4 border border-white p-4 text-black bg-white" name="" id="">
                <option value="">Select One</option>
                <option value='true'>Paid</option>
                <option value="false">Not Paid</option>
              </select>


              <p className="text-lg font-bold mt-4 mb-4">Change Order Status</p>
              <select value={status} onChange={e => setStatus(e.target.value) } className="mb-4 border border-white p-4 text-black bg-white" name="" id="">
                <option value="">Select One</option>
                <option value='Pending'>Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>


              <div className="flex gap-4">
                <div className="bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 block font-bold font-lg cursor-pointer" onClick={e => setShowEdit(false)}>Cancel</div>
                <button className="bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 block font-bold font-lg cursor-pointer">Update</button>
              </div>
            </form>

          </div>


          </div>

      )}
      





    </>
  )
}

export default page