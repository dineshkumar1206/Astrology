import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Package, MessageSquareQuote, Settings, Home, LogOut, Globe } from 'lucide-react';

const CRYSTAL_CATEGORIES_DEFAULT = ['Rasi', 'Bracelet', 'Pyrite', 'Rings', 'Pendants', 'Tumbles', 'Crystal balls', 'Pyrite frames', 'Crystal mala', 'Crystal tower'];
const SERVICE_CATEGORIES_LEFT_DEFAULT = ['Tarot Private Consultation', 'Spiritual Healing'];
const SERVICE_CATEGORIES_RIGHT_DEFAULT = ['Murugar Cards', 'Tarot Card Reading', 'Spiritual Counseling', 'Kali Pooja'];

export default function AdminNavbar({ 
  user = {}, 
  activeCategory, 
  setActiveCategory, 
  handleSignOut,
  categories = []
}) {
  const [isCrystalsOpen, setIsCrystalsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeCategory]);

  const crystalCategories = categories.length > 0
    ? categories.filter(c => c.type === 'crystal').map(c => c.name)
    : CRYSTAL_CATEGORIES_DEFAULT;

  const serviceCategories = categories.length > 0
    ? categories.filter(c => c.type === 'service').map(c => c.name)
    : [...SERVICE_CATEGORIES_LEFT_DEFAULT, ...SERVICE_CATEGORIES_RIGHT_DEFAULT];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#D9B56A]/20 w-full z-40 sticky top-0 shadow-sm">
      <div className="max-w-full px-4 md:px-6 py-3 min-h-[76px] flex justify-between lg:justify-center items-center gap-4">
        
        {/* DESKTOP NAVIGATION (Center) */}
        <nav className="hidden lg:flex flex-wrap items-center justify-center gap-2 px-2 font-sans text-[11px] xl:text-[12px]">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B1225] text-[#D9B56A] shadow-md'
                  : 'text-[#2A1635] hover:bg-[#F8F6FF] hover:text-[#0B1225]'
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
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                crystalCategories.includes(activeCategory)
                  ? 'bg-[#0B1225] text-[#D9B56A] shadow-md'
                  : 'text-[#2A1635] hover:bg-[#F8F6FF] hover:text-[#0B1225]'
              }`}
            >
              <span>Crystals</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCrystalsOpen ? 'rotate-180 text-[#D9B56A]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isCrystalsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-40">
                <div className="bg-white border border-[#D9B56A]/25 rounded-xl shadow-xl py-2 w-48 flex flex-col">
                  {crystalCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsCrystalsOpen(false);
                      }}
                      className={`px-4 py-2.5 text-left text-[12px] font-semibold transition-colors cursor-pointer ${
                        activeCategory === cat 
                        ? 'bg-[#0B1225]/5 text-[#0B1225] border-l-2 border-[#D9B56A]' 
                        : 'text-[#2A1635] border-l-2 border-transparent hover:bg-[#F8F6FF] hover:text-[#0B1225]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* MOBILE / TABLET MENU TOGGLE */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <span className="font-['Cinzel'] font-bold text-[#0B1225] tracking-wide text-lg">Saraa Tarot</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-[#D9B56A]/10 border border-[#D9B56A]/30 text-[#0B1225] rounded-lg cursor-pointer hover:bg-[#D9B56A]/20 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B1225] border-b border-[#D9B56A]/20 shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto z-50">
          <div className="flex flex-col p-4 gap-2 font-sans">
            
            {/* Mobile Main Menu items */}
            <div className="text-[10px] text-[#D9B56A] font-bold uppercase tracking-widest px-3 mb-1 mt-2">
              Main Menu
            </div>
            
            <button
              onClick={() => setActiveCategory('_dashboard')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_dashboard' ? 'bg-[#D9B56A]/15 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <Home size={14} /> <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveCategory('_orders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_orders' ? 'bg-[#D9B56A]/15 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <Package size={14} /> <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveCategory('_testimonials')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_testimonials' ? 'bg-[#D9B56A]/15 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <MessageSquareQuote size={14} /> <span>Testimonials</span>
            </button>
            <button
              onClick={() => setActiveCategory('_manage_menus')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeCategory === '_manage_menus' ? 'bg-[#D9B56A]/15 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#1c1635]'
              }`}
            >
              <Settings size={14} /> <span>Manage Menus</span>
            </button>

            <hr className="border-[#D9B56A]/10 my-3" />

            {/* Categories */}
            <div className="text-[10px] text-[#D9B56A] font-bold uppercase tracking-widest px-3 mb-1">
              Categories
            </div>
            
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-[12px] font-semibold text-left transition-colors ${
                  activeCategory === cat ? 'bg-[#D9B56A]/15 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#1c1635]'
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
                      activeCategory === cat ? 'bg-[#D9B56A]/20 text-[#D9B56A]' : 'text-[#B7AFC7] hover:bg-[#0B1225]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#D9B56A]/10 my-3" />

            <a href="/" className="flex items-center gap-2 text-[#B7AFC7] hover:text-white px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-colors">
              <Globe size={14} /> <span>Return to Main Website</span>
            </a>

            <button onClick={handleSignOut} className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 px-4 py-2.5 rounded-lg text-[12px] font-semibold mt-2">
              <LogOut size={14} /> <span>Sign Out</span>
            </button>
            
          </div>
        </div>
      )}
    </header>
  );
}