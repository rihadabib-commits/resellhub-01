"use client";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { signUp } from "@/lib/auth-client"; 
import { Mail, Lock, User, ArrowLeft, ShieldCheck, Image, Loader2, CheckCircle2, ShieldAlert, ChevronDown } from 'lucide-react';

const RegistrationPage = () => {
    const router = useRouter(); 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profileImage: '',
        password: '',
        role: 'buyer'
    });


    const handleGoogleLogin = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard/buyer/overview",
    });
  } catch (error) {
    console.error(error);
    alert("Google Login Failed");
  }
};

    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const IMGBB_API_KEY = "01e75ae5434a8bdd918057adbe8b1512"; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadSuccess(false);

        const data = new FormData();
        data.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                const imageUrl = result.data.display_url;
                setFormData(prev => ({ ...prev, profileImage: imageUrl }));
                setUploadSuccess(true);
            } else {
                toast.error("Image upload failed!");
            }
        } catch (error) {
            toast.error("Something went wrong during upload.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (uploading) {
           toast.error("Please wait, image is still uploading...");
            return;
        }

        if (!formData.profileImage) {
           toast.error("Please select and upload a profile image first!");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.username, 
                image: formData.profileImage, 
                role: formData.role, 
                callbackURL: `/dashboard/${formData.role}/overview` 
            });

            if (error) {
                toast.error(error.message || "Registration failed! Please try again.");
                console.error("Auth Error:", error);
            } else {
                // ✅ MongoDB-তে save করো
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.username,
                        email: formData.email,
                        role: formData.role,
                        image: formData.profileImage,
                        status: 'active'
                    })
                });

                localStorage.setItem("userRole", formData.role);
             toast.success(
  `Registration Successful as ${formData.role.toUpperCase()}!`
);
                router.push(`/dashboard/${formData.role}/overview`);
            }
        } catch (error) {
            console.error("Submission Error:", error);
        toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col justify-between font-sans text-gray-900 overflow-hidden">
            
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

            <main className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-6 md:px-12 py-4 flex-grow">
                
                <div className="md:col-span-6 flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                        Your next great find is <br />
                        <span className="text-[#0052cc]">waiting.</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
                        Join a premium community of sellers and collectors. Elevate your secondary market experience with boutique precision.
                    </p>

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

                <div className="md:col-span-6 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_60px_rgba(0,82,204,0.04)] w-full max-w-[440px]">
                        
                        <div className="grid grid-cols-2 border-b border-gray-100 mb-6 text-center">
                            <Link href="/login" className="pb-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
                                Login
                            </Link>
                            <span className="pb-3 text-sm font-semibold text-[#0052cc] border-b-2 border-[#0052cc] relative">
                                Register
                            </span>
                        </div>

                      <button
    type="button"
    onClick={handleGoogleLogin}
    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98]"
>
    <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-4 h-4"
    />
    Continue with Google
</button>

                        <div className="flex items-center my-5">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="px-3 text-xs text-gray-400 font-medium bg-white">or use email</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[#0052cc] transition-colors" />
                                    <input 
                                        type="text" name="username" required placeholder="johndoe"
                                        value={formData.username} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[#0052cc] transition-colors" />
                                    <input 
                                        type="email" name="email" required placeholder="name@company.com"
                                        value={formData.email} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Profile Picture</label>
                                <div className="relative w-full">
                                    <input type="file" accept="image/*" id="file-upload" onChange={handleImageUpload} className="hidden" />
                                    <label 
                                        htmlFor="file-upload"
                                        className={`flex items-center justify-between border border-dashed rounded-xl px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 
                                            ${uploadSuccess ? 'bg-emerald-50/50 border-emerald-300 text-emerald-700' : 'bg-gray-50/50 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-400'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {uploading ? <Loader2 className="h-4 w-4 text-[#0052cc] animate-spin" /> : uploadSuccess ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Image className="h-4 w-4 text-gray-400" />}
                                            <span className="truncate max-w-[200px]">
                                                {uploading ? "Uploading..." : uploadSuccess ? "Image Uploaded!" : "Choose Image File"}
                                            </span>
                                        </div>
                                        {!uploading && !uploadSuccess && <span className="text-[11px] bg-white border border-gray-200 text-gray-500 px-2.5 py-1 rounded-lg shadow-sm font-semibold">Browse</span>}
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[#0052cc] transition-colors" />
                                    <input 
                                        type="password" name="password" required placeholder="••••••••"
                                        value={formData.password} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Select Account Role</label>
                                <div className="relative flex items-center">
                                    <ShieldAlert className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0052cc] focus:ring-4 focus:ring-blue-50 transition-all text-gray-700 font-medium cursor-pointer appearance-none"
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-400 leading-normal mt-1">
                                By registering, you agree to our <Link href="#" className="text-[#0052cc] hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-[#0052cc] hover:underline font-medium">Privacy Policy</Link>.
                            </p>

                            <button 
                                type="submit"
                                disabled={uploading || isSubmitting} 
                                className={`w-full text-white text-sm font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] mt-2 flex items-center justify-center gap-2
                                    ${uploading || isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#0052cc] hover:bg-[#0043b3]'}`}
                            >
                                {(uploading || isSubmitting) && <Loader2 className="h-4 w-4 animate-spin" />}
                                {!uploading && !isSubmitting && "Create Account"}
                                {(uploading && !isSubmitting) && "Uploading Image..."}
                                {isSubmitting && "Creating Account..."}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <span className="text-xs text-gray-400">
                                Need help? <Link href="#" className="text-[#0052cc] font-semibold hover:underline">Visit Support Center</Link>
                            </span>
                        </div>

                    </div>
                </div>

            </main>

            <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 font-medium">
                <div>© 2026 ReSell Hub. All rights reserved.</div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Cookie Policy</Link>
                </div>
            </footer>

        </div>
    );
};

export default RegistrationPag