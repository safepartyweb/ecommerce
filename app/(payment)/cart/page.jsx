'use client';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleQtyChange = (productId, qty) => {
    if (qty >= 1) {
      dispatch(updateQuantity({ productId, quantity: parseInt(qty) }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };


  return (
    <section className='sec_hero_bar py-6 md:py-10 '>
      <div className='container max-w-5xl px-4 mx-auto '>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link href="/" className="text-blue-500 underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cartitems">
          <table className="w-full border text-left mb-8 min-w-[500px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                    {item.name}
                  </td>
                  <td className="p-3">${item.price.toFixed(2)}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleQtyChange(item.productId, e.target.value)}
                      className="w-16 border px-2 py-1"
                    />
                  </td>
                  <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        

          <div className="flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="text-red-500 underline"
            >
              Clear Cart
            </button>
            <div className="text-xl font-semibold">
              Subtotal: ${subtotal.toFixed(2)}
            </div>
          </div>

          <div className="mt-8 text-right">
            <Link href="/checkout">
              <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer ">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
      </div>
    </section>
  )
}

export default page