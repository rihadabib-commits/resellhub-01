// "use client";
// import React, { useEffect, useState } from 'react';
// import { Loader2 } from 'lucide-react';

// export default function ManageOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`);
//         const data = await res.json();
//         setOrders(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const statusColor = (status) => {
//     if (status === 'pending' || status === 'Pending') return 'bg-yellow-100 text-yellow-700';
//     if (status === 'Accepted') return 'bg-blue-100 text-blue-700';
//     if (status === 'Shipped') return 'bg-purple-100 text-purple-700';
//     if (status === 'Delivered') return 'bg-green-100 text-green-700';
//     if (status === 'Cancelled') return 'bg-red-100 text-red-700';
//     return 'bg-gray-100 text-gray-600';
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchSearch =
//       order.productTitle?.toLowerCase().includes(search.toLowerCase()) ||
//       order._id?.toLowerCase().includes(search.toLowerCase());

//     const matchStatus =
//       filterStatus === 'all' ||
//       (order.orderStatus || order.status || 'pending').toLowerCase() === filterStatus.toLowerCase();

//     return matchSearch && matchStatus;
//   });

//   if (loading)
//     return (
//       <div className="w-full h-64 flex items-center justify-center">
//         <Loader2 className="animate-spin text-blue-600" />
//       </div>
//     );

//   return (
//     <div className="w-full space-y-4">
//       <h1 className="text-2xl font-bold text-[#1b2559]">
//         Manage Orders ({filteredOrders.length})
//       </h1>

//       {/* Search + Filter */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Search by product or order ID..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400 font-semibold text-[#1b2559]"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-[650px]">
//           <thead>
//             <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold">
//               <th className="pb-3 px-2">#</th>
//               <th className="pb-3 px-2">Order ID</th>
//               <th className="pb-3 px-2">Product</th>
//               <th className="pb-3 px-2">Price</th>
//               <th className="pb-3 px-2">Payment</th>
           
//               <th className="pb-3 px-2">Date</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-[#1b2559] divide-y divide-slate-50">
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order, index) => (
//                 <tr key={order._id}>

//                   <td className="py-4 px-2 text-slate-400 text-xs">{index + 1}</td>

//                   {/* Order ID */}
//                   <td className="py-4 px-2 font-mono text-[10px] text-slate-400">
//                     #{order._id?.slice(-6).toUpperCase()}
//                   </td>

//                   {/* Product */}
//                   <td className="py-4 px-2">
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={
//                           (Array.isArray(order.images) ? order.images[0] : order.productImage) ||
//                           "https://via.placeholder.com/40"
//                         }
//                         className="w-10 h-10 rounded-lg object-cover border border-slate-100"
//                         alt="product"
//                       />
//                       <span className="font-semibold text-xs">{order.productTitle || "N/A"}</span>
//                     </div>
//                   </td>

//                   {/* Price */}
//                   <td className="py-4 px-2 font-bold">
//                     ${Number(order.price || 0).toFixed(2)}
//                   </td>

//                   {/* Payment Status */}
//                   <td className="py-4 px-2">
//                     <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
//                       order.paymentStatus === 'paid' || order.paymentStatus === 'Paid'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                     }`}>
//                       {order.paymentStatus || 'unpaid'}
//                     </span>
//                   </td>

//                   {/* Order Status */}
                  

//                   {/* Date */}
//                   <td className="py-4 px-2 text-xs text-slate-400">
//                     {order.createdAt
//                       ? new Date(order.createdAt).toLocaleDateString('en-GB')
//                       : 'N/A'}
//                   </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-10 text-slate-400">
//                   কোনো অর্ডার পাওয়া যায়নি।
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


'use client';
import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // স্ট্যাটাস আপডেট করার ফাংশন
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrders(); // ডাটা রিফ্রেশ করা
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.productTitle?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || (order.orderStatus || 'Pending').toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  if (loading) return <div className="w-full h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="w-full space-y-4">
      <h1 className="text-2xl font-bold text-[#1b2559]">Manage Orders ({filteredOrders.length})</h1>
      
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search by product..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2 text-sm">
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="text-[11px] text-slate-400 uppercase font-bold border-b border-slate-100">
              <th className="pb-3 px-2">Order ID</th>
              <th className="pb-3 px-2">Product</th>
              <th className="pb-3 px-2">Price</th>
              <th className="pb-3 px-2">Payment</th>
              <th className="pb-3 px-2">Order Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="py-4 px-2 font-mono text-[10px] text-slate-400">#{order._id?.slice(-6).toUpperCase()}</td>
                <td className="py-4 px-2 font-semibold text-xs">{order.productTitle}</td>
                <td className="py-4 px-2 font-bold">${Number(order.price).toFixed(2)}</td>
                
                {/* Payment Status (New Logic) */}
                <td className="py-4 px-2">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </td>

                {/* Status Update Action */}
                <td className="py-4 px-2">
                  <select 
                    value={order.orderStatus || 'Pending'} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}