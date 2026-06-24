'use client';
import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function SellerManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        if (newStatus === 'Rejected') {
          setOrders(prev => prev.filter(order => order._id !== id));
        } else {
          setOrders(prev =>
            prev.map(order =>
              order._id === id 
                ? { 
                    ...order, 
                    status: newStatus, 
                    paymentStatus: newStatus === 'Accepted' ? 'paid' : order.paymentStatus 
                  } 
                : order
            )
          );
        }
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to update the status.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setUpdatingId(null);
    }
  };

  const StatusBadge = ({ order }) => {
    const statusStyles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Accepted: "bg-blue-100 text-blue-700",
      Processing: "bg-purple-100 text-purple-700",
      Shipped: "bg-indigo-100 text-indigo-700",
      Delivered: "bg-emerald-100 text-emerald-700",
      Rejected: "bg-red-100 text-red-700"
    };

    return (
      <div className="flex flex-col gap-1">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || "bg-gray-100 text-gray-600"}`}>
          {order.status === 'Delivered' && <CheckCircle className="w-3.5 h-3.5" />}
          {order.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
          {order.status || "Unknown"}
        </span>
        <span className={`text-[10px] font-bold uppercase ${order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-500'}`}>
          {order.paymentStatus === 'paid' ? 'Paid' : 'Payment: Pending'}
        </span>
      </div>
    );
  };

  if (loading) {
    return <div className="w-full h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>;
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1b2559]">Manage Incoming Orders</h1>
        <p className="text-sm text-slate-400 mt-0.5">Handle customer requests and delivery lifecycle status.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
              <th className="pb-4 px-3">Order / Product</th>
              <th className="pb-4 px-3">Buyer Info</th>
              <th className="pb-4 px-3">Status</th>
              <th className="pb-4 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#1b2559] divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-50 transition">
                <td className="py-5 px-3">
                  <div className="font-semibold text-slate-800">{order.title || "N/A"}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">#{order._id?.slice(-8)}</div>
                </td>
                <td className="py-5 px-3">
                  <div className="font-medium text-slate-800">{order.buyerName || "Unknown"}</div>
                  <div className="text-xs text-slate-500">{order.buyerPhone || "No phone"}</div>
                  <div className="text-xs font-bold text-blue-600 mt-1">{order.buyerEmail || "No email"}</div>
                </td>
                <td className="py-5 px-3">
                  <StatusBadge order={order} />
                </td>
                <td className="py-5 px-3 text-right space-x-2">
                  <select
                    // সমাধান: এখানে || "" যোগ করা হয়েছে যেন value কখনোই null না হয়
                    value={order.status || ""} 
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    disabled={updatingId === order._id}
                    className="border border-slate-300 bg-white rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  {/* বাটনের লজিক অপরিবর্তিত রাখা হয়েছে */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}