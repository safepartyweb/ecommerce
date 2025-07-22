'use client';

import { useState } from 'react';
import UploadSingleImage from '../UploadSingleImage';
import { useEditProductMutation } from '@/lib/api/productApi';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Checkbox from '@/images/checkbox-black.svg';
import CheckboxChecked from '@/images/checkbox-black-checked.svg';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/lib/api/categoryApi';

export default function ProductEdit({ product }) {

  console.log("Product from ProductEdit component:", product)

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [images, setImages] = useState(product.images || []);
  const [price, setPrice] = useState(product.price || '');
  const [stock, setStock] = useState(product.stock || '');
  const [unit, setUnit] = useState(product.unit || '');
  const [weight, setWeight] = useState(product.weight || '');
  const [category, setCategory] = useState(product.category);
  const [bestSeller, setBestSeller] = useState(product.bestSeller);
  const [showHero, setShowHero] = useState(product.showHero);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [isVariable, setIsVariable] = useState(product.isVariable || false);
  const [variations, setVariations] = useState(product.variations || []);
  const [showLoader, setShowLoader] = useState(false);

  const router = useRouter();
  const [editProduct] = useEditProductMutation();
  const { data, isLoading: catLoading } = useGetCategoriesQuery();

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await UploadSingleImage(file);
    setImages([...images, { url: res.secure_url, public_id: res.public_id }]);
  };

  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([...variations, { label: '', unit: '', price: '', stock: '' }]);
  };

  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const formData = new FormData();
    formData.append('productId', product._id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('images', JSON.stringify(images));
    formData.append('category', category);
    formData.append('bestSeller', bestSeller);
    formData.append('isFeatured', isFeatured);
    formData.append('showHero', showHero);
    formData.append('isVariable', isVariable);

    if (isVariable) {
      formData.append('variations', JSON.stringify(variations));
    } else {
      formData.append('price', price);
      formData.append('stock', stock);
      if (weight) formData.append('weight', weight);
      if (unit) formData.append('unit', unit);
    }

    try {
      await editProduct(formData).unwrap();
      toast.success('Product updated successfully!');
      setTimeout(() => {
        // router.push('/admin/products');
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setShowLoader(false);
    }
  };

  if (catLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showLoader && <Loader />}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="border w-full p-2 rounded" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Images</label>
        <div className="flex flex-wrap gap-3 mb-2">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img.url} alt="Product" className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input type="file" onChange={handleImageUpload} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border w-full p-2 rounded">
          <option value="">Select One</option>
          {data.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={isVariable} onChange={(e) => setIsVariable(e.target.checked)} />
        <label>Variable Product?</label>
      </div>

      {isVariable ? (
        <div className="space-y-3">
          <label className="block font-semibold">Product Variations</label>
          {variations.map((v, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Label"
                value={v.label}
                onChange={(e) => handleVariationChange(i, 'label', e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                placeholder="Unit"
                value={v.unit}
                onChange={(e) => handleVariationChange(i, 'unit', e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => handleVariationChange(i, 'price', e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => handleVariationChange(i, 'stock', e.target.value)}
                className="border p-1"
              />
              <button
                type="button"
                onClick={() => removeVariation(i)}
                className="text-red-500 text-sm mt-1 col-span-full"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addVariation} className="bg-black text-white px-3 py-1 rounded">
            + Add Variation
          </button>
        </div>
      ) : (
        <>
          <div>
            <label className="block font-semibold">Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="border w-full p-2 rounded" />
          </div>
          <div>
            <label className="block font-semibold">Stock</label>
            <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" className="border w-full p-2 rounded" />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block font-semibold">Weight</label>
              <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block font-semibold">Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 rounded w-full">
                <option value="">Select One</option>
                <option value="Grams">Grams</option>
                <option value="Oz">Oz</option>
                <option value="Pounds">Pounds</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block font-semibold">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border w-full p-2 rounded" />
      </div>

      {/* Checkboxes */}
      {[['Best Seller', bestSeller, setBestSeller, 'bestseller'], ['Featured', isFeatured, setIsFeatured, 'isFeatured']].map(
        ([labelText, value, setter, id]) => (
          <div className="flex items-center gap-2" key={id}>
            <input id={id} type="checkbox" checked={value} onChange={(e) => setter(e.target.checked)} />
            <label htmlFor={id}>{labelText}?</label>
          </div>
        )
      )}

      <button type="submit" className="bg-black text-white px-6 py-3 rounded font-semibold border hover:bg-white hover:text-black cursor-pointer">
        Update Product
      </button>
    </form>
  );
}
