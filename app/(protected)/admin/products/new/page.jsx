"use client";
import { useState } from "react";
import uploadImage from "@/components/admin/UploadImage";
import Image from "next/image";

export default function AddProduct() {
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    image: null,
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if(name !== 'image'){
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }else{
      const imgApiRes =  await uploadImage(files[0])
      console.log("imgApiRes",imgApiRes)
      setData((prev) => ({
        ...prev,
        image: imgApiRes.secure_url
      }))
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    // const data ={
    //   title: data.title,
    //   price: data.price,
    //   description: data.description,
    //   stock: data.stock,
    //   image: data.image,
    // }

    
    console.log("Data",data)

    /*
    try {
      // Replace this with your actual API
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("✅ Product Created:", result);
      alert("Product created successfully!");

      // Optional: reset form
      setFormData({
        title: "",
        price: "",
        description: "",
        stock: "",
        image: null,
      });
    } catch (err) {
      console.error("❌ Failed to create product", err);
      alert("Something went wrong!");
    }

    */
  };

  return (
    <div className="new_product p-6 bg-white rounded shadow">
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
          />
          {data.image? <Image src={data.image} alt="Product Image" width={50} height={50} /> : ''}
          
        </div>
        
        {/* Title */}
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

        {/* Price */}
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

        {/* Description */}
        <div className="input_group">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        {/* Stock */}
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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
