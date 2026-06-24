"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      footer: "Registered accounts",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      footer: "Active listings",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
      footer: "All time orders",
    },
  ];

  const recentActivity = [
    { label: "New user registered", time: "just now", dot: "bg-green-400" },
    { label: "Product pending approval", time: "2m ago", dot: "bg-amber-400" },
    { label: "New order placed", time: "5m ago", dot: "bg-blue-400" },
    { label: "Order delivered", time: "12m ago", dot: "bg-green-400" },
  ];

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1b2559]">Platform Control Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">System monitoring indicators across nodes.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map(({ title, value, icon: Icon, iconBg, iconColor, footer }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className={iconColor} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp size={10} /> Live
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
              <h3 className="text-3xl font-black text-[#1b2559] mt-0.5 leading-none">
                {value.toLocaleString()}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {footer}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
          Recent Activity
        </p>
        <div>
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-b-0">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
              <span className="flex-1 text-sm text-[#1b2559]">{item.label}</span>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}