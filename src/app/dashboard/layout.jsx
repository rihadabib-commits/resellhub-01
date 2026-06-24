"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { Loader2, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7fe] gap-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const userRole = session.user.role || "buyer"; 

  const menuItems = {
    buyer: [
      { name: "Dashboard", path: "/dashboard/buyer/overview", icon: "📊" },
      { name: "Orders", path: "/dashboard/buyer/my-orders", icon: "📦" },
      { name: "Wishlist", path: "/dashboard/buyer/wishlist", icon: "❤️" },
      { name: "Payments", path: "/dashboard/buyer/payment-history", icon: "💳" },
      { name: "Profile", path: "/dashboard/buyer/profile-management", icon: "👤" },
    ],
    seller: [
      { name: "Dashboard", path: "/dashboard/seller/overview", icon: "📈" },
      { name: "Analytics", path: "/dashboard/seller/analytics", icon: "📉" },
      { name: "Add Product", path: "/dashboard/seller/add-product", icon: "➕" },
      { name: "My Products", path: "/dashboard/seller/my-products", icon: "🛍️" },
      { name: "Orders", path: "/dashboard/seller/manage-orders", icon: "🚚" },
    ],
   admin: [
      { name: "Dashboard", path: "/dashboard/admin/overview", icon: "🖥️" },
      { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: "👥" },
      { name: "All Products", path: "/dashboard/admin/manage-products", icon: "📦" },
      { name: "All Orders", path: "/dashboard/admin/manage-orders", icon: "📜" },
      { name: "Reports", path: "/dashboard/admin/platform-analytics", icon: "📊" },
    ]
  };

  const currentMenu = menuItems[userRole] || [];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">R</div>
        <span className="font-extrabold text-lg text-[#1b2559] uppercase">ReSell Hub</span>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {currentMenu.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={index}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50 hover:text-[#1b2559]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 bg-[#f4f7fe] p-3 rounded-xl">
          {session.user.image ? (
            <img src={session.user.image} className="w-9 h-9 rounded-full object-cover" alt="User" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600" />
          )}
          <div className="truncate">
            <p className="text-sm font-bold text-[#1b2559] truncate">{session.user.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{userRole} Portal</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f7fe] w-full">
      {/* ডেস্কটপ সাইডবার */}
      <aside className="w-64 bg-white hidden md:block border-r border-slate-100 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* মোবাইল সাইডবার */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-64 bg-white h-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-slate-600"/></button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* মেইন কন্টেন্ট */}
      <main className="flex-1 w-full overflow-hidden">
        <header className="md:hidden p-4 bg-white border-b flex items-center justify-between">
          <span className="font-bold text-[#1b2559]">ReSell Hub</span>
          <button onClick={() => setIsMobileMenuOpen(true)}><Menu /></button>
        </header>
        <div className="p-5 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}