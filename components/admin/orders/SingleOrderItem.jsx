import React,{useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import VerDot from '@/images/verticaldots.svg'
import Link from 'next/link'
import AnimatedBlock from '@/components/shared/MotionParent'

const SingleOrderItem = ({order,sl}) => {
  
  console.log("Order from single Order Item:", order)
  const divRef = useRef(null);
  
  const [showOptions, setShowOptions] = useState(false)

  const showOptionsHandler = () => {
    console.log("clicked!")
    setShowOptions(!showOptions)
  }

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowOptions(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AnimatedBlock direction="up">
    <div className='flex gap-2 justify-between items-center border-b border-gray-500 pb-4'>
      <div className="prod_sl flex-1">{sl+1}.</div>
      <div className="prod_img flex-3"> {order.user.fullName}   </div>
      {/* <div className="title flex-6">{order.title}</div> */}
      <div className="title flex-3">${order.totalPrice}</div>
      <div className="title flex-3">{order.status}</div>
      <div className="title flex-3">{order.isPaid ? "Paid" : "Not paid"}</div>
      {/* <div className="title flex-3">{order.bestSeller ? "Yes" : "No"}</div> */}
      <div ref={divRef} className="title flex-1 flex justify-center relative">
        <Image onClick={showOptionsHandler} className='cursor-pointer verticaldots' src={VerDot} width={12} height={42} alt="Vertical Dot" />
        {showOptions && <div  className="options absolute top-[110%] right-0 bg-gray-700 p-6 min-w-[200px] text-white rounded z-10">
          <ul>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link href={`/admin/orders/${order._id}`}>View Details</Link>
            </li>
            {/* <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link href={`/admin/orders/edit/${prod._id}`}>Edit</Link>
            </li> */}
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>Change Status</li>
            {/* <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>Delete</li> */}
          </ul>
        </div>}
        
      </div>

    </div>
    </AnimatedBlock>
  )
}

export default SingleOrderItem