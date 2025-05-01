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
                  <div className="single_slide flex flex-col gap-4 items-center justify-center h-full bg-siteBlack text-white py-8 lg:py-0">
                    <Image className='rounded' src={product.images[0].url} alt="Product Image" width={200} height={200} />
                    <div className="product_meta flex gap-0 flex-col justify-center">
                      <p className="slide_title text-center text-uppercase font-bold">{product.title}</p>
                      <p className="slide_description text-center font-bold">${product.price}</p>
                      <div className="btn_wrap flex justify-center mt-4">
                        <Button link={`/products/${product.slug}`}>Shop Now</Button>
                      </div>
                      
                    </div>
                  </div>
                  
                </SwiperSlide> )}
                
                

                {/* <SwiperSlide>
                  <div className="single_slide flex flex-col gap-4 items-center justify-center h-full bg-siteBlack text-white py-8 lg:py-0">
                    <Image className='rounded' src={ProductImage} alt="Product Image" width={200} height={200} />
                    <div className="product_meta flex gap-0 flex-col justify-center">
                      <p className="slide_title text-center text-uppercase font-bold">COCAINE SPRAY – BUBBLEGUM</p>
                      <p className="slide_description text-center font-bold">$90 - $100</p>
                      <div className="btn_wrap flex justify-center mt-4">
                        <Button link="#">Shop Now</Button>
                      </div>
                      
                    </div>
                  </div>
                  
                </SwiperSlide> */}

              </Swiper>
            </div>

          </div>



        



          
          
          
        
      </div>
    </section>
  )
}

export default Hero