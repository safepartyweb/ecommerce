import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import BlackButton from "../BlackButton";
import Link from "next/link";
import { toast } from "react-toastify";


const SingProductItemforGrid = ({ product }) => {
  console.log("Product from single product item for grid:", product);
  const dispatch = useDispatch();

  let lowestPrice, highestPrice;
  if(product.isVariable){
    const prices = product.variations.map(v => v.price);
    lowestPrice = Math.min(...prices);
    highestPrice = Math.max(...prices);
  }





  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.title,
      image: product.images[0]?.url,
      price: product.price,
      quantity: 1,
      isVariable: product.isVariable ? product.isVariable : false ,
    }));

    toast.success("Added to cart!")

  };


  return (
    <div className="flex flex-col gap-4 bg-gray-100 rounded p-4">

      <Image
        className="rounded mx-auto h-[212px] w-auto object-cover"
        src={product?.images[0].url}
        width={300}
        height={212}
        alt={product.title}
      />

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        {product.isVariable ? <p className="product_price font-bold text-lg text-center">${lowestPrice} - ${highestPrice}</p> : <p className="product_price font-bold text-lg text-center">${product.price}</p>}
        {/* <p>Stock: {product.stock}</p> */}
        {/* {product.weight ? (
          <p>Quantity: {product.weight} {product.unit}</p>
        ) : ''} */}
        {/* {product.category ? (
          <p>Category: {product.category.name}</p>
        ) : ''} */}
        
      </div>
      
      <div className="flex gap-4 justify-center">
        <Link className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer max-w-[175px]" href={`/products/${product.slug}`}>View Details</Link>
        {!product.isVariable && (
          <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer max-w-[175px]" onClick={handleAddToCart}>Add to cart </button>
        )}
        


      </div>


    </div>
  );
};

export default SingProductItemforGrid;
