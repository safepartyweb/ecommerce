'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import BlackButton from '../BlackButton';
import ProductImage from '../../images/products/bubblegum.gif'




const ProductSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay,EffectFade]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      // effect="fade"
      // fadeEffect={{ crossFade: true }}
      speed={500}
      autoplay={{ delay: 3000 }}
      // autoplay={false}
      loop

      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}

      className="overflow-hidden h-full rounded product_slider"
    >
      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>
      
      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>

      <SwiperSlide>
        
        <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full">
          <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
          <div className="product_meta">
            <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
            <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
            <div className="btn_wrap flex items-center justify-center mt-6">
              <BlackButton >Shop Now</BlackButton>
            </div>
          </div>
        </div>
        
      </SwiperSlide>
      



  </Swiper>
  )
}

export default ProductSlider