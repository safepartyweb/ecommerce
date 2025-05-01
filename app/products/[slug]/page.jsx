'use client'
import { useGetProductBySlugQuery } from "@/lib/api/productApi";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import ThumbnailSlider from "@/components/ThumbnailSlider";


export default function ProductPage() {

  
  const { slug } = useParams();
  console.log("Slug", slug)

  const {data, isLoading } = useGetProductBySlugQuery({slug});
  if(isLoading){
    return <Loader />
  }
  console.log("data", data)
  const product = data.product;

  


  return (
    <section className='sec_hero_bar py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <div className="mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <div className="product_wrap grid grid-cols-2 gap-16 ">
            
            <div className="images col-span-2 lg:col-span-1 ">
              <ThumbnailSlider images={product.images} />
            </div>

            <div className="prod_details ">
              
              <p className="text-lg font-medium">Price: {product.price}</p>
              <p className="text-lg font-medium">Details: {product.description}</p>
            </div>

          </div>
        </div>    
      </div>
    </section>

  );
}
