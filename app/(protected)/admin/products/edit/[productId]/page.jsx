'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetSingleProductQuery } from '@/lib/api/productApi';
import Loader from '@/components/Loader';
import ProductEdit from '@/components/admin/product/ProductEdit';

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
      <h2 className="text-xl font-bold mb-4">Edit Product: {product.title}</h2>
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
