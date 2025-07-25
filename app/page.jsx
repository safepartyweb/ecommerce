'use client'


import { useState, useEffect } from "react";
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
import HomeQoutes from "@/components/home/HomeQoutes";
import SafeHands from "@/components/home/SafeHands";
import PopupModal from "@/components/home/PopUpModal";


export default function Home() {

  const [ showLoader, setShowLoader ] = useState()
  const {data, isLoading} = useGetProductsQuery()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem('popupClosedAt');
    const now = new Date();

    if (!lastClosed || new Date(lastClosed) < new Date(now -  1 * 60 * 60 * 1000)) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('popupClosedAt', new Date().toISOString());
    setShowModal(false);
  };


  if(isLoading) return <Loader />




  return (
    <div className="">
      
      
      <Hero productsData={data} />


      <AnimatedBlock className='' direction="up">
        <Bar />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <BestSeller productsData={data} />
      </AnimatedBlock>     

      <AnimatedBlock className='' direction="up">
        <SecLeftRight />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <HomeQoutes />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <Featured productsData={data} />
      </AnimatedBlock>


      <AnimatedBlock className='' direction="up">
        <Marque />
      </AnimatedBlock>



      <AnimatedBlock className='' direction="up">
        <HomeSlider />
      </AnimatedBlock>

      {/* <AnimatedBlock className='' direction="up">
        <NewArrivals productsData={data} />
      </AnimatedBlock> */}

      <AnimatedBlock className='' direction="up">
        <SafeHands />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewsLetter />
      </AnimatedBlock>

      {showModal && <PopupModal onClose={handleClose} />}
      
      
      
      
      
      
      
      
      
    </div>
  );
}
