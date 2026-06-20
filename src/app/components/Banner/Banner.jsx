"use client";

import React from 'react';
import { Star } from 'lucide-react';

const Banner = () => {
    const reviewsData = [
        {
            id: 1,
            initials: "SC",
            name: "Sarah Connor",
            status: "Verified Purchase",
            time: "2 days ago",
            rating: 5,
            comment: `"Exactly as described. The keyboard is heavy, premium, and arrived in the original box. Julian was very responsive."`
        },
        {
            id: 2,
            initials: "MK",
            name: "Mark Kim",
            status: "Verified Purchase",
            time: "1 week ago",
            rating: 5,
            comment: `"Super fast shipping. Item was packed securely. ReSell Hub really makes second-hand feel like new retail."`
        },
        {
            id: 3,
            initials: "DR",
            name: "David Ross",
            status: "Verified Purchase",
            time: "2 weeks ago",
            rating: 5,
            comment: `"Premium experience from start to finish. The keyboard looks even better in person. Zero scratches."`
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-[#1a202c] overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Ratings & Reviews
                    </h2>
                    <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold tracking-tight animate-pulse">4.9</span>
                        <div className="flex flex-col">
                            {/* Stars */}
                            <div className="flex text-amber-400 gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">Based on 124 reviews</span>
                        </div>
                    </div>
                </div>
                
                {/* Write a review button */}
                <div>
                    <button className="text-blue-600 font-semibold hover:text-blue-800 text-sm sm:text-base relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300 py-1 transition-colors">
                        Write a review
                    </button>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {reviewsData.map((review, index) => (
                    <div 
                        key={review.id} 
                        className="border border-gray-100 rounded-2xl p-6 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.015)] flex flex-col justify-between cursor-pointer
                        /* 1. হভার অ্যানিমেশন (কার্ড সামান্য বড় হবে এবং ব্যাকগ্রাউন্ড হালকা গ্লো করবে) */
                        hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(37,99,235,0.06)] hover:border-blue-100/70
                        /* 2. এন্ট্রান্স অ্যানিমেশন (বাম থেকে ডানে সুন্দরভাবে স্লাইড হবে) */
                        animate-in fade-in slide-in-from-left-8 duration-600 fill-mode-both
                        /* 3. ট্রানজিশন স্মুথনেস */
                        transition-all cubic-bezier(0.4, 0, 0.2, 1) duration-300"
                        style={{ animationDelay: `${index * 150}ms` }} // একটার পর একটা কার্ড আসার জন্য ডেলি ইফেক্ট
                    >
                        <div>
                            {/* User Info Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {/* Avatar/Initials */}
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105 duration-300">
                                        {review.initials}
                                    </div>
                                    {/* Name & Status */}
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                                        <p className="text-xs text-gray-400">{review.status}</p>
                                    </div>
                                </div>
                                {/* Time */}
                                <span className="text-xs text-gray-400">{review.time}</span>
                            </div>

                            {/* Review Stars */}
                            <div className="flex text-amber-400 gap-0.5 mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-sm text-gray-600 italic leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;