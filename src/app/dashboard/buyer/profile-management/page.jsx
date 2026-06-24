'use client';
import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

export default function ProfileManagementPage() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const buyerEmail = 'rakib.hasan@gmail.com'; 

  useEffect(() => {
    fetch(`https://reselhubserver-02.vercel.app/users/${buyerEmail}`)
      .then(res => res.json())
      .then(data => {
        if (data) setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Profile Fetch Error:", err);
        setLoading(false);
      });
  }, [buyerEmail]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await fetch(`https://reselhubserver-02.vercel.app/users/${profile._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          address: profile.address
        })
      });
      const result = await response.json();
      
      if (result.modifiedCount > 0) {
      toast.success("Profile updated successfully!");
      } else {
        toast.error("No changes were made or something went wrong.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-500">🔄 LOADING PROFILE...</div>;

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"><User className="w-5 h-5"/></div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Profile Management</h1>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-mono uppercase font-bold">{profile.role || 'Buyer'} Module</span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-600 font-semibold block mb-1">Email Address (Non-Editable)</label>
            <div className="relative">
              <input type="text" disabled value={profile.email || ''} className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-500 cursor-not-allowed"/>
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-slate-600 font-semibold block mb-1">Full Name</label>
            <div className="relative">
              <input type="text" required value={profile.name || ''} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"/>
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Phone Number</label>
              <div className="relative">
                <input type="text" value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"/>
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Location / Address</label>
              <div className="relative">
                <input type="text" value={profile.address || ''} onChange={e => setProfile({...profile, address: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"/>
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={updating} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm mt-2">
            <Save className="w-4 h-4"/> {updating ? 'Saving Modifications...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}