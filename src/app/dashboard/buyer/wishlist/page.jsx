'use client';
import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const buyerEmail = 'rakib.hasan@gmail.com'; 

  useEffect(() => {
    fetch(`http://localhost:8000/wishlist/${buyerEmail}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWishlist(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Wishlist Fetch Error:", err);
        setLoading(false);
      });
  }, [buyerEmail]);

  const handleRemove = async (id) => {
    const proceed = confirm("মামা, প্রোডাক্টটি কি সত্যিই উইশলিস্ট থেকে বাদ দিতে চাও?");
    if (!proceed) return;

    try {
      const response = await fetch(`http://localhost:8000/wishlist/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.deletedCount > 0) {
        setWishlist(wishlist.filter(item => item._id !== id));
        toast.success("Product removed from your wishlist successfully!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Unable to connect to the server.");
    }
  };

  const handleBuyNow = (item) => {
    localStorage.setItem("checkoutProduct", JSON.stringify({
      ...item,
      id: item.productId 
    }));
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 text-xs text-slate-500">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <span>SYNCHRONIZING WISHLIST...</span>
      </div>
    );
  }

  return (
    // ব্যাকগ্রাউন্ড সাদা এবং টেক্সট গাঢ় (slate-800) করা হয়েছে
    <div className="min-h-screen bg-white text-slate-800 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-xl font-bold text-black flex items-center gap-2">
          <Heart className="text-rose-500 w-5 h-5 fill-rose-500"/> My Wishlist
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto"/>
            <h3 className="text-sm font-bold text-slate-700 mt-2">Your wishlist is currently empty.!</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item) => (
              // কার্ডের স্টাইল লাইট মোডের জন্য আপডেট করা হয়েছে
              <div key={item._id} className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 flex items-center justify-between hover:border-slate-300 transition-all">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <div className="text-xs flex items-center gap-3">
                    <span className="text-blue-600 font-extrabold">${item.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => handleBuyNow(item)} className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all border border-blue-200">
                    <ShoppingCart className="w-4 h-4"/>
                  </button>
                  <button onClick={() => handleRemove(item._id)} className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg transition-all border border-rose-200">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}