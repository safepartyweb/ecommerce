'use client'

import { useState } from 'react';
import UploadSingleImage from '../UploadSingleImage';
import { useEditProductMutation } from '@/lib/api/productApi';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Checkbox from '@/images/checkbox-black.svg'
import CheckboxChecked from '@/images/checkbox-black-checked.svg'
import Image from 'next/image';


export default function ProductEdit({ product }) {
  console.log("Product", product)
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [bestSeller, setBestSeller] = useState(product.bestSeller);
  const [showHero, setShowHero] = useState(product.showHero);
  const [images, setImages] = useState(product.images || []);
  const [showLoader, setShowLoader] = useState(false)

  const router = useRouter();

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };


  const handleImageUpload = async (e) => {
    console.log("Image upload action!")
    const file = e.target.files[0];
    if (!file) return;
    const imgApiRes =  await UploadSingleImage(file)
    console.log("imgApiRes",imgApiRes) 
    setImages([...images, {url:imgApiRes.secure_url, public_id:imgApiRes.public_id}]);
  };

  const [editProduct,{isLoading}] = useEditProductMutation()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true)
    const formData = new FormData();
    formData.append('productId', product._id);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('bestSeller', bestSeller);
    formData.append('showHero', showHero);
    formData.append('images', JSON.stringify(images));

    //console.log('Submitting updated product:', updatedProduct);
    try {
      const apiRes = await editProduct(formData).unwrap()
      console.log("apiRes", apiRes )
      toast.success("Editing successful!")
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);

    } catch (error) {
      toast.success(error.message)
      console.log("Error", error)
    }finally{
      console.log("Done!")
      setShowLoader(false)
    }

    // Here you would send updatedProduct to your backend (PUT / PATCH)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      { showLoader && <Loader />}
      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block mb-1 font-semibold">Images</label>
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((img, index) => (
            <div key={img.public_id} className="relative">
              <img src={img.url} alt="Product Image" className="w-32 h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
      </div>


      {/* Price */}
      <div>
        <label className="block mb-1 font-semibold">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1 font-semibold">Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      {/* Best Seller */}
      <div className="flex items-center gap-2">
        <input
          id="bestseller"
          type="checkbox"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          className="w-5 h-5 bestSeller"
        />

        <label  htmlFor="bestseller" className="block font-medium ">
            <Image className="normal" src={Checkbox} alt="icon" width={32} height={32} />
            <Image className="checked" src={CheckboxChecked} alt="icon" width={32} height={32} />
            Best Seller?
          </label>

      </div>


      <div className="flex items-center gap-2">
        <input
          id="showHero"
          type="checkbox"
          checked={showHero}
          onChange={(e) => setShowHero(e.target.checked)}
          className="w-5 h-5 bestSeller"
        />

        <label  htmlFor="showHero" className="block font-medium ">
            <Image className="normal" src={Checkbox} alt="icon" width={32} height={32} />
            <Image className="checked" src={CheckboxChecked} alt="icon" width={32} height={32} />
            Show on hero slider?
          </label>

      </div>



      {/* Submit Button */}
      <button
        type="submit"
        className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer"
      >
        Update Product
      </button>
    </form>
  );
}
