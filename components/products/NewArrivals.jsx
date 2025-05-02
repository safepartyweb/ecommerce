import React from 'react'
import Image from 'next/image'
import ProductImage from '../../images/products/bubblegum.gif'
import ProductImage2 from '../../images/products/Raspberry.gif'
import BlackButton from '../BlackButton'
import AnimatedBlock from '../shared/MotionParent'

const NewArrivals = ({productsData}) => {
  const products = productsData.products;
  // console.log("productsL:", products)
  const newArrivals = products.slice(0,6);
  // console.log("newArrivals", newArrivals)
  
  
  return (
    <section className='sec_new_arrivals py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <h2 className='text-3xl md:text-5xl font-bold text-center mb-10'>New Arrivals</h2>
        <div className="prodcuts_wrap flex gap-5 md:gap-8 justify-center flex-wrap ">
          
          {newArrivals.map(product=> <AnimatedBlock key={product._id} direction='up' className=' w-full sm:w-[45%] lg:w-[30%] single_product border border-siteBlack rounded p-4 md:p-6'> <div  className=" flex gap-6 flex-col justify-center items-center">
            
            {/* <Image className='rounded w-full h-auto' src={product.images[0].url} alt="product image" width={200} height={200} /> */}
            <div className="img_wrap h-auto xl:h-[280px] p-4 md:p-6 mb-4">
              <Image className='rounded max-h-[280px] w-auto' src={product.images[0]?.url} alt="product image" width={200} height={200} />
            </div>
            
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">{product.title}</h3>
              <p className="product_price font-bold text-lg text-center">${product.price}</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton link={`/products/${product.slug}`} >Shop Now</BlackButton>
              </div>
            </div>
          </div></AnimatedBlock> )}


          

          {/* <div className="single_product border border-siteBlack rounded p-4 md:p-6 flex gap-6 flex-col justify-center items-center w-full sm:w-[45%] lg:w-[30%]">
            <Image className='rounded w-full h-auto' src={ProductImage} alt="product image" width={200} height={200} />
            <div className="product_meta">
              <h3 className="product_title font-bold text-xl text-center">COCAINE – RASPBERRY WASH</h3>
              <p className="product_price font-bold text-lg text-center">$110 - $1600</p>
              <div className="btn_wrap flex items-center justify-center mt-6">
                <BlackButton >Shop Now</BlackButton>
              </div>
            </div>
          </div> */}






        </div>
        
      </div>
    </section>
  )
}

export default NewArrivals