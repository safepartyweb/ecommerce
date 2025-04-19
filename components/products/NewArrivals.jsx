import React from 'react'
import Image from 'next/image'
import ProductImage from '../../images/products/bubblegum.gif'
import ProductImage2 from '../../images/products/Raspberry.gif'
import BlackButton from '../BlackButton'

const NewArrivals = () => {
  return (
    <section className='sec_new_arrivals py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <h2 className='text-3xl md:text-5xl font-bold text-center mb-10'>New Arrivals</h2>
        <div className="prodcuts_wrap flex gap-5 md:gap-8 justify-center flex-wrap ">
          
          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>

          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>

          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>
                  
          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>

          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>
                           
          <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div>





        </div>
        
      </div>
    </section>
  )
}

export default NewArrivals