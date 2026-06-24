import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        // এখানে px-8 md:px-16 সরিয়ে w-full করা হয়েছে যাতে ব্যাকগ্রাউন্ড পুরো স্ক্রিন জুড়ে পায়
        <footer className="w-full bg-[#e0ecfb] text-gray-700 py-12 border-t border-blue-100">
            
            {/* ডানে-বামের প্যাডিং ও কন্টেইনার সাইজ এখন এই মেইন ডিভ-এর ভেতর দেওয়া হয়েছে */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 px-8 md:px-16">
                
                {/* ১ম কলাম: ব্র্যান্ড লোগো এবং বিবরণ */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-[#0052cc] tracking-tight">
                        ReSell Hub
                    </h2>
                    <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed max-w-[220]">
                        The premium destination for verified second-hand high-end electronics and lifestyle gear.
                    </p>
                </div>

                {/* ২য় কলাম: Marketplace লিংকসমূহ */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Marketplace
                    </h3>
                    <ul className="flex flex-col gap-2 text-xs md:text-[13px] text-gray-600">
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Browse All</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Popular Deals</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Categories</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Sell an Item</Link></li>
                    </ul>
                </div>

                {/* ৩য় কলাম: Support লিংকসমূহ */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Support
                    </h3>
                    <ul className="flex flex-col gap-2 text-xs md:text-[13px] text-gray-600">
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-[#0052cc] transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* ৪র্র্থ কলাম: নিউজলেটার ফর্ম এবং কপিরাইট */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Join our newsletter
                    </h3>
                    
                    {/* ইনপুট এবং জয়েন বাটন */}
                    <div className="flex items-center gap-2 max-w-70 w-full">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="flex-1 bg-white text-xs md:text-sm text-gray-800 placeholder-gray-400 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-all"
                        />
                        <button className="bg-[#0052cc] hover:bg-[#0043b3] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer border-none">
                            Join
                        </button>
                    </div>

                    {/* কপিরাইট টেক্সট */}
                    <span className="text-[10px] text-gray-500 mt-2 font-medium">
                        &copy; 2026 ReSell Hub. All rights reserved.
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;