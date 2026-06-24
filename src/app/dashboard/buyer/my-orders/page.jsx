import React from 'react';

// ফাইল পাথ: src/app/dashboard/buyer/my-orders/page.jsx
export default function MyOrders() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1b2559]">My Placed Orders</h1>
        <p className="text-sm text-slate-400 mt-0.5">Track current order status or cancel before shipment.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
              <th className="pb-3 px-2">Order ID</th>
              <th className="pb-3 px-2">Product Name</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#1b2559] divide-y divide-slate-50">
            <tr>
              <td className="py-4 px-2 font-mono text-xs text-slate-400">#ORD-001</td>
              <td className="py-4 px-2 font-bold">Used Dell Inspiron 15 Laptop</td>
              <td className="py-4 px-2">
                <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-xl text-xs font-bold">Pending</span>
              </td>
              <td className="py-4 px-2 text-right">
                <button className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">Cancel Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
