'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { clearCart } from '@/store/cartSlice';
import Image from 'next/image';
import Tick from '/images/tick-green.svg'
import { toast } from 'react-toastify';


export default function CheckoutPage() {
  const [showLoader, setShowLoader] = useState(false)

  const [showOrderSuccess, setShowOrderSuccess] = useState(false)


  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);
  
  console.log("userInfo",userInfo)
  console.log("cartItems",cartItems)

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=checkout');
    }
  }, [userInfo, router]);

  useEffect(() => {
    const calculated = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0 );
    setSubTotal(calculated);
    if(calculated > 500){
      setShipping(0)
    }else{
      setShipping(100)
    }
  }, [cartItems]);

  useEffect(() => {
    if (!userInfo) {
      //router.push('/login?redirect=checkout');
    } else {
      // Prefill form
      setForm((prev) => ({
        ...prev,
        name: userInfo.fullName || '',
        email: userInfo.email || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        postalCode: userInfo.postalCode || '',
        country: userInfo.country || '',
      }));
    }
  }, [userInfo, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  if (!userInfo) {
    return null; // Or return a loading spinner
  }

  if (cartItems.length === 0 && !showOrderSuccess) {
    return (
      <div className="text-center py-10">
        <p>Your cart is empty.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to shopping
        </Link>
      </div>
    );
  }

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    // setShowOrderSuccess(true)

    //1. Create order on db

    // const cartItems = useSelector((state) => state.cart.items);
    // const shippingAddress = useSelector((state) => state.cart.shippingAddress);
    // const paymentMethod = useSelector((state) => state.cart.paymentMethod || 'Cash on Delivery');
  
    const itemsPrice = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    let shippingPrice = itemsPrice > 500 ? 0 : 100;
    const taxPrice = 0;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderItems: cartItems,
          // shippingAddress,
          // paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          userId: userInfo.id,
          referredBy: userInfo.referredBy,
        }),
      });

      // console.log("res", res)
  
      if (!res.ok) {
        throw new Error('Failed to create order');
      }
  
      const data = await res.json();
      console.log('✅ Order created successfully:', data);
      dispatch(clearCart());
      toast.success("Order created successfully. Redirecting to payment processor. Please wait!")
      

      //2. Get Order Id, amount etc
      const orderId = data._id;
      // console.log('📦 Order ID:', orderId);

      

      try {
        const externalApiRes = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price_amount: totalPrice,
            // shippingAddress,
            // paymentMethod,
            price_currency:'usd',
            order_id:orderId,

          }),
        });
        console.log("externalApiRes",externalApiRes)
        if (!externalApiRes.ok) {
          throw new Error('Failed to create payment link');
        }
        const paymentLinkData = await externalApiRes.json();
        console.log('✅ Payment link created successfully:', paymentLinkData);
        if (paymentLinkData) {
          window.location.href = paymentLinkData.data.invoice_url;
        } else {
          console.error('No payment URL returned');
        }
      } catch (error) {
        console.error('❌ Failed to create payment link: ', error);
      }


      //return data;
    } catch (error) {
      console.error('❌ Error creating order:', error);
    }finally{
      
      // setShowOrderSuccess(false)
    }










    

    //3. Create api call to payment route

    //4. get payment url

    //5. redirect user to payment url
  }

  return (
    <div className="max-w-5xl mx-auto p-4 relative">
      {showLoader && <Loader />}
      {showOrderSuccess && <>
        <div className="orderSuccessScreen flex flex-col gap-10 items-center justify-center absolute w-full h-full z-20 bg-white">
          <Image src={Tick} width={120} height={120} alt="Tick" />
          <div>
            <h1 className='text-xl font-bold text-center'>Order successful!</h1>
            <p className="text-lg font-medium text-center">Redirect you to payment page in a moment!</p>
          </div>
        </div>
      </>}
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={placeOrderHandler} className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <div className="btn_wrap flex items-center justify-between gap-8">
            <button
              type="submit"
              className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer "
            >
              Place Order
            </button>
            <Link className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer " href="/cart">Go back to Cart</Link>
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item,index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name} {item.isVariable ? ` - ${item.variation.label}`  : ''} ( {item.price} × {item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />

          <div className="text-lg font-semibold flex justify-between">
            <span>Sub Total:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="text-lg font-semibold flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="text-lg font-semibold flex justify-between">
            <span>Total:</span>
            <span>${(subTotal + shipping).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
