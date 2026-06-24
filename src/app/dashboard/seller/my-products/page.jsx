'use client';
import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Edit, Search, X } from 'lucide-react';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) { console.error("Error fetching:", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // এখানে filteredProducts ডিফাইন করা হয়েছে
  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, ...updatedData } = editProduct;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      
      if (res.ok) {
        setProducts(products.map(p => p._id === _id ? editProduct : p));
        setEditProduct(null); 
      } else {
        toast.error("Update failed. There may be a server issue.");
      }
    } catch (error) { 
      console.error("Update Error:", error); 
    }
  };

  const confirmDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${deleteId}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== deleteId));
    setDeleteId(null);
  };

  if (loading) return <div className="w-full h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#1b2559]">My Products</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none w-full md:w-64" />
        </div>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <form onSubmit={handleUpdate} className="bg-white text-slate-800 p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1b2559]">Edit Product</h2>
              <button type="button" onClick={() => setEditProduct(null)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 uppercase font-bold">Title</label>
                <input type="text" value={editProduct.title} onChange={(e) => setEditProduct({...editProduct, title: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold">Category</label>
                  <select value={editProduct.category} onChange={(e) => setEditProduct({...editProduct, category: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none">
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold">Condition</label>
                  <select value={editProduct.condition} onChange={(e) => setEditProduct({...editProduct, condition: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none">
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold">Price</label>
                  <input type="number" value={editProduct.price} onChange={(e) => setEditProduct({...editProduct, price: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold">Stock</label>
                  <input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({...editProduct, stock: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase font-bold">Description</label>
                <textarea value={editProduct.description} onChange={(e) => setEditProduct({...editProduct, description: e.target.value})} rows={3} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-lg">Save Changes</button>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-80 shadow-xl space-y-4">
            <h2 className="font-bold text-lg">Are you sure?</h2>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setDeleteId(null)} className="w-full py-2 bg-slate-100 rounded-lg font-bold">Cancel</button>
              <button onClick={confirmDelete} className="w-full py-2 bg-red-500 text-white rounded-lg font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-400 uppercase font-bold text-xs">
              <th className="pb-4 px-2">Product Name</th>
              <th className="pb-4 px-2">Price</th>
              <th className="pb-4 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50">
                <td className="py-4 px-2 font-semibold">{product.title}</td>
                <td className="py-4 px-2 font-extrabold text-blue-600">৳{product.price}</td>
                <td className="py-4 px-2 text-right space-x-3">
                  <button onClick={() => setEditProduct(product)} className="text-blue-600 p-2"><Edit size={16} /></button>
                  <button onClick={() => setDeleteId(product._id)} className="text-red-500 p-2"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}