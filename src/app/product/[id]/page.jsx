"use client";

import React, { useEffect, useState, use } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishLoading, setWishLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  // Buy Now ফাংশন
  const handleBuyNow = () => {
    if (!product) return;
    // প্রোডাক্ট ডাটা স্টোর করে চেকআউট পেজে পাঠানো
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    router.push("/checkout");
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    setWishLoading(true);

    const wishlistItem = {
      productId: product._id,
      title: product.title,
      price: Number(product.price),
      // যদি images অ্যারে হয়, তবে প্রথমটি নিবে, নাহলে সাধারণ ইমেজ ফিল্ড
      image: Array.isArray(product.images) ? product.images[0] : (product.images || product.image),
      buyerEmail: 'rakib.hasan@gmail.com'
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wishlistItem)
      });
      
      const data = await res.json();
      if (data.insertedId) {
        setIsWishlisted(true);
        alert('🎉 প্রোডাক্টটি উইশলিস্টে যোগ হয়েছে!');
      }
    } catch (error) {
      alert('উইশলিস্টে যোগ করতে সমস্যা হচ্ছে!');
    } finally {
      setWishLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Product Not Found!</div>;
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* IMAGE SECTION */}
          <div>
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden group">
              <img 
                // ইমেজ সোর্স ঠিক করা হলো (যদি ইমেজ অ্যারে হয় তবে প্রথমটি দেখাবে)
                src={Array.isArray(product.images) ? product.images[0] : (product.images || product.image || "https://via.placeholder.com/600x500")} 
                alt={product.title} 
                className="w-full h-[550px] object-cover hover:scale-105 duration-500" 
              />
              <button
                onClick={handleAddToWishlist}
                disabled={wishLoading || isWishlisted}
                className="absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all z-10"
              >
                {wishLoading ? <Loader2 className="animate-spin" /> : <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"}`} />}
              </button>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">{product.category}</span>
            <h1 className="text-5xl font-bold text-slate-800 mt-5">{product.title}</h1>
            <h2 className="text-4xl font-bold text-blue-600 mt-6">৳{Number(product.price)?.toLocaleString()}</h2>
            
            <p className="text-gray-600 leading-8 mt-6">{product.description}</p>

            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2">Seller Information:</h4>
                <p>Name: {product.sellerInfo?.name || "N/A"}</p>
                <p>Phone: {product.sellerInfo?.phone || "N/A"}</p>
            </div>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition">Add To Cart</button>
              {/* এখানে onClick যোগ করা হয়েছে */}
              <button onClick={handleBuyNow} className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}