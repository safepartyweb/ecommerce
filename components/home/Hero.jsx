'use client';

import React,{ } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Button from '../Button';
import BlackButton from '../BlackButton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductImage from '../../images/products/bubblegum.gif'
import ProductImage2 from '../../images/products/Raspberry.gif'

import AnimatedBlock from '../shared/MotionParent';
import SlideSingleProduct from '../products/SlideSingleProduct';
import HeroSlideSingleProduct from '../products/HeroSlideSingleProduct';




const Hero = ({productsData}) => {
  const products = productsData.products;
  // console.log("products from hero",products )

  const showHeroProducts = products.filter(product => product.showHero)
  // console.log("showHeroProducts", showHeroProducts)

  return (
    <section className='sec-home-hero py-6 md:py-10 pt-12 md:pt-20'> 
      <div className='container max-w-sitemax px-4 mx-auto'>
        
        
          
        
          <div className="home-hero-wrap flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-center h-auto lg:h-[400px]">
            <div className="home-hero-left w-full lg:w-[50%] h-full flex items-center flex-col justify-center gap-6 lg:order-first order-last pr-0 lg:pr-10">
              <h1 className='text-3xl  md:text-5xl font-bold text-siteBlack'>Trusted Supplier of Pharmaceutical-Grade Cocaine</h1>
              <p className="text-siteBlack font-medium text-xl md:text-2xl ">Serving licensed professionals across Canada with high-purity, regulated products for clinical and scientific use.</p>
              
              <div className="hero_btn_wrap w-full ">
                <BlackButton link="/" >Shop Now!</BlackButton>
              </div>


            </div>

            
            <div className="home-hero-right w-full  lg:w-[50%] h-full order-first lg:order-last" >
              <Swiper
                // modules={[Navigation, Pagination, Autoplay]}
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                // navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000 }}
                // autoplay={false}
                loop
                className="overflow-hidden h-full rounded"
              >
                {showHeroProducts.map(product => <SwiperSlide>

                  
                  <HeroSlideSingleProduct product={product}/>
                  
                </SwiperSlide> )}
                
                

              </Swiper>
            </div>

          </div>



        



          
          
          
        
      </div>
    </section>
  )
}

export default Hero