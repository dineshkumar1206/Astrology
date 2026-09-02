import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Globe, LogOut, Menu, X, ChevronDown, Settings, Package, MessageSquareQuote } from 'lucide-react';

const CRYSTAL_CATEGORIES_DEFAULT = ['Rasi', 'Bracelet', 'Pyrite', 'Rings', 'Pendants', 'Tumbles', 'Crystal balls', 'Pyrite frames', 'Crystal mala', 'Crystal tower'];
const SERVICE_CATEGORIES_LEFT_DEFAULT = [
  'Tarot Private Consultation',
  'Spiritual Healing'
];
const SERVICE_CATEGORIES_RIGHT_DEFAULT = [
  'Murugar Cards',
  'Tarot Card Reading',
  'Spiritual Counseling',
  'Kali Pooja'
];

export default function AdminNavbar({ 
  user = {}, 
  activeCategory, 
  setActiveCategory, 
  handleSignOut,
  categories = []
}) {
  const [isCrystalsOpen, setIsCrystalsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  // Close mobile menu when category changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeCategory]);

  const crystalCategories = categories.length > 0
    ? categories.filter(c => c.type === 'crystal').map(c => c.name)
    : CRYSTAL_CATEGORIES_DEFAULT;

  const serviceCategories = categories.length > 0
    ? categories.filter(c => c.type === 'service').map(c => c.name)
    : [...SERVICE_CATEGORIES_LEFT_DEFAULT, ...SERVICE_CATEGORIES_RIGHT_DEFAULT];

  const serviceCategoriesLeft = categories.length > 0 
    ? serviceCategories.slice(0, 2) 
    : SERVICE_CATEGORIES_LEFT_DEFAULT;

  const serviceCategoriesRight = categories.length > 0 
    ? serviceCategories.slice(2) 
    : SERVICE_CATEGORIES_RIGHT_DEFAULT;

  return (
    <header className="bg-[#0B1225]/95 backdrop-blur-md border-b border-[#D9B56A]/20 w-full z-50 sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 min-h-[76px] flex justify-between items-center gap-4">
        
        {/* 1. BRANDING & ACTIONS (Left) */}
        <div className="flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#D9B56A]/20 to-[#D9B56A]/5 border border-[#D9B56A]/40 shadow-[0_0_10px_rgba(217,181,106,0.1)] rounded-xl p-2 text-[#D9B56A]">
              <LayoutDashboard size={18} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.15em] uppercase font-['Cinzel',sans-serif] leading-tight whitespace-nowrap">
                Saraa Tarot
              </h1>
              <p className="text-[8px] text-[#D9B56A] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
                Control Desk
              </p>
            </div>
          </div>

          {/* ACTIONS & USER INFO (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActiveCategory('_orders')}
              className={`flex items-center gap-1 px-1.5 xl:px-2.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-semibold transition-all duration-200 border cursor-pointer ${
                activeCategory === '_orders'
                  ? 'bg-[#D9B56A]/15 border-[#D9B56A]/40 text-[#D9B56A]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              <Package size={12} />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveCategory('_testimonials')}
              className={`flex items-center gap-1 px-1.5 xl:px-2.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-semibold transition-all duration-200 border cursor-pointer ${
                activeCategory === '_testimonials'
                  ? 'bg-[#D9B56A]/15 border-[#D9B56A]/40 text-[#D9B56A]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              <MessageSquareQuote size={12} />
              <span className="hidden xl:inline">Testimonials</span>
              <span className="xl:hidden">Reviews</span>
            </button>

            <button
              onClick={() => setActiveCategory('_manage_menus')}
              className={`flex items-center gap-1 px-1.5 xl:px-2.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-semibold transition-all duration-200 border cursor-pointer ${
                activeCategory === '_manage_menus'
                  ? 'bg-[#D9B56A]/15 border-[#D9B56A]/40 text-[#D9B56A]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              <Settings size={12} />
              <span className="hidden xl:inline">Manage Menus</span>
              <span className="xl:hidden">Menus</span>
            </button>

            {/* Admin Profile Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAdminDropdownOpen(true)}
              onMouseLeave={() => setIsAdminDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 xl:gap-2 px-1.5 xl:px-2.5 py-1.5 rounded-lg border border-[#D9B56A]/15 hover:border-[#D9B56A]/40 transition-all cursor-pointer bg-[#1c1635]/30 text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-[11px] font-semibold text-white truncate max-w-[100px] xl:max-w-[120px] leading-tight">
                    {user?.email || 'Admin'}
                  </span>
                  <span className="text-[7px] xl:text-[8px] text-[#D9B56A] uppercase font-bold tracking-widest mt-0.5 hidden xl:block">
                    Administrator
                  </span>
                </div>
                <ChevronDown size={10} className="text-[#D9B56A] transition-transform duration-300" style={{ transform: isAdminDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {/* Profile Options Dropdown */}
              {isAdminDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 z-50">
                  <div className="bg-[#0B1225] border border-[#D9B56A]/25 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-1.5 w-44 flex flex-col backdrop-blur-xl">
                    <a
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold text-[#B7AFC7] hover:bg-[#1c1635] hover:text-white transition-colors"
                    >
                      <Globe size={13} />
                      <span>Back to Site</span>
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors w-full text-left cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. DESKTOP NAVIGATION (Center) */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5 px-2 font-sans text-[10px] xl:text-[11px]">
          {serviceCategoriesLeft.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-1.5 xl:px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Crystals Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCrystalsOpen(true)}
            onMouseLeave={() => setIsCrystalsOpen(false)}
          >
            <button
              onClick={() => {
                if (!crystalCategories.includes(activeCategory) && crystalCategories.length > 0) {
                  setActiveCategory(crystalCategories[0]);
                }
              }}
              className={`flex items-center gap-0.5 xl:gap-1 px-1.5 xl:px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                crystalCategories.includes(activeCategory)
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              <span>Crystals</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isCrystalsOpen ? 'rotate-180 text-[#D9B56A]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isCrystalsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-40">
                <div className="bg-[#0B1225] border border-[#D9B56A]/25 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-1.5 w-44 flex flex-col backdrop-blur-xl">
                  {crystalCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsCrystalsOpen(false);
                      }}
                      className={`px-4 py-2 text-left text-[11px] font-semibold transition-colors cursor-pointer ${
                        activeCategory === cat 
                        ? 'bg-[#D9B56A]/10 text-[#D9B56A] border-l-2 border-[#D9B56A]' 
                        : 'text-[#B7AFC7] border-l-2 border-transparent hover:bg-[#1c1635] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {serviceCategoriesRight.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-1.5 xl:px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D9B56A]/10 border-[#D9B56A]/40 text-[#D9B56A] shadow-[0_0_15px_rgba(217,181,106,0.05)]'
                  : 'text-[#B7AFC7] border-transparent hover:text-white hover:bg-[#1c1635]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>



        {/* 4. MOBILE / TABLET MENU TOGGLE (Shows below lg breakpoint) */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveCategory('_orders')}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              activeCategory === '_orders'
                ? 'bg-[#D9B56A]/20 border-[#D9B56A] text-[#D9B56A]'
                : 'bg-[#D9B56A]/5 border-[#D9B56A]/20 text-[#B7AFC7] hover:text-white'
            }`}
            title="Orders"
          >
            <Package size={16} />
          </button>

          <button
            onClick={() => setActiveCategory('_testimonials')}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              activeCategory === '_testimonials'
                ? 'bg-[#D9B56A]/20 border-[#D9B56A] text-[#D9B56A]'
                : 'bg-[#D9B56A]/5 border-[#D9B56A]/20 text-[#B7AFC7] hover:text-white'
            }`}
            title="Testimonials"
          >
            <MessageSquareQuote size={16} />
          </button>

          <button
            onClick={() => setActiveCategory('_manage_menus')}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              activeCategory === '_manage_menus'
                ? 'bg-[#D9B56A]/20 border-[#D9B56A] text-[#D9B56A]'
                : 'bg-[#D9B56A]/5 border-[#D9B56A]/20 text-[#B7AFC7] hover:text-white'
            }`}
            title="Manage Menus"
          >
            <Settings size={16} />
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-[#D9B56A]/10 border border-[#D9B56A]/30 text-[#D9B56A] rounded-lg cursor-pointer hover:bg-[#D9B56A]/20 transition-colors"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* 5. MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B1225] border-b border-[#D9B56A]/20 shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto z-50">
          <div className="flex flex-col p-4 gap-2 font-sans">
            
            <div className="text-[10px] text-[#B7AFC7] font-bold uppercase tracking-widest px-3 mb-1 mt-2">
              Categories
            </div>
            
            {serviceCategoriesLeft.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-[12px] font-semibold text-left transition-colors ${
                  activeCategory === cat 
                  ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                  : 'text-[#B7AFC7] hover:bg-[#1c1635]'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="bg-[#1c1635]/40 rounded-lg p-2 my-1 border border-[#D9B56A]/10">
              <div className="text-[10px] text-[#D9B56A] font-bold uppercase tracking-widest px-2 mb-1.5 mt-1">
                Crystals
              </div>
              <div className="grid grid-cols-2 gap-1">
                {crystalCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-2 rounded-md text-[11px] font-semibold text-left transition-colors ${
                      activeCategory === cat 
                      ? 'bg-[#D9B56A]/20 text-[#D9B56A]' 
                      : 'text-[#B7AFC7] hover:bg-[#0B1225]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {serviceCategoriesRight.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-[12px] font-semibold text-left transition-colors ${
                  activeCategory === cat 
                  ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                  : 'text-[#B7AFC7] hover:bg-[#1c1635]'
                }`}
              >
                {cat}
              </button>
            ))}

            <hr className="border-[#D9B56A]/10 my-3" />

            <button
              onClick={() => setActiveCategory('_orders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_orders' 
                ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <Package size={14} />
              <span>View Orders</span>
            </button>

            <button
              onClick={() => setActiveCategory('_testimonials')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_testimonials' 
                ? 'bg-[#D9B56A]/15 text-[#D9B56A]' 
                : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <MessageSquareQuote size={14} />
              <span>Manage Testimonials</span>
            </button>

            <a
              href="/"
              className="flex items-center gap-2 text-[#B7AFC7] hover:text-white px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors"
            >
              <Globe size={14} />
              <span>Return to Main Website</span>
            </a>

            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 px-4 py-2.5 rounded-lg text-[12px] font-semibold mt-2"
            >
              <LogOut size={14} />
              <span>Sign Out ({user?.email || 'Admin'})</span>
            </button>
            
          </div>
        </div>
      )}
    </header>
  );
}