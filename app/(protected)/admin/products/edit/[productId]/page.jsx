'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetSingleProductQuery } from '@/lib/api/productApi';
import Loader from '@/components/Loader';
import ProductEdit from '@/components/admin/product/ProductEdit';
import Link from 'next/link';

const Page = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetSingleProductQuery({ productId });

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

  useEffect(() => {
    if (data) {
      setImages(data.product.images);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const product = data.product;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold ">Edit Product: {product.title}</h2>
        <Link className="bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer" target='_blank' href={`/products/${product.slug}`} >View Product</Link>
      </div>
      
      <ProductEdit
        product={product}
        images={images}
        setImages={setImages}
        newImages={newImages}
        setNewImages={setNewImages}
        removeExistingImage={removeExistingImage}
        handleNewImageUpload={handleNewImageUpload}
      />
    </div>
  );
};

export default Page;
