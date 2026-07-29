import React from 'react';

// High-quality portrait placeholders (Replace with your actual team photos)
const teamMembers = [
  {
    name: "Elena Rostova",
    role: "HEAD TAROT READER",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    socials: { fb: "#", tw: "#", ig: "#" }
  },
  {
    name: "Naya Solis",
    role: "RITUAL FACILITATOR",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    socials: { fb: "#", tw: "#", ig: "#" }
  },
  {
    name: "Julian Mercer",
    role: "ASTROLOGER",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    socials: { fb: "#", tw: "#", ig: "#" }
  }
];

export default function Team() {
  return (
    <section className="bg-[#F8F6FF] py-28 w-full box-border overflow-hidden">
      
      {/* Required for the fonts to load if not already in your index.html */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600&family=Parisienne&display=swap');
      `}</style>

      <div className="max-w-[1320px] mx-auto px-[6vw] box-border">
        
        {/* Section Header */}
        <div className="max-w-[800px]">
          <p className="m-0 mb-2 font-serif text-[18px] text-[#D9B56A] font-semibold tracking-[1px]">
            Soul Circle
          </p>
          <h2 className="m-0 font-serif text-[clamp(42px,6vw,68px)] font-normal text-[#2A1635] leading-[1.05] uppercase">
            The Kindred Spirits Guiding <span className="font-['Parisienne'] lowercase text-[#2A1635] text-[1.2em] font-light">Your</span> Journey
          </h2>
        </div>

        {/* 3-Column Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-10 mt-16 max-md:gap-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative w-full aspect-[3/4] md:aspect-[3/4.5] overflow-hidden cursor-pointer bg-[#FFFFFF] group">
              
              {/* Member Image with Zoom on Hover */}
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
              />
              
              {/* Dark Gradient Overlay - Fades in on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-0 transition-opacity duration-500 ease-in-out z-10 group-hover:opacity-100"></div>
              
              {/* Content block sliding up from bottom */}
              <div className="absolute bottom-0 left-0 w-full p-10 text-center translate-y-[30px] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20 box-border group-hover:translate-y-0 group-hover:opacity-100">
                
                {/* Member Name */}
                <h3 className="m-0 mb-1 font-serif text-[32px] font-normal text-[#2A1635]">
                  {member.name}
                </h3>
                
                {/* Member Role */}
                <p className="m-0 font-sans text-[11px] font-medium uppercase tracking-[2px] text-[#2A1635]">
                  {member.role}
                </p>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-3 mt-5">
                  <a href={member.socials.fb} className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#F8F6FF] text-[#2A1635] no-underline transition-all duration-300 hover:bg-[#D9B56A] hover:text-[#2A1635] hover:-translate-y-1" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href={member.socials.tw} className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#F8F6FF] text-[#2A1635] no-underline transition-all duration-300 hover:bg-[#D9B56A] hover:text-[#2A1635] hover:-translate-y-1" aria-label="Twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href={member.socials.ig} className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#F8F6FF] text-[#2A1635] no-underline transition-all duration-300 hover:bg-[#D9B56A] hover:text-[#2A1635] hover:-translate-y-1" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
                
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}