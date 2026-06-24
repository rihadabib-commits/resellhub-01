

'use client';
import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe('pk_test_51Tl9MDL8sQX83NVwpl0VCXgPQIQQcrhWOqOLpA36DgY7bxEZyaMwyztaLTrl0Vu8SDRJIJYpkSkzgM8CxVRfsMrf00YUfTeElW');

export default function CheckoutPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyerEmail] = useState("rakib.hasan@gmail.com"); 
  const [buyerName] = useState("Md. Rakib Hasan");

  useEffect(() => {
    const storedProduct = localStorage.getItem("checkoutProduct");
    if (!storedProduct) {
    toast.error("No product selected. Redirecting...");
      router.push('/');
      return;
    }
    try {
      const parsedProduct = JSON.parse(storedProduct);
      setProduct(parsedProduct);
    } catch (err) {
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-blue-500" /></div>;
  if (!product) return <div className="min-h-screen bg-[#0d0e12] text-white flex items-center justify-center text-xl">No product found.</div>;

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#e2e8f0] p-4 sm:p-8 font-sans flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#14151a] border border-[#22242e] rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="space-y-6 border-r border-[#22242e] pr-0 md:pr-8">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <ShoppingBag className="text-blue-500 w-5 h-5"/>
            <h2>Order Summary</h2>
          </div>
          <div className="bg-[#0d0e12] border border-[#22242e] rounded-xl p-4 space-y-3">
            <h3 className="text-white text-sm font-bold truncate">{product.title}</h3>
            <p className="text-xs text-slate-400">Category: {product.category}</p>
            <div className="border-t border-[#22242e] pt-3 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-400">Product Price:</span> <span className="text-white font-semibold">৳{Number(product.price)?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Delivery Charge:</span> <span className="text-emerald-400 font-semibold">FREE</span></div>
              <div className="border-t border-[#22242e] pt-2 flex justify-between text-sm font-bold text-white">
                <span>Total Amount:</span> <span className="text-blue-400">${Number(product.price)?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg">
            <ShieldCheck className="text-blue-500 w-5 h-5 flex-shrink-0"/>
            <span>Your transaction is securely protected with Stripes end-to-end encryption.</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <CreditCard className="text-blue-500 w-5 h-5"/>
            <h2>Billing & Card Payment</h2>
          </div>
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm product={product} buyerEmail={buyerEmail} buyerName={buyerName} />
          </Elements>
        </div>
      </div>
    </div>
  );
}

function StripeCheckoutForm({ product, buyerEmail, buyerName }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    if (!phone || !address) { setCardError('মামা, ডেলিভারি ফোন নম্বর এবং ঠিকানা সঠিকভাবে পূরণ করো!'); return; }

    setProcessing(true);
    setCardError('');

    try {
      const res = await fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: product.price })
      });
      const data = await res.json();
      if (!data.clientSecret) throw new Error(data.error || "Client Secret জেনারেট করা যায়নি।");

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: card, billing_details: { name: buyerName, email: buyerEmail } },
      });

      if (stripeError) { setCardError(stripeError.message); setProcessing(false); return; }

      if (paymentIntent.status === 'succeeded') {
        const orderPayload = {
          productId: product._id,
          title: product.title,
          price: Number(product.price),
          totalPayable: Number(product.price),
          transactionId: paymentIntent.id,
          sellerId: product.sellerInfo?.userId || product.sellerId,
          sellerName: product.sellerInfo?.name,
          sellerEmail: product.sellerInfo?.email,
          buyerPhone: phone,
          buyerAddress: address,
          buyerEmail: buyerEmail,
          buyerName: buyerName,
          status: 'pending',        // লজিক বসানো হয়েছে
          paymentStatus: 'pending'  // লজিক বসানো হয়েছে
        };

        const saveResponse = await fetch('http://localhost:8000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        const saveResult = await saveResponse.json();

        if (saveResult.success) {
          localStorage.removeItem("checkoutProduct");
        toast.success(
  "Your order has been placed successfully. Payment will be confirmed after the seller accepts your order."
);

router.push("/dashboard/buyer/payment-history");
          router.push('/dashboard/buyer/payment-history');
        }
      }
    } catch (err) { setCardError(err.message || 'Payment processing failed.'); }
    finally { setProcessing(false); }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
      <div className="space-y-3">
        <div>
          <label className="text-slate-400 font-semibold block mb-1">Phone Number *</label>
          <input type="text" required placeholder="+88017XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#1c1e24] border border-[#2e313d] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="text-slate-400 font-semibold block mb-1">Shipping Address *</label>
          <input type="text" required placeholder="Dhaka, Bangladesh" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#1c1e24] border border-[#2e313d] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div>
        <label className="text-slate-400 font-semibold block mb-1">Card Details *</label>
        <div className="p-3 bg-[#0d0e12] border border-[#22242e] rounded-xl">
          <CardElement options={{ style: { base: { fontSize: '14px', color: '#e2e8f0', '::placeholder': { color: '#94a3b8' } }, invalid: { color: '#f43f5e' } } }} />
        </div>
      </div>
      {cardError && <p className="text-rose-500 font-medium bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg">⚠️ {cardError}</p>}
      <button type="submit" disabled={!stripe || !elements || processing} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-900/20">
        {processing ? 'Processing...' : `Confirm Payment ৳${Number(product.price)?.toLocaleString()}`}
        <ArrowRight className="w-4 h-4"/>
      </button>
    </form>
  );
}