"use client";

import { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Download, 
  SlidersHorizontal,
  Home, 
  LayoutGrid, 
  PieChart, 
  Users2, 
  MessageSquare, 
  Folder, 
  FileText, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  role: "Admin" | "Editor" | "Journalist" | "Reader";
  status: "Active" | "Offline" | "Unconfirmed" | "Banned";
  lastActivity: string;
  avatarUrl: string;
}

const initialUsers: DashboardUser[] = [
  { id: "800120", name: "Cameron Williamson", email: "cameronWill@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Admin", status: "Active", lastActivity: "2026-01-02 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { id: "800123", name: "Esther Howard", email: "estherHoward@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Admin", status: "Active", lastActivity: "2026-01-22 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { id: "800186", name: "Brooklyn Simmons", email: "brooklynSims@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Reader", status: "Active", lastActivity: "2026-01-15 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { id: "800122", name: "Guy Hawkins", email: "guyHawkins@com", phone: "+201 9451286", region: "Indonesia", role: "Admin", status: "Active", lastActivity: "2026-01-16 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" },
  { id: "800162", name: "Jacob Jones", email: "jacobJones.com", phone: "+201 9451286", region: "Indonesia", role: "Editor", status: "Offline", lastActivity: "2026-01-07 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&auto=format&fit=crop&q=80" },
  { id: "800121", name: "Ralph Edwards", email: "ralphEdwards@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Editor", status: "Active", lastActivity: "2026-01-09 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80" },
  { id: "800129", name: "Darlene Robertson", email: "darleneRobertson@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Admin", status: "Offline", lastActivity: "2026-01-01 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
  { id: "800128", name: "Jerome Bell", email: "jeromeBell@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Admin", status: "Active", lastActivity: "2026-01-31 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
  { id: "800125", name: "Courtney Henry", email: "courtneyHenry@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Reader", status: "Unconfirmed", lastActivity: "2026-01-11 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80" },
  { id: "800155", name: "Theresa Webb", email: "theresaWebb@gmail.com", phone: "+201 9451286", region: "Indonesia", role: "Reader", status: "Banned", lastActivity: "2026-01-19 10:42:01", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }
];

const roleStyles: Record<string, string> = {
  Admin: "bg-[#e0f7ff] text-[#00b2f6]",
  Editor: "bg-[#fff3e0] text-[#ff9800]",
  Journalist: "bg-[#f3e5f5] text-[#9c27b0]",
  Reader: "bg-[#e8f5e9] text-[#4caf50]",
};

const statusStyles: Record<string, string> = {
  Active: "bg-[#6366f1] text-white",
  Offline: "bg-[#cbd5e1] text-[#64748b]",
  Unconfirmed: "bg-[#1e293b] text-white",
  Banned: "bg-[#ef4444] text-white",
};

export default function UsersDashboard() {
  const [usersList, setUsersList] = useState<DashboardUser[]>(initialUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.includes(search)
  );

  const handleAddUser = () => {
    const randomId = Math.floor(800100 + Math.random() * 900).toString();
    const mockUser: DashboardUser = {
      id: randomId,
      name: "New Guest User",
      email: "guest.user@afs.rw",
      phone: "+201 9451286",
      region: "Indonesia",
      role: "Reader",
      status: "Active",
      lastActivity: "2026-06-12 17:25:00",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    };
    setUsersList([mockUser, ...usersList]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-[#475569] antialiased">
      
      {/* Sidebar - Precise UI Form Factor */}
      <aside className="w-[90px] bg-[#2a3054] flex flex-col items-center justify-between py-8 shrink-0 select-none">
        <div className="w-full flex flex-col items-center gap-12">
          {/* Main Logo Graphic */}
          <div className="flex gap-1 items-end justify-center">
            <div className="w-1.5 h-5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-7 bg-white rounded-full" />
            <div className="w-1.5 h-4 bg-white/60 rounded-full" />
          </div>

          {/* Icon Array Layout */}
          <nav className="w-full flex flex-col items-center gap-4">
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><Home size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><LayoutGrid size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><PieChart size={20} /></button>
            <button className="p-3 bg-[#6366f1] text-white shadow-lg shadow-indigo-600/30 rounded-xl"><Users2 size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><MessageSquare size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><Folder size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><FileText size={20} /></button>
            <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl"><ShieldCheck size={20} /></button>
          </nav>
        </div>

        <button className="p-3 text-white/40 hover:text-white transition-colors"><LogOut size={20} /></button>
      </aside>

      {/* Main Framework Viewport */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Minimal Search & Admin Header Context */}
        <header className="bg-white h-20 border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Users Data</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <input 
                type="text" 
                placeholder="Typing to search the data..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#f1f5f9] text-slate-700 placeholder-slate-400 text-xs pl-4 pr-10 py-2.5 rounded-xl border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all"
              />
              <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="w-px h-6 bg-slate-200" />
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">Name of admin</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Admin" className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-sm" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-grow p-10 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          
          {/* Breadcrumbs & Operational Control Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
              <span>Home</span>/<span>Dashboard</span>/<span className="text-slate-800 font-semibold">Users Data</span>
            </div>

            <div className="flex items-center flex-wrap gap-2 text-xs font-bold text-slate-700">
              <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-colors shadow-sm">
                <Download size={14} className="text-slate-400" />
                Download Data
              </button>
              <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-colors shadow-sm">
                <SlidersHorizontal size={14} className="text-slate-400" />
                Filter
              </button>
              <select className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none shadow-sm text-slate-700 font-bold bg-none cursor-pointer">
                <option>All Users</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Journalist</option>
              </select>
              <button onClick={handleAddUser} className="flex items-center gap-2 bg-[#6366f1] text-white rounded-xl px-5 py-2.5 hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-600/10 ml-2">
                <UserPlus size={14} />
                Add User
              </button>
            </div>
          </div>

          {/* High Fidelity Clean Data Table Panel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4 font-semibold w-24">ID</th>
                    <th className="px-6 py-4 font-semibold">Full Name</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Number</th>
                    <th className="px-6 py-4 font-semibold">Region</th>
                    <th className="px-6 py-4 font-semibold text-center w-28">Role</th>
                    <th className="px-6 py-4 font-semibold text-center w-32">Status</th>
                    <th className="px-6 py-4 font-semibold">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4.5 font-mono text-slate-400 text-[11px]">{user.id}</td>
                      
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-inner" />
                          <span className="text-slate-800 font-bold tracking-tight text-sm">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4.5 text-slate-500 font-normal">{user.email}</td>
                      <td className="px-6 py-4.5 text-slate-500 font-mono text-[11px]">{user.phone}</td>
                      <td className="px-6 py-4.5 text-slate-500">{user.region}</td>
                      
                      <td className="px-6 py-4.5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold w-20 tracking-wider uppercase ${roleStyles[user.role] || "bg-slate-100 text-slate-700"}`}>
                          {user.role === "Reader" ? "User" : user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4.5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold w-24 tracking-wider uppercase ${statusStyles[user.status]}`}>
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4.5 font-mono text-slate-400 text-[11px]">{user.lastActivity}</td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center text-slate-400 font-medium text-sm">
                        No custom database users found matching that query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Alignment */}
            <div className="bg-white px-8 py-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px] font-bold tracking-wide">
              <span>Showing 1-{filteredUsers.length} of {usersList.length} Sellers</span>
              
              <div className="flex items-center gap-2 text-slate-500">
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white shadow-sm"><ChevronLeft size={14} /></button>
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white shadow-sm"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}