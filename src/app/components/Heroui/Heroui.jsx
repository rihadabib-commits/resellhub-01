"use client";

import React from 'react';
import Link from 'next/link';
import { BadgeCheck, Zap } from 'lucide-react';

const Heroui = () => {
    return (
        // ১. মূল র‍্যাপার সেকশন যা পুরো ব্যাকগ্রাউন্ড নিয়ন্ত্রণ করবে
        <section className="w-full bg-[#f8faff] flex flex-col justify-between pt-12 md:pt-16 overflow-hidden">
            
            {/* ২. হিরো কন্টেন্ট কন্টেইনার (এটি মাঝখানে থাকবে এবং ডানে-বামে প্যাডিং পাবে) */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 pb-16">
                
                {/* বাম পাশের টেক্সট সেকশন */}
                <div className="flex flex-col items-start gap-6">
                    
                    {/* ট্রাস্ট ব্যাজ - (১ম এন্ট্রান্স) */}
                    <div className="inline-flex items-center gap-1.5 bg-[#0052cc] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-sm
                        animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                        <BadgeCheck className="h-3.5 w-3.5 animate-bounce" />
                        Trusted by 500k+ collectors
                    </div>

                    {/* মেইন হেডিং - (২য় এন্ট্রান্স উইথ স্ট্যাগার) */}
                    <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.15] tracking-tight
                        animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
                        The Luxury of <br />
                        <span className="text-[#0052cc] relative inline-block">
                            Second Chances.
                            <span className="absolute bottom-1 left-0 w-full h-[4px] bg-blue-200/60 rounded-full animate-in scale-x-in duration-1000 delay-500 origin-left"></span>
                        </span>
                    </h1>

                    {/* সাবটেক্সট/ডিসক্রিপশন - (৩য় এন্ট্রান্স) */}
                    <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed
                        animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
                        Experience the boutique marketplace for premium pre-owned electronics, 
                        fashion, and collectibles. Curated quality, guaranteed authenticity.
                    </p>

                    {/* কল-টু-অ্যাকশন বাটনসমূহ - (৪র্থ এন্ট্রান্স এবং মাইক্রো-ইন্টারঅ্যাকশন) */}
                    <div className="flex items-center gap-4 w-full sm:w-auto mt-2
                        animate-in fade-in slide-in-from-bottom-6 duration-700 delay-450 fill-mode-both">
                        <Link 
                            href="#" 
                            className="bg-[#0052cc] hover:bg-[#0043b3] text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center flex-1 sm:flex-initial"
                        >
                            Explore Catalog
                        </Link>
                        <Link 
                            href="#" 
                            className="bg-white hover:bg-gray-50 text-[#0052cc] border border-[#0052cc]/40 hover:border-[#0052cc] text-sm font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center flex-1 sm:flex-initial"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* ডান পাশের ইমেজ কার্ড সেকশন */}
                <div className="relative flex justify-center md:justify-end">
                    
                    {/* "Sold in 4h" ফ্লোটিং ব্যাজ - (আলাদা রিদমে ভেসে উঠবে এবং মৃদু ভাসমান থাকবে) */}
                    <div className="absolute -top-6 right-0 md:right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex items-start gap-2.5 z-20
                        animate-in fade-in zoom-in-75 duration-700 delay-600 fill-mode-both">
                        <div className="bg-blue-50 p-1.5 rounded-lg text-[#0052cc] animate-pulse">
                            <Zap className="h-4 w-4 fill-current" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900">Sold in 4h</span>
                            <span className="text-[10px] text-gray-400 font-medium mt-0.5">Market average: 2 days</span>
                        </div>
                    </div>

                    {/* মেইন ফিচার্ড প্রোডাক্ট কার্ড - (স্মুথ এন্ট্রান্স, হভার গ্লো এবং ইমেজ জুম) */}
                    <div className="bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 max-w-[440px] w-full group cursor-pointer
                        hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,82,204,0.08)] hover:border-blue-100
                        animate-in fade-in slide-in-from-right-12 duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) fill-mode-both
                        transition-all duration-500">
                        
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200">
                            <img 
                                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" 
                                alt="Featured Listing - Camera"
                                className="h-full w-full object-cover mixed-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        
                        <div className="flex items-end justify-between mt-4 px-1">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider group-hover:text-[#0052cc] transition-colors duration-300">Featured Listing</span>
                                <h3 className="text-sm font-bold text-gray-800 group-hover:text-gray-950 transition-colors duration-300">Z-Optics Alpha III</h3>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-extrabold text-[#0052cc] group-hover:scale-105 transition-transform duration-300 origin-right">$1,299</span>
                                <span className="text-[11px] text-gray-400 line-through font-medium">$1,850</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* ৩. স্ট্যাটস বার কন্টেইনার - (সফট স্ট্যাগারড পপ-আপ ইফেক্ট) */}
            <div className="w-full bg-[#f0f5ff] border-t border-blue-50/50 py-7
                animate-in fade-in slide-in-from-top-6 duration-700 delay-500 fill-mode-both">
                {/* ভেতরের সংখ্যাগুলো যেন আবার লাইনে থাকে তার জন্য max-w কন্টেইনার */}
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6 md:px-16">
                    
                    <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                        <span className="text-lg md:text-xl font-bold text-[#0052cc]">500k+</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">Verified Collectors</span>
                    </div>

                    <div className="flex flex-col items-center justify-center border-l border-gray-200/60 max-sm:border-none hover:scale-105 transition-transform duration-300">
                        <span className="text-lg md:text-xl font-bold text-[#0052cc]">$10M+</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">Trading Volume</span>
                    </div>

                    <div className="flex flex-col items-center justify-center md:border-l border-gray-200/60 hover:scale-105 transition-transform duration-300">
                        <span className="text-lg md:text-xl font-bold text-[#0052cc]">0%</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">Fake Items Found</span>
                    </div>

                    <div className="flex flex-col items-center justify-center border-l border-gray-200/60 hover:scale-105 transition-transform duration-300">
                        <span className="text-lg md:text-xl font-bold text-[#0052cc]">4.9/5</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">User Rating</span>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Heroui;