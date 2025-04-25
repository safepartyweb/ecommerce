import Image from "next/image";
import Loader from "@/components/Loader";
import Hero from "@/components/home/Hero";
import Bar from "@/components/home/Bar";
import SecLeftRight from "@/components/home/SecLeftRight";
import Marque from "@/components/home/Marque";
import NewArrivals from "@/components/products/NewArrivals";
import HomeSlider from "@/components/home/HomeSlider";
import BestSeller from "@/components/home/BestSeller";
import NewsLetter from "@/components/shared/NewsLetter";
import AnimatedBlock from "@/components/shared/MotionParent";





export default function Home() {
  return (
    <div className="">
      {/* <Loader /> */}
      <Hero />
      <AnimatedBlock className='' direction="up">
        <Bar />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <SecLeftRight />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <Marque />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <BestSeller />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <HomeSlider />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewArrivals />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewsLetter />
      </AnimatedBlock>
      
      
      
      
      
      
      
      
      
    </div>
  );
}
