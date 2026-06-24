"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Star, Eye } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Better Auth Session Hook
  const { data: session } = authClient.useSession();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle Product Details Click
  const handleViewDetails = (e, productId) => {
    e.preventDefault();
    
    // লগইন চেক
    if (!session?.user) {
      router.push("/regestation"); 
      return;
    }

    // লগইন থাকলে ডিটেইলস পেজে নিয়ে যাবে
    router.push(`/product/${productId}`);
  };

  // Dynamic Filters
  const categories = useMemo(() => [...new Set(products.map((item) => item.category).filter(Boolean))], [products]);
  const conditions = useMemo(() => [...new Set(products.map((item) => item.condition).filter(Boolean))], [products]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const conditionMatch = !selectedCondition || product.condition === selectedCondition;
    const priceMatch = Number(product.price) <= maxPrice;
    return categoryMatch && conditionMatch && priceMatch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 max-w-7xl mx-auto px-4 py-8 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white rounded-3xl p-5 border border-gray-100 h-fit">
          <h3 className="font-bold mb-3">Categories</h3>
          <div className="space-y-3">
            <label className="flex gap-2 items-center cursor-pointer">
              <input type="radio" name="category" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} />
              All
            </label>
            {categories.map((category) => (
              <label key={category} className="flex gap-2 items-center cursor-pointer">
                <input type="radio" name="category" checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} />
                {category}
              </label>
            ))}
          </div>

          <hr className="my-5" />

          <div className="mb-6">
            <h3 className="font-bold mb-3">Maximum Price: ৳ {maxPrice.toLocaleString()}</h3>
            <input type="range" min="0" max="100000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <hr className="my-5" />

          <h3 className="font-bold mb-3">Condition</h3>
          <div className="grid gap-2">
            <button onClick={() => setSelectedCondition("")} className={`rounded-xl py-2 ${selectedCondition === "" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>All</button>
            {conditions.map((condition) => (
              <button key={condition} onClick={() => setSelectedCondition(condition)} className={`rounded-xl py-2 ${selectedCondition === condition ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                {condition}
              </button>
            ))}
          </div>

          <button onClick={() => { setSelectedCategory(""); setSelectedCondition(""); setMaxPrice(100000); }} className="w-full bg-blue-50 mt-5 hover:bg-blue-100 rounded-xl py-3 font-bold text-blue-600">
            Reset Filters
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products ({filteredProducts.length})</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border"><ArrowLeft /></button>
              <button className="p-2 rounded-full border"><ArrowRight /></button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 font-bold text-xl">No Products Found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img src={product.images?.[0] || product.image || "https://via.placeholder.com/600x400"} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg text-xs font-bold">{product.category}</span>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.sellerInfo?.name || "Unknown Seller"}</p>
                    <div className="flex justify-between items-center my-4">
                      <span className="text-blue-700 font-bold text-xl">৳{Number(product.price).toLocaleString()}</span>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{product.rating || "5.0"}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleViewDetails(e, product._id)}
                      className="mt-auto flex justify-center items-center gap-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-xl py-3 font-bold transition"
                    >
                      <Eye className="w-4 h-4" />
                      Product Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;