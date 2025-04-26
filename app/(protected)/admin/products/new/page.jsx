"use client";
import { useState } from "react";
import uploadImage from "@/components/admin/UploadImage";
import Image from "next/image";
import { useCreateProductMutation } from "@/lib/api/productApi";
import BlackButton from "@/components/BlackButton";
import Checkbox from '@/images/checkbox-black.svg'
import CheckboxChecked from '@/images/checkbox-black-checked.svg'

export default function AddProduct() {
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    images: [],
    bestSeller:false
  });

  const [createProduct, {isLoading}] = useCreateProductMutation();

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if(name !== 'image'){
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }else{
      const files = Array.from(e.target.files);
      const imgApiRes =  await uploadImage(files)
      console.log("imgApiRes",imgApiRes)
      
      
      setData((prev) => ({
        ...prev,
        images: imgApiRes
      }))    
    }
  };

  const bestSellerHandler = (e) =>{
    const isChecked = e.target.checked;
    // console.log("Best Seller:", isChecked);
    setData((prev) => ({
      ...prev,
      bestSeller: isChecked
    }))  
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('stock', data.stock);
    formData.append('bestSeller', data.bestSeller);
    formData.append('images', JSON.stringify(data.images));


    const apiRes =  await createProduct(formData).unwrap();
    console.log("apiRes",apiRes)

  };

  return (
    <div className="new_product p-0 md:p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="input_group">
          <label className="block font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            accept="image/*"
            multiple
          />
          {data.image? <Image src={data.image} alt="Product Image" width={50} height={50} /> : ''}
          
        </div>
        

        <div className="input_group">
          <label className="block font-medium">Product Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>


        <div className="input_group">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>


        <div className="input_group">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div className="input_group flex gap-2 items-center">
          <input onChange={bestSellerHandler} id="bestseller" name="bestseller" type="checkbox"  className="bestSeller" />
          <label  htmlFor="bestseller" className="block font-medium ">
            <Image className="normal" src={Checkbox} alt="icon" width={32} height={32} />
            <Image className="checked" src={CheckboxChecked} alt="icon" width={32} height={32} />
            Best Seller?
          </label>
        </div>


        <div className="input_group">
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer">Add Product</button>

      </form>
    </div>
  );
}
