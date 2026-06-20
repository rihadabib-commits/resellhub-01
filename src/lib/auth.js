import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI missing in .env file!");
}

// ১. মঙ্গোডিবি ক্লায়েন্ট ইনিশিয়েট করা
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
});

// ২. সরাসরি আপনার নির্দিষ্ট ডাটাবেজ অবজেক্টটি নেওয়া
// (এখানে কোনো await লাগবে না, মঙ্গোডিবি ড্রাইভার নিজে ব্যাকগ্রাউন্ডে কানেকশন হ্যান্ডেল করবে)
const db = client.db("reselhundb");

export const auth = betterAuth({
  // ⚡ Better Auth-এর অফিশিয়াল মঙ্গোডিবি অ্যাডাপ্টার কনফিগারেশন
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: { 
        type: "string", // টাইপ ডিফাইন করে দেওয়া ভালো প্র্যাকটিস
        defaultValue: "buyer" 
      },
      isBlocked: { 
        type: "boolean",
        defaultValue: false 
      },
    },
  },
});