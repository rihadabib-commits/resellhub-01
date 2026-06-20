"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const products = [
    {
        id: 1,
        title: "Ergo-Vertical Wireless Mouse",
        category: "TECH",
        price: "$85.00",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80"
    },
    {
        id: 2,
        title: "Studio Pro ANC Headphones",
        category: "AUDIO",
        price: "$210.00",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        id: 3,
        title: "27\" 4K Precision Display",
        category: "STUDIO",
        price: "$320.00",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
    },
    {
        id: 4,
        title: "2TB Ultra-Speed Portable SSD",
        category: "STORAGE",
        price: "$145.00",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=500&q=80" 
    }
];

const Cards = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/50 overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6 dynamic-fade-in">
                <h2 className="text-lg font-semibold text-[#1e293b]">Related Products</h2>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 active:scale-95 transition-all shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div 
                        key={product.id} 
                        className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col group cursor-pointer 
                        /* 1. হভার অ্যানিমেশন (কাডটি ওপরে উঠবে ও শ্যাডো ডিপ হবে) */
                        hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-blue-100
                        /* 2. এন্ট্রান্স অ্যানিমেশন (পেজ লোড হওয়ার সময় এক এক করে সুন্দরভাবে আসবে) */
                        animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both
                        /* 3. ট্রানজিশন ইফেক্ট */
                        transition-all cubic-bezier(0.4, 0, 0.2, 1) duration-300"
                        style={{ animationDelay: `${index * 100}ms` }} // প্রতিটা কার্ড পর পর আসবে (Stagger effect)
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
                            <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out block"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            {/* Category Badge */}
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[11px] font-bold tracking-wider text-gray-500 px-2.5 py-1 rounded-md shadow-sm z-10 transition-colors group-hover:bg-blue-600 group-hover:text-white duration-300">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Content */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-[15px] font-semibold text-[#1e293b] leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {product.title}
                            </h3>
                            
                            <div className="flex justify-between items-center mt-auto pt-2">
                                <span className="text-[16px] font-bold text-[#1d4ed8]">
                                    {product.price}
                                </span>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg group-hover:bg-amber-100 transition-colors duration-300">
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-[12px] font-bold text-amber-700">
                                        {product.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;