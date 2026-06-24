'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Loader2,
} from 'lucide-react';

export default function SellerOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/stats`
        );

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen p-6 rounded-xl">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Seller Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back! Here's your sales overview.
        </p>
      </div>

      {/* Top Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={22} />}
          iconColor="bg-green-100 text-green-600"
        />

        <StatCard
          title="Total Orders"
          value={stats.totalSales}
          icon={<ShoppingCart size={22} />}
          iconColor="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Average Order"
          value={`$${(
            stats.totalRevenue /
            (stats.totalSales || 1)
          ).toFixed(0)}`}
          icon={<TrendingUp size={22} />}
          iconColor="bg-pink-100 text-pink-600"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<Package size={22} />}
          iconColor="bg-orange-100 text-orange-600"
        />

      </div>

      {/* Bottom Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <SecondaryCard
          title="My Products"
          value={stats.totalProducts}
          icon={<Package size={22} />}
          iconColor="text-blue-600"
        />

        <SecondaryCard
          title="Orders"
          value={stats.totalSales}
          icon={<ShoppingCart size={22} />}
          iconColor="text-purple-600"
          badge
        />

        <SecondaryCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={22} />}
          iconColor="text-green-600"
        />

        <SecondaryCard
          title="Active Listings"
          value={stats.totalProducts}
          icon={<TrendingUp size={22} />}
          iconColor="text-pink-600"
        />

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 p-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-3">
            {value}
          </h2>
        </div>

        <div className={`p-4 rounded-xl ${iconColor}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

function SecondaryCard({
  title,
  value,
  icon,
  iconColor,
  badge,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 p-5 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <div className={`bg-gray-100 p-3 rounded-xl ${iconColor}`}>
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-800">
            {value}
          </h3>
        </div>

      </div>

      {badge && (
        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
      )}

    </div>
  );
}