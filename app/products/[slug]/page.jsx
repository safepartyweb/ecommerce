'use client'
import { useGetProductBySlugQuery } from "@/lib/api/productApi";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import ThumbnailSlider from "@/components/ThumbnailSlider";
import BlackButton from "@/components/BlackButton";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";


export default function ProductPage() {

  
  const { slug } = useParams();
  console.log("Slug", slug)

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const {data, isLoading } = useGetProductBySlugQuery({slug});
  if(isLoading){
    return <Loader />
  }
  console.log("data", data)
  const product = data.product;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.title,
      image: product.images[0]?.url,
      price: product.price,
      quantity: parseInt(quantity),
    }));
  };


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

              <div className="cart_btn_wrap my-4 flex flex-col gap-4">


                <div className="input_group flex gap-1 items-center ">
                  <label className="block font-medium">Quantity:</label>
                  <input className="border rounded w-full px-3 py-2 max-w-[70px]" type="number" name="" value={quantity}
        min={1} onChange={(e) => setQuantity(e.target.value)}/> 
                </div>
                <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer max-w-[175px]" onClick={handleAddToCart}>Add to cart </button>

              </div>

            </div>

            

          </div>
        </div>    
      </div>
    </section>

  );
}
