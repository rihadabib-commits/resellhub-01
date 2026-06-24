// 'use client';
// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { Loader2, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

// export default function SellerAnalytics() {
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/sales-trend`);
      
//       // কনটেন্ট টাইপ চেক করা যাতে HTML এরর পেজ রেন্ডার না হয়
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server returned HTML instead of JSON. Check your API route!");
//       }

//       const data = await response.json();
//       setSalesData(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching analytics:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();

//     // বায়ার কেনাকাটা করলে দ্রুত ডাটা আপডেট পাওয়ার জন্য প্রতি ৫ সেকেন্ড পরপর রিফ্রেশ
//     const interval = setInterval(fetchAnalytics, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>;

//   if (error) return (
//     <div className="flex flex-col items-center justify-center h-screen text-red-500 gap-2">
//       <AlertCircle size={48} />
//       <p>Error: {error}</p>
//       <button onClick={fetchAnalytics} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Retry</button>
//     </div>
//   );

//   return (
//     <div className="w-full space-y-8 p-6 bg-slate-50 min-h-screen">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
//         <p className="text-slate-500">Real-time performance tracking.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//           <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><DollarSign /></div>
//           <div>
//             <p className="text-slate-400 text-sm">Total Sales</p>
//             {/* রিডিউস ফাংশনটি এখন ডাইনামিক্যালি আপডেট হবে */}
//             <h2 className="text-2xl font-bold">৳{salesData.reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString()}</h2>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900">Sales Trend</h3>
//             <p className="text-sm text-slate-400">Updates automatically every 5 seconds</p>
//           </div>
//           <TrendingUp className="text-blue-600" />
//         </div>

//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={salesData}>
//               <XAxis dataKey="week" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} />
//               <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px'}} />
//               <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
//                 {salesData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#60a5fa'} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Loader2, TrendingUp, DollarSign, AlertCircle, Package, ShoppingCart, RefreshCw } from 'lucide-react';

export default function SellerAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/sales-trend`);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned HTML instead of JSON.");
      }
      const data = await response.json();
      setSalesData(data);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalSales = salesData.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalOrders = salesData.reduce((acc, curr) => acc + (curr.orders || 0), 0);
  const avgOrder = totalOrders ? (totalSales / totalOrders).toFixed(0) : 0;
  const bestWeek = salesData.reduce((best, curr) => curr.amount > (best?.amount || 0) ? curr : best, null);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div style={{ textAlign: "center" }}>
        <Loader2 className="animate-spin w-12 h-12 text-blue-600 mx-auto mb-4" />
        <p style={{ color: "#64748b", fontSize: "14px" }}>Loading analytics...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#f8fafc",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "20px",
        padding: "40px", textAlign: "center",
        border: "1px solid #fee2e2", maxWidth: "400px"
      }}>
        <AlertCircle size={48} color="#ef4444" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Failed to Load</h3>
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>{error}</p>
        <button onClick={fetchAnalytics} style={{
          backgroundColor: "#2563eb", color: "white",
          border: "none", borderRadius: "10px",
          padding: "10px 24px", fontSize: "14px",
          fontWeight: "600", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "8px", margin: "0 auto"
        }}>
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "24px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Sales Analytics</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0" }}>Real-time performance tracking</p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          backgroundColor: "white", border: "1px solid #e2e8f0",
          borderRadius: "10px", padding: "8px 14px"
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", animation: "ping 1s infinite" }} />
          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>
            Live · {lastUpdated}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Revenue", value: `৳${totalSales.toLocaleString()}`, icon: <DollarSign size={20} />, color: "#2563eb", bg: "#eff6ff", trend: "+12.5%" },
          { label: "Total Orders", value: totalOrders, icon: <ShoppingCart size={20} />, color: "#7c3aed", bg: "#f5f3ff", trend: "+8.2%" },
          { label: "Avg. Order Value", value: `৳${avgOrder}`, icon: <TrendingUp size={20} />, color: "#0891b2", bg: "#ecfeff", trend: "+3.1%" },
          { label: "Best Week", value: bestWeek?.week || "N/A", icon: <Package size={20} />, color: "#d97706", bg: "#fffbeb", trend: `৳${bestWeek?.amount?.toLocaleString() || 0}` },
        ].map(({ label, value, icon, color, bg, trend }) => (
          <div key={label} style={{
            backgroundColor: "white", borderRadius: "16px",
            padding: "20px", border: "1px solid #f1f5f9",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}>{label}</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
            </div>
            <p style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>{value}</p>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#22c55e" }}>{trend}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{
        backgroundColor: "white", borderRadius: "20px",
        padding: "28px", border: "1px solid #f1f5f9",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Weekly Sales</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Auto-updates every 5 seconds</p>
          </div>
          <TrendingUp color="#2563eb" size={20} />
        </div>
        <div style={{ height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} barSize={36}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip
                cursor={{ fill: "#f8fafc", radius: 8 }}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "13px" }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {salesData.map((_, index) => (
                  <Cell key={index} fill={index % 2 === 0 ? "#2563eb" : "#93c5fd"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div style={{
        backgroundColor: "white", borderRadius: "20px",
        padding: "28px", border: "1px solid #f1f5f9",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
      }}>
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Revenue Trend</h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Sales growth over time</p>
        </div>
        <div style={{ height: "240px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} dot={{ fill: "#2563eb", r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}