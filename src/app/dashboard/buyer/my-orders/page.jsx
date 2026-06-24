// import React from 'react';

// // ফাইল পাথ: src/app/dashboard/buyer/my-orders/page.jsx
// export default function MyOrders() {
//   return (
//     <div className="w-full space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-[#1b2559]">My Placed Orders</h1>
//         <p className="text-sm text-slate-400 mt-0.5">Track current order status or cancel before shipment.</p>
//       </div>
//       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-[600px]">
//           <thead>
//             <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
//               <th className="pb-3 px-2">Order ID</th>
//               <th className="pb-3 px-2">Product Name</th>
//               <th className="pb-3 px-2">Status</th>
//               <th className="pb-3 px-2 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-[#1b2559] divide-y divide-slate-50">
//             <tr>
//               <td className="py-4 px-2 font-mono text-xs text-slate-400">#ORD-001</td>
//               <td className="py-4 px-2 font-bold">Used Dell Inspiron 15 Laptop</td>
//               <td className="py-4 px-2">
//                 <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-xl text-xs font-bold">Pending</span>
//               </td>
//               <td className="py-4 px-2 text-right">
//                 <button className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">Cancel Order</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Package, XCircle } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function MyOrders() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this order?')) return;
    setCancellingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: 'Cancelled' })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus: 'Cancelled' } : o));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  const statusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return { bg: "#fffbeb", color: "#d97706", border: "#fde68a" };
    if (s === 'accepted') return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
    if (s === 'processing') return { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" };
    if (s === 'shipped') return { bg: "#ecfeff", color: "#0891b2", border: "#a5f3fc" };
    if (s === 'delivered') return { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" };
    if (s === 'cancelled') return { bg: "#fef2f2", color: "#ef4444", border: "#fecaca" };
    return { bg: "#f8fafc", color: "#64748b", border: "#e2e8f0" };
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: 0 }}>My Orders</h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0" }}>
          {orders.length} order{orders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: orders.length, color: "#2563eb", bg: "#eff6ff" },
          { label: "Pending", value: orders.filter(o => o.orderStatus?.toLowerCase() === 'pending').length, color: "#d97706", bg: "#fffbeb" },
          { label: "Delivered", value: orders.filter(o => o.orderStatus?.toLowerCase() === 'delivered').length, color: "#16a34a", bg: "#f0fdf4" },
          { label: "Cancelled", value: orders.filter(o => o.orderStatus?.toLowerCase() === 'cancelled').length, color: "#ef4444", bg: "#fef2f2" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ backgroundColor: "white", borderRadius: "12px", padding: "14px 16px", border: "1px solid #f1f5f9" }}>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "600" }}>{label}</p>
            <p style={{ fontSize: "24px", fontWeight: "800", color, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: "white", borderRadius: "20px",
        border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        overflow: "hidden"
      }}>
        {orders.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <Package size={48} color="#e2e8f0" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#94a3b8", margin: 0 }}>No orders yet</p>
            <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "4px 0 0" }}>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9", backgroundColor: "#f8fafc" }}>
                  {["Order ID", "Product", "Amount", "Status", "Date", "Action"].map(h => (
                    <th key={h} style={{
                      padding: "14px 20px",
                      textAlign: h === "Action" ? "right" : "left",
                      fontSize: "11px", fontWeight: "700",
                      color: "#94a3b8", textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const { bg, color, border } = statusStyle(order.orderStatus);
                  const isCancellable = !['delivered', 'shipped', 'cancelled'].includes(order.orderStatus?.toLowerCase());
                  return (
                    <tr key={order._id} style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
                    >
                      <td style={{ padding: "16px 20px", fontFamily: "monospace", fontSize: "12px", color: "#94a3b8" }}>
                        #{order._id?.slice(-8).toUpperCase()}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                          {order.productTitle || "Product"}
                        </p>
                        <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0" }}>
                          Seller: {order.sellerInfo?.name || "N/A"}
                        </p>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                        ৳{order.amount?.toLocaleString() || 0}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          fontSize: "11px", fontWeight: "700",
                          padding: "4px 12px", borderRadius: "20px",
                          backgroundColor: bg, color, border: `1px solid ${border}`
                        }}>
                          {order.orderStatus || "Pending"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "12px", color: "#94a3b8" }}>
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        {isCancellable ? (
                          <button
                            onClick={() => handleCancel(order._id)}
                            disabled={cancellingId === order._id}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "5px",
                              padding: "7px 14px", borderRadius: "8px", border: "none",
                              fontSize: "12px", fontWeight: "600", cursor: "pointer",
                              backgroundColor: "#fef2f2", color: "#ef4444", transition: "all 0.15s"
                            }}
                          >
                            {cancellingId === order._id
                              ? <Loader2 size={12} className="animate-spin" />
                              : <XCircle size={12} />}
                            Cancel
                          </button>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: "500" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}