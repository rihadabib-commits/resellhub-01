// 'use client';
// import React, { useState, useEffect } from 'react';
// import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

// export default function PaymentHistoryPage() {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const buyerEmail = 'rakib.hasan@gmail.com'; 

//   useEffect(() => {
//     fetch(`https://reselhubserver-02.vercel.app/payments/${buyerEmail}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setPayments(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Payment History Fetch Error:", err);
//         setLoading(false);
//       });
//   }, [buyerEmail]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white text-slate-500 flex items-center justify-center text-xs tracking-wider">
//         🔄 LOADING TRANSACTIONS...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-slate-800 p-3 sm:p-8 font-sans">
//       <div className="max-w-6xl mx-auto mb-6">
//         <h1 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
//           <CreditCard className="text-blue-600 w-5 h-5"/> Payment History
//         </h1>
        
//       </div>

//       <div className="max-w-6xl mx-auto">
//         {payments.length === 0 ? (
//           <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-10 text-center space-y-2">
//             <AlertCircle className="w-8 h-8 text-slate-400 mx-auto"/>
//             <h3 className="text-sm font-bold text-slate-700">No payment history found!</h3>
//           </div>
//         ) : (
//           <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//             <div className="overflow-x-auto w-full">
//               <table className="w-full min-w-[600px] text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
//                     <th className="py-3 px-4 sm:px-6">Transaction ID</th>
//                     <th className="py-3 px-4 sm:px-6">Product</th>
//                     <th className="py-3 px-4 sm:px-6">Date</th>
//                     <th className="py-3 px-4 sm:px-6">Amount</th>
//                     <th className="py-3 px-4 sm:px-6">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 text-xs">
//                   {payments.map((pay) => (
//                     <tr key={pay._id} className="hover:bg-slate-50 transition-colors">
//                       <td className="py-4 px-4 sm:px-6 font-mono text-blue-600">{pay.transactionId}</td>
//                       <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 truncate max-w-[150px]">{pay.title}</td>
//                       <td className="py-4 px-4 sm:px-6 text-slate-500 flex items-center gap-1">
//                         <Calendar className="w-3 h-3 text-slate-400" />
//                         {new Date(pay.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="py-4 px-4 sm:px-6 font-bold text-green-600">${Number(pay.price).toFixed(2)}</td>
//                       <td className="py-4 px-6">
//                         <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-200 font-bold uppercase text-[9px]">
//                           <CheckCircle className="w-2.5 h-2.5"/> {pay.paymentStatus}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );   
// }


'use client';
import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const buyerEmail = 'rakib.hasan@gmail.com'; 

  useEffect(() => {
    fetch(`https://reselhubserver-02.vercel.app/payments/${buyerEmail}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPayments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Payment History Fetch Error:", err);
        setLoading(false);
      });
  }, [buyerEmail]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-500 flex items-center justify-center text-xs tracking-wider">
        🔄 LOADING TRANSACTIONS...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 p-3 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
          <CreditCard className="text-blue-600 w-5 h-5"/> Payment History
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {payments.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-10 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto"/>
            <h3 className="text-sm font-bold text-slate-700">No payment history found!</h3>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6">Transaction ID</th>
                    <th className="py-3 px-4 sm:px-6">Product</th>
                    <th className="py-3 px-4 sm:px-6">Date</th>
                    <th className="py-3 px-4 sm:px-6">Amount</th>
                    <th className="py-3 px-4 sm:px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {payments.map((pay) => {
                    const isPaid = pay.paymentStatus?.toLowerCase() === 'paid';
                    return (
                      <tr key={pay._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 sm:px-6 font-mono text-blue-600">{pay.transactionId}</td>
                        <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 truncate max-w-[150px]">{pay.title}</td>
                        <td className="py-4 px-4 sm:px-6 text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(pay.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-bold text-green-600">${Number(pay.price).toFixed(2)}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-bold uppercase text-[9px] 
                            ${isPaid 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                            {isPaid ? <CheckCircle className="w-2.5 h-2.5"/> : <Clock className="w-2.5 h-2.5"/>}
                            {pay.paymentStatus || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}