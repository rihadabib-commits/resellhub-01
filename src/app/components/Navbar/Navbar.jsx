"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { authClient } from "@/lib/auth-client"; 
import { ThemeToggle } from "./ThemeToggle";
import { Home, LayoutGrid, Folder, Menu, X, LogIn, UserPlus, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনুর জন্য
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // প্রোফাইল ড্রপডাউনের জন্য
  const profileDropdownRef = useRef(null);

  // 🔐 Better Auth থেকে সেশন ও ইউজার ডাটা আনা হচ্ছে
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user; 

  // 🔥 ইউজারের রোল অনুযায়ী ডাইনামিক ড্যাশবোর্ড পাথ জেনারেট করা (ডিফল্ট: buyer)
  const userRole = user?.role || "buyer";
  const dashboardPath = `/dashboard/${userRole}/overview`;

  // প্রোফাইল ড্রপডাউন বক্সের বাইরে ক্লিক করলে যাতে মেনুটা বন্ধ হয়ে যায়
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/"; // লগআউট হলে হোম পেজে রিফ্রেশ করবে
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#f8faff] dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 w-full relative z-50 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 max-w-7xl mx-auto">
        
        {/* ১. লোগো সেকশন */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-tl-full rounded-tr-full rounded-bl-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-sm flex-shrink-0">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-extrabold tracking-wider text-[#0052cc] dark:text-blue-400 font-sans uppercase whitespace-nowrap">
              ReSell Hub
            </span>
            <span className="text-[11px] font-medium text-gray-500 dark:text-slate-400 -mt-1">
              Marketplace
            </span>
          </div>
        </Link>

        {/* ২. মিডেল সেকশন: ডেক্সটপ নেভিগেশন লিংকসমূহ */}
        <div className="hidden lg:flex items-center gap-8">
          <Link 
            href="/" 
            className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${pathname === "/" ? "text-[#0052cc] dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"}`}
          >
            <Home className="h-4 w-4 text-gray-400 dark:text-slate-500" />
            Home
          </Link>

          <Link 
            href="/product" 
            className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${pathname === "/product" ? "text-[#0052cc] dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"}`}
          >
            <LayoutGrid className="h-4 w-4 text-gray-400 dark:text-slate-500" />
            Product
          </Link>

          <Link 
            href="/product" 
            className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${pathname === "/categories" ? "text-[#0052cc] dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"}`}
          >
            <Folder className="h-4 w-4 text-gray-400 dark:text-slate-500" />
            Categories
          </Link>

          {/* 🌟 ডাইনামিক ড্যাশবোর্ড লিংক (ডেক্সটপ) */}
          {user && (
            <Link 
              href={dashboardPath} 
              className={`relative text-[14px] font-medium transition-colors pb-1 flex items-center gap-1 ${pathname.startsWith("/dashboard") ? "text-[#0052cc] dark:text-blue-400 font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#0052cc] dark:after:bg-blue-400" : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              <LayoutDashboard className="h-4 w-4 text-gray-400 dark:text-slate-500" />
              Dashboard
            </Link>
          )}
        </div>

        {/* ৩. ডান পাশের সেকশন: ডেক্সটপ থিম টগল, লগইন/রেজিস্ট্রেশন বা প্রোফাইল */}
        <div className="hidden lg:flex items-center gap-5">
          
          {/* 💡 ডেক্সটপ থিম টগল বাটন */}
          <ThemeToggle />

          {isPending ? (
            <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-blue-600 dark:border-blue-400 animate-spin" />
          ) : !user ? (
            /* 🔴 ইউজার লগইন না থাকলে এটি দেখাবে */
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className="text-gray-700 dark:text-slate-300 hover:text-[#0052cc] dark:hover:text-blue-400 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1"
              >
                <LogIn className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                Login
              </Link>
              <Link 
                href="/regestation"
                className="bg-[#0052cc] dark:bg-blue-600 hover:bg-[#0043b3] dark:hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1 active:scale-[0.98]"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          ) : (
            /* 🟢 ইউজার লগইন থাকলে: প্রোফাইল পিকচার ড্রপডাউন */
            <div className="relative" ref={profileDropdownRef}>
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 py-1 px-1.5 rounded-full shadow-sm cursor-pointer select-none hover:border-gray-200 dark:hover:border-slate-600 transition-colors"
              >
                <div className="relative h-9 w-9 flex-shrink-0">
                  <img
                    src={user.image || "https://www.svgrepo.com/show/452030/avatar-default.svg"} 
                    alt="User Profile"
                    className="h-full w-full rounded-full object-cover border border-gray-100 dark:border-slate-700"
                  />
                  <span className="absolute -top-0.5 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-800" />
                </div>

                <ChevronDown className={`h-4 w-4 text-gray-400 dark:text-slate-500 pr-0.5 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* প্রোফাইল ড্রপডাউন বক্স */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href={dashboardPath}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                    My Portal
                  </Link>
                  <hr className="border-gray-100 dark:border-slate-700" />
                  <button 
                    onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border-none cursor-pointer text-left bg-transparent"
                  >
                    <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ৪. মোবাইল হ্যামবার্গার ও থিম সেকশন */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* 💡 মোবাইলের জন্যও এখানে সুন্দর একটা থিম টগল রাখলাম */}
          <ThemeToggle />
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white p-2 focus:outline-none transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* ৫. মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 absolute top-full left-0 w-full px-6 py-4 shadow-md flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 text-[15px] font-medium py-1 ${pathname === "/" ? "text-[#0052cc] dark:text-blue-400 font-bold" : "text-gray-700 dark:text-slate-300"}`}>
            <Home className="h-5 w-5 text-gray-400 dark:text-slate-500" /> Home
          </Link>

          <Link href="/product" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 text-[15px] font-medium py-1 ${pathname === "/product" ? "text-[#0052cc] dark:text-blue-400 font-bold" : "text-gray-700 dark:text-slate-300"}`}>
            <LayoutGrid className="h-5 w-5 text-gray-400 dark:text-slate-500" /> Products
          </Link>

          <Link href="/categories" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 text-[15px] font-medium py-1 ${pathname === "/categories" ? "text-[#0052cc] dark:text-blue-400 font-bold" : "text-gray-700 dark:text-slate-300"}`}>
            <Folder className="h-5 w-5 text-gray-400 dark:text-slate-500" /> Categories
          </Link>

          {/* 🌟 ডাইনামিক ড্যাশবোর্ড লিংক (মোবাইল) */}
          {user && (
            <Link href={dashboardPath} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 text-[15px] font-bold py-1 border-l-2 border-[#0052cc] dark:border-blue-400 pl-2 ${pathname.startsWith("/dashboard") ? "text-[#0052cc] dark:text-blue-400" : "text-gray-700 dark:text-slate-300"}`}>
              <LayoutDashboard className="h-5 w-5 text-gray-400 dark:text-slate-500" /> Dashboard ({userRole})
            </Link>
          )}

          <hr className="border-gray-100 dark:border-slate-800 my-1" />

          {/* মোবাইল প্রোফাইল ও লগআউট */}
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 py-1">
                <img src={user.image || "https://www.svgrepo.com/show/452030/avatar-default.svg"} alt="User Profile" className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-slate-700" />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-800 dark:text-slate-200">{user.name}</span>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 capitalize">{userRole} Account</span>
                </div>
              </div>
              <button 
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-semibold py-2.5 rounded-xl transition-colors text-center border border-red-100 dark:border-red-900/30 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm font-semibold py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-center flex items-center justify-center gap-1.5">
                <LogIn className="h-4 w-4 text-gray-400 dark:text-slate-500" /> Login 
              </Link>
              <Link href="/regestation" onClick={() => setIsOpen(false)} className="w-full bg-[#0052cc] dark:bg-blue-600 hover:bg-[#0043b3] dark:hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5">
                <UserPlus className="h-4 w-4" /> Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;