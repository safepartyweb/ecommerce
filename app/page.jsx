'use client'


import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import Hero from "@/components/home/Hero";
import Bar from "@/components/home/Bar";
import SecLeftRight from "@/components/home/SecLeftRight";
import Marque from "@/components/home/Marque";
import NewArrivals from "@/components/products/NewArrivals";
import Featured from "@/components/products/Featured";
import HomeSlider from "@/components/home/HomeSlider";
import BestSeller from "@/components/home/BestSeller";
import NewsLetter from "@/components/shared/NewsLetter";
import AnimatedBlock from "@/components/shared/MotionParent";
import { useGetProductsQuery } from "@/lib/api/productApi";




export default function Home() {

  const [ showLoader, setShowLoader ] = useState()
  const {data, isLoading} = useGetProductsQuery()

  if(isLoading) return <Loader />




  return (
    <div className="">
      
      
      <Hero productsData={data} />


      <AnimatedBlock className='' direction="up">
        <Bar />
      </AnimatedBlock>
     

      <AnimatedBlock className='' direction="up">
        <SecLeftRight />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <Featured productsData={data} />
      </AnimatedBlock>


      <AnimatedBlock className='' direction="up">
        <Marque />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <BestSeller productsData={data} />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <HomeSlider />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewArrivals productsData={data} />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewsLetter />
      </AnimatedBlock>
      
      
      
      
      
      
      
      
      
    </div>
  );
}
