'use client'
import React,{useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetSingleProductQuery } from '@/lib/api/productApi'
import Loader from '@/components/Loader'

const page = () => {
  const {productId} = useParams()
  console.log("Product Id:", productId )
  const {data, isLoading} = useGetSingleProductQuery({productId})

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  
  // Remove existing image
  const removeExistingImage = (id) => {
    setImages(images.filter(img => img._id !== id));
  };
  
  // Upload new image
  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };  


  useEffect(()=> {
    if(data){
      setImages(data.product.images)
    }
   
  },[isLoading, data])

  if(isLoading){
    return <Loader />
  }
  console.log("data",data)
  const product = data.product;

  return (
    <div>
      <h2 className='text-xl font-bold'>{product.title}</h2>
      <div className="images">

      </div>
    </div>
  )
}

export default page