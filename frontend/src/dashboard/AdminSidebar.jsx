import React from 'react';
import { LayoutDashboard, Globe, LogOut, Package, MessageSquareQuote, Settings, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSidebar({ user, activeCategory, setActiveCategory, handleSignOut }) {
  const menuItems = [
    { id: '_dashboard', label: 'Dashboard', icon: <Home size={16} /> },
    { id: '_orders', label: 'Orders', icon: <Package size={16} /> },
    { id: '_testimonials', label: 'Testimonials', icon: <MessageSquareQuote size={16} /> },
    { id: '_manage_menus', label: 'Manage Menus', icon: <Settings size={16} /> }
  ];

  return (
    <aside className="w-64 bg-[#0B1225] border-r border-[#D9B56A]/20 flex flex-col h-screen flex-shrink-0 z-50 sticky top-0 hidden lg:flex">
      {/* Branding */}
      <div className="p-6 border-b border-[#D9B56A]/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#D9B56A]/20 to-[#D9B56A]/5 border border-[#D9B56A]/40 shadow-[0_0_10px_rgba(217,181,106,0.1)] rounded-xl p-2 text-[#D9B56A]">
            <LayoutDashboard size={20} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-bold text-white tracking-[0.15em] uppercase font-['Cinzel',sans-serif] leading-tight">
              Saraa Tarot
            </h1>
            <p className="text-[9px] text-[#D9B56A] font-bold uppercase tracking-widest mt-0.5">
              Control Desk
            </p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-[#D9B56A]/10">
        <div className="flex flex-col bg-[#1c1635]/40 p-3 rounded-lg border border-[#D9B56A]/15">
          <span className="text-xs font-semibold text-white truncate w-full">
            {user?.email || 'Admin'}
          </span>
          <span className="text-[10px] text-[#D9B56A] uppercase font-bold tracking-widest mt-1">
            Administrator
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm cursor-pointer border ${
              activeCategory === item.id
                ? 'bg-[#D9B56A]/15 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#D9B56A]/10 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#B7AFC7] hover:bg-[#1c1635] hover:text-white transition-colors rounded-lg w-full"
        >
          <Globe size={14} />
          <span>Back to Site</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-lg w-full text-left cursor-pointer"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
