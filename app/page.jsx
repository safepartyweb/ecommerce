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





export default function Home() {
  return (
    <div className="">
      {/* <Loader /> */}
      <Hero />
      <Bar />
      <SecLeftRight />
      <Marque />
      <BestSeller />
      <HomeSlider />
      <NewArrivals />
      <NewsLetter />
      
      
    </div>
  );
}
