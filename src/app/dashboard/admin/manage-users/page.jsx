"use client";
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`);
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }
      );
      if (res.ok) {
        setUsers(prev =>
          prev.map(u => u._id === id ? { ...u, status: newStatus } : u)
        );
      }
    } catch (error) {
      alert("Status আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই ইউজারকে ডিলিট করতে চান?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== id));
      }
    } catch (error) {
      alert("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

  if (loading)
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="w-full space-y-4">
      <h1 className="text-2xl font-bold text-[#1b2559]">
        Manage Users ({users.length})
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold">
              <th className="pb-3 px-2 w-8">#</th>
              <th className="pb-3 px-2">Name</th>
              <th className="pb-3 px-2">Email</th>
              <th className="pb-3 px-2">Role</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#1b2559] divide-y divide-slate-50">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className={user.status === 'blocked' ? 'bg-red-50' : ''}>

                  <td className="py-4 px-2 text-slate-400 text-xs w-8">
                    {index + 1}
                  </td>

                  <td className="py-4 px-2 font-bold">
                    {user.name || "Unknown"}
                  </td>

                  <td className="py-4 px-2 text-slate-500 text-xs">
                    {user.email || "N/A"}
                  </td>

                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-bold capitalize ${
                      user.role === 'seller'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role || 'buyer'}
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <span className={`font-bold text-xs uppercase ${
                      user.status === 'blocked' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </td>

                  <td className="py-4 px-2 text-right">
                    <button
                      onClick={() => handleStatusUpdate(user._id, user.status)}
                      className={`font-bold text-xs uppercase hover:underline mr-4 ${
                        user.status === 'blocked' ? 'text-green-600' : 'text-amber-600'
                      }`}
                    >
                      {user.status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:underline text-xs font-bold uppercase"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-400">
                  কোনো ইউজার পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}