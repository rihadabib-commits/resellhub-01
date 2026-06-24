"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin inline" /></div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 text-[11px] uppercase border-b">
            <th className="pb-3">Product Info</th>
            <th className="pb-3">Seller</th>
            <th className="pb-3">Status</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((p) => (
            <tr key={p._id}>
              <td className="py-4 flex items-center gap-3">
                {/* ছবি না থাকলে ডিফল্ট ইমেজ দেখাবে */}
                <img src={p.image || "https://i.ibb.co/5Yw7v8P/placeholder.png"} className="w-12 h-12 rounded object-cover" />
                <div>
                  <div className="font-bold">{p.productTitle}</div>
                  <div className="text-[10px] text-slate-400">ID: {p.productsId}</div>
                </div>
              </td>
              <td className="py-4 text-sm">
                <div>{p.sellerInfo?.name || "Unknown"}</div>
                <div className="text-xs text-slate-400">{p.sellerInfo?.email || "No Email"}</div>
              </td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  p.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {p.status || "Pending"}
                </span>
              </td>
              <td className="py-4 text-right space-x-2">
                {/* স্ট্যাটাস অনুযায়ী বাটন কন্ট্রোল */}
                {p.status !== 'Available' && (
                  <button onClick={() => handleStatusUpdate(p._id, 'Available')} className="text-green-600 font-bold text-xs border px-2 py-1 rounded">Approve</button>
                )}
                <button onClick={() => handleStatusUpdate(p._id, 'Rejected')} className="text-orange-600"><XCircle size={18} /></button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}