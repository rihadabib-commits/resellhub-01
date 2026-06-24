'use client';
import React, { useState, useEffect } from 'react';

export default function BuyerOverview() {
  const [stats, setStats] = useState({ totalOrders: 0, wishlistCount: 0, recentPurchases: 0 });
  const [loading, setLoading] = useState(true);
  const buyerEmail = 'rakib.hasan@gmail.com'; // এখানে তোমার ডাইনামিক ইমেইল সেট করো

  useEffect(() => {
    // এখানে আমরা ব্যাকএন্ড থেকে ডাটা আনছি
    Promise.all([
      fetch(`https://reselhubserver-02.vercel.app/my-orders/${buyerEmail}`).then(res => res.json()),
      fetch(`https://reselhubserver-02.vercel.app/wishlist/${buyerEmail}`).then(res => res.json()),
      fetch(`https://reselhubserver-02.vercel.app/payments/${buyerEmail}`).then(res => res.json())
    ])
    .then(([orders, wishlist, payments]) => {
      setStats({
        totalOrders: orders.length,
        wishlistCount: wishlist.length,
        recentPurchases: payments.length
      });
      setLoading(false);
    })
    .catch(err => {
      console.error("Dashboard Stats Error:", err);
      setLoading(false);
    });
  }, [buyerEmail]);

  if (loading) return <div className="text-slate-400 text-xs">🔄 loading....</div>;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1b2559]">Buyer Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">A summary of your personal marketplace activity.।</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-2xl">🛍️</span>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-3">Total Orders</p>
          <h3 className="text-2xl font-black text-[#1b2559] mt-1">{stats.totalOrders}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-2xl">❤️</span>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-3">Wishlist Count</p>
          <h3 className="text-2xl font-black text-[#1b2559] mt-1">{stats.wishlistCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-2xl">🕒</span>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-3">Recent Purchases</p>
          <h3 className="text-2xl font-black text-[#1b2559] mt-1">{stats.recentPurchases}</h3>
        </div>
      </div>
    </div>
  );
}