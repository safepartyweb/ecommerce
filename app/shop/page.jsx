'use client'
import React, { useState, useEffect } from 'react'
import { useGetProductsQuery } from '@/lib/api/productApi'
import Loader from '@/components/Loader'
import ProductsGrid from '@/components/products/ProductsGrid'
import BlackButton from '@/components/BlackButton'
import { useGetCategoriesQuery } from '@/lib/api/categoryApi'
import slugify from "slugify";
import SingleProductItem from '@/components/admin/product/SingleProductItem'
import SingProductItemforGrid from '@/components/products/SingProductItemforGrid'
import { Link as ScrollLink, Element } from 'react-scroll'






const page = () => {

  const [prods, setProds] = useState([]);
  const [cats, setCats] = useState([])
  const { data, isLoading } = useGetProductsQuery()
  const { data: catData, isLoading: catLoading } = useGetCategoriesQuery()

  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    if (data) {
      console.log("Data came to me!")
      setProds(data.products)
    }
    if(catData){
      setCats(catData)
    }
  }, [data,catData])

  if (isLoading || catLoading) {
    return <Loader />
  }

  // console.log("catData", catData)

  const filteredCats = cats.filter(cat =>
    prods.some(p => p.category?._id === cat._id)
  )


  const grouped = prods.reduce((acc, product) => {
    const catName = product.category?.name || "Uncategorized";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <div className="scroll-smooth"> {/* ✅ Smooth scroll wrapper */}

      <section className='sec_hero_bar py-6 md:py-10 '>
        <div className='container max-w-sitemax px-4 mx-auto '>
          <h1 className="text-2xl font-bold">All Products</h1>
        </div>
      </section>

      <section className='sec_hero_bar py-6 md:py-10 '>
        <div className='container max-w-sitemax px-4 mx-auto '>

          <div className="flex flex-wrap gap-4 mb-12 justify-center">

            {filteredCats.map(cat => (
              <ScrollLink
                key={cat._id}
                className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition cursor-pointer"
                to={slugify(cat.name, { lower: true })}
                smooth
                duration={500}
              >
                {cat.name}
              </ScrollLink>
            ))}


            {/* {categories.map((cat, index) => (
              <ScrollLink key={index} className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition cursor-pointer" to={slugify(cat, { lower: true })} smooth={true} duration={500}>
                {cat}
              </ScrollLink>
            ))} */}
          </div>
          
          {filteredCats.map(cat => {
            const catProducts = prods.filter(p => p.category?._id === cat._id)

            return (
              <Element key={cat._id} name={slugify(cat.name, { lower: true })}>
                <div className="mb-16 scroll-mt-24 border-b border-gray-300 pb-10">
                  <h2 className="text-4xl font-bold mb-10 text-center">{cat.name}</h2>
                  <div className="flex items-center flex-wrap justify-center gap-6">
                    {catProducts.map(product => (
                      <SingProductItemforGrid key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </Element>
            )
          })}

          {/* {Object.entries(grouped).map(([categoryName, products]) => (
            <Element key={categoryName} name={slugify(categoryName, { lower: true })}>
              <div
                key={categoryName}
                id={slugify(categoryName, { lower: true })}
                className="mb-16 scroll-mt-24 border-b border-gray-300 pb-10"
              >
                <h2 className="text-4xl font-bold mb-10 text-center ">{categoryName}</h2>
                <div className="flex items-center flex-wrap justify-center gap-6">
                  {products.map((product) => (
                    <SingProductItemforGrid key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </Element>
          ))} */}

      </div>
      </section>

    </div>
  )
}

export default page
