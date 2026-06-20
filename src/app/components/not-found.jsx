import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8fafc]">
      <div className="max-w-md w-full">
        {/* ৪MD বড় টেক্সট */}
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest animate-pulse">
          404
        </h1>
        
        {/* মেসেজ */}
        <h2 className="text-2xl font-bold text-[#1e293b] mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-[15px] mb-8">
          Oops! The page you are looking for doesn't exist or has been moved to another URL.
        </p>

        {/* হোম পেজে ফিরে যাওয়ার বাটন */}
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}