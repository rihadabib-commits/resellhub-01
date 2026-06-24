'use client';
import toast from "react-hot-toast";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const { data: session } = authClient.useSession();

  const IMGBB_API_KEY = "01e75ae5434a8bdd918057adbe8b1512";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST", body: data,
      });
      const result = await response.json();
      if (result.success) setImageURL(result.data.display_url);
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   if (!imageURL) {
  toast.error("Please upload an image first!");
  return;
}

    setLoading(true);
    const form = e.target;

    // Better Auth থেকে token নাও
   const { data: sessionData } = await authClient.getSession();
const token = sessionData?.session?.token;
    const productData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      condition: form.condition.value,
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value),
      images: [imageURL],
      status: 'available',
      sellerInfo: {
        userId: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
      },
      createdAt: new Date()
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        toast.success("Product published successfully!");
        router.push('/dashboard/seller/my-products');
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to publish the product.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#1b2559] mb-6">Create New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400">
          <input type="file" onChange={handleImageUpload} className="hidden" id="img" />
          <label htmlFor="img" className="flex flex-col items-center gap-2 cursor-pointer">
            {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
            <span className="text-sm">{imageURL ? "✅ Image Uploaded!" : "Click to upload image"}</span>
          </label>
        </div>

        <input name="title" required className="w-full border rounded-xl p-3" placeholder="Product Title" />
        <textarea name="description" required className="w-full border rounded-xl p-3" placeholder="Product Description" />

        <div className="grid grid-cols-2 gap-4">
          <select name="category" className="w-full border rounded-xl p-3">
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Fashion">Fashion</option>
            <option value="Mobile Phones">Mobile Phones</option>
          </select>
          <select name="condition" className="w-full border rounded-xl p-3">
            <option value="Used">Used</option>
            <option value="Like New">Like New</option>
            <option value="Refurbished">Refurbished</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" required className="w-full border rounded-xl p-3" placeholder="Price $" />
          <input name="stock" type="number" required className="w-full border rounded-xl p-3" placeholder="Stock" />
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          {loading ? 'Publishing...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
}