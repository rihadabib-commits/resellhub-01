"use client";
import toast from "react-hot-toast";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // রিডাইরেক্ট করার জন্য
import { Mail, Lock, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react'; // Loader2 আইকন যোগ করা হয়েছে
import { authClient } from '@/lib/auth-client'; // আপনার তৈরি করা auth-client ইমপোর্ট করা হলো

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false); // লোডিং স্টেট
    const [errorMessage, setErrorMessage] = useState(''); // এরর মেসেজ দেখানোর জন্য

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✉️ ইমেইল ও পাসওয়ার্ড দিয়ে লগইন হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                callbackURL: "/dashboard" // লগইন সফল হলে ড্যাশবোর্ডে যাবে (পেজটি তৈরি করা থাকতে হবে)
            });

            if (error) {
                // Better Auth এরর দিলে সেটি সেট করা হচ্ছে
            toast.error(error.message || "Invalid email or password.");
            } else {
                // সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট করব
                toast.success("Login Successful!");
router.push("/dashboard");
               
            }
        } catch (err) {
            console.error("Login Exception:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🌐 গুগল দিয়ে সোশ্যাল লগইন হ্যান্ডলার
    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard"
            });
        } catch (err) {
            console.error("Google Auth Error:", err);
            toast.error("Google Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col justify-between font-sans text-gray-900 overflow-hidden">
            
            {/* Top Navigation Header */}
            <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="text-xl font-bold text-[#0052cc] tracking-tight flex items-center gap-1">
                    ReSell <span className="text-gray-900">Hub</span>
                </div>
                <Link 
                    href="/" 
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0052cc] transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    BACK TO HOME
                </Link>
            </header>

            {/* Main Content Container */}
            <main className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-6 md:px-12 py-4 flex-grow">
                
                {/* Left Side: Branding & Illustration */}
                <div className="md:col-span-6 flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                        Your next great find is <br />
                        <span className="text-[#0052cc]">waiting.</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
                        Join a premium community of sellers and collectors. Elevate your secondary market experience with boutique precision.
                    </p>

                    {/* Premium Card Display */}
                    <div className="relative aspect-[4/3] w-full max-w-[420px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 group hidden md:block">
                        <img 
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
                            alt="ReSell Hub Premium Experience" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shadow-lg">
                            <div className="bg-blue-600 p-2 rounded-xl text-white">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-900">Trusted by 50k+ users</span>
                                <span className="text-[10px] text-gray-400 font-medium">Secured transactions & verified sellers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Tabbed Form Card */}
                <div className="md:col-span-6 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_60px_rgba(0,82,204,0.04)] w-full max-w-[440px]">
                        
                        {/* Auth Tabs */}
                        <div className="grid grid-cols-2 border-b border-gray-100 mb-6 text-center">
                            <span className="pb-3 text-sm font-semibold text-[#0052cc] border-b-2 border-[#0052cc] relative">
                                Login
                            </span>
                            {/* ফোল্ডারের নাম পরিবর্তন করে থাকলে /registration লিখুন */}
                            <Link href="/regestation" className="pb-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
                                Register
                            </Link>
                        </div>

                        {/* Google Social Login Button */}
                        <button 
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            <img 
                                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                                alt="Google logo" 
                                className="w-4 h-4"
                            />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-5">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="px-3 text-xs text-gray-400 font-medium bg-white">or use email</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        {/* ⚠️ এরর মেসেজ এলার্ট বক্স */}
                        {errorMessage && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded-xl">
                                {errorMessage}
                            </div>
                        )}

                        {/* Credentials Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            
                            {/* Email Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[#0052cc] transition-colors" />
                                    <input 
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                                    <Link href="#" className="text-[11px] text-[#0052cc] font-semibold hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[#0052cc] transition-colors" />
                                    <input 
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Submit Button (With Loading State) */}
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0052cc] hover:bg-[#0043b3] text-white text-sm font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] mt-2 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>

                        {/* Footer Help Link */}
                        <div className="text-center mt-6">
                            <span className="text-xs text-gray-400">
                                Need help? <Link href="#" className="text-[#0052cc] font-semibold hover:underline">Visit Support Center</Link>
                            </span>
                        </div>

                    </div>
                </div>

            </main>

            {/* Bottom Footer Section */}
            <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 font-medium animate-in fade-in duration-500 delay-300">
                <div>
                    © 2026 ReSell Hub. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Cookie Policy</Link>
                </div>
            </footer>

        </div>
    );
};

export default LoginPage;