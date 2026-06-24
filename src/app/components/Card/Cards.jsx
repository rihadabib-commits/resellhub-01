"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/50 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1e293b]">
          Featured Products
          <span className="ml-2 text-sm font-normal text-gray-400">({products.length})</span>
        </h2>
        <Link href="/products" className="text-sm font-semibold text-blue-600 hover:underline">
          View All →
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No products yet</p>
          <p className="text-sm mt-1">Add products to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-300 no-underline"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={product.images?.[0] || product.image || "https://via.placeholder.com/400x300"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[11px] font-bold tracking-wider text-gray-500 px-2.5 py-1 rounded-md shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {product.category}
                </span>
                <span className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: product.condition === "Like New" ? "#f0fdf4" : product.condition === "Refurbished" ? "#fffbeb" : "#f1f5f9",
                    color: product.condition === "Like New" ? "#16a34a" : product.condition === "Refurbished" ? "#d97706" : "#64748b"
                  }}>
                  {product.condition}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-[15px] font-semibold text-[#1e293b] leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-[12px] text-gray-400 mb-2 truncate">
                  {product.sellerInfo?.name || "Seller"}
                </p>

                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-[16px] font-bold text-[#1d4ed8]">
                    ৳{product.price?.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: product.status === "available" ? "#f0fdf4" : "#fef2f2",
                      color: product.status === "available" ? "#16a34a" : "#dc2626"
                    }}>
                    {product.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;