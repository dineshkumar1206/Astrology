import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const ITEMS_DATA = [
  {
    id: 'pooja-growth',
    name: 'Basic Kali Pooja for Growth',
    price: 2001,
    type: 'With Prasadham included',
    desc: 'A monthly Amavasya pooja dedicated to removing stagnation and inviting positive energy, success, and spiritual/material growth into your life.',
    image: '/card-1.jpg'
  },
  {
    id: 'pooja-relationship',
    name: 'Relationship Problems Pooja',
    price: 3001,
    type: 'Heal and harmonize your bonds',
    desc: 'Specially performed during Amavasya to clear misunderstandings, dissolve negative energies between couples or family members, and restore peace.',
    image: '/card-2.jpg'
  },
  {
    id: 'pooja-business',
    name: 'Business Kali Pooja',
    price: 5001,
    type: 'With Prasadham included',
    desc: 'Designed for entrepreneurs and professionals. Invokes Goddess Kali to eliminate corporate evil-eyes, overcome financial blocks, and attract wealth.',
    image: '/card-3.jpg'
  },
  {
    id: 'pooja-black-magic-individual',
    name: 'Black Magic Protection Pooja (Individual)',
    price: 30000,
    type: 'With complete protection materials & prasadham',
    desc: 'An intensive, protective ritual tailored for one individual struggling with severe negativity, unexplained psychological weight, or dark energy interference.',
    image: '/card-4.jpg'
  },
  {
    id: 'pooja-black-magic-family',
    name: 'Black Magic Protection Pooja (Family)',
    price: 50000,
    type: 'Complete protection shield for the whole family',
    desc: 'An expansive and powerful household-level ritual that cleanses your entire living space and creates an unbreakable protective aura around all family members.',
    image: '/card-5.jpg'
  }
];

const POLICY_DATA = {
  intro: 'Details Needed From Your Side for Pooja:',
  points: [
    'Full Name & Date of Birth (DOB) of participants.',
    'Rasi (Moon Sign) and Star.',
    'Specific purpose or prayer intentions.',
    'Prasadham will be couriered to your address post-pooja.'
  ]
};

export default function KaliPooja({ cart = [], setCart, setIsCartOpen }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?category=Kali Pooja`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch Kali Pooja products. Using fallback.', err);
        setItems(ITEMS_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    const existingItem = cart.find((c) => c.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image || '/saraa-logo.jpeg',
          quantity: 1
        }
      ]);
    }

    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-sara-dark text-sara-white font-sans pt-16 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="mb-10 text-[13px] tracking-[0.5px]">
          <Link to="/" className="text-sara-muted no-underline">Home</Link>
          <span className="text-[rgba(207,207,207,0.3)] mx-2">/</span>
          <span className="text-sara-gold">Sacred Kali Pooja</span>
        </div>

        {/* Header Section */}
        <div className="mb-16 border-b border-[rgba(214,178,106,0.15)] pb-10 bg-sara-darkDeep -mx-4 sm:-mx-8 px-4 sm:px-8 pt-16 pb-10 bg-[radial-gradient(ellipse_at_center,rgba(67,32,78,0.2)_0%,transparent_70%)]">
          <span className="text-sara-gold tracking-[2px] text-xs font-semibold uppercase">
            DIVINE PROTECTION & PROSPERITY
          </span>
          <h1 className="text-sara-gold font-serif text-[2.8rem] font-normal mt-2 mb-6 uppercase tracking-[1px] leading-tight">
            Sacred Kali Pooja
          </h1>
          <p className="text-sara-muted text-[1.05rem] leading-7 max-w-[800px] m-0">
            Powerful monthly Amavasya and special protective rituals dedicated to removing obstacles, evil eyes, dark entities, and financial blocks.
          </p>
        </div>

        <div className="flex flex-row gap-12 flex-wrap">
          
          {/* Items Listing Column */}
          <div className="flex-[2_1_600px]">
            <h3 className="text-sara-gold font-serif text-1.5rem mb-8 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1.5px] uppercase">
              Available Bookings
            </h3>

            <div className="flex flex-col gap-6">
              {loading ? (
                <div className="text-center py-12 text-sara-gold">
                  Loading offerings...
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12 text-sara-muted">
                  No offerings available.
                </div>
              ) : (
                items.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-sara-panel border border-[rgba(214,178,106,0.15)] rounded p-8 flex flex-row gap-6 flex-wrap items-center justify-between transition-all duration-300 hover:border-sara-gold hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  >
                    {item.image && (
                      <div className="w-[120px] h-[120px] rounded overflow-hidden border border-[rgba(214,178,106,0.2)]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-[1_1_280px]">
                      <div className="text-sara-gold text-[11px] uppercase tracking-[1px] font-semibold">
                        {item.type}
                      </div>
                      <h4 className="text-sara-white text-[1.35rem] mt-1 mb-2 font-medium">
                        {item.name}
                      </h4>
                      <p className="text-sara-muted text-[0.9rem] leading-5 m-0">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-center gap-3 min-w-[150px]">
                      <div className="text-sara-gold text-[1.75rem] font-semibold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-sara-panel text-sara-gold border border-[rgba(214,178,106,0.3)] rounded-sm py-3 px-6 text-xs font-bold uppercase tracking-[1px] cursor-pointer transition-all w-full hover:bg-sara-gold hover:text-sara-dark"
                      >
                        Book & Add
                      </button>
                    </div>
                  </div>
              )))}
            </div>
          </div>

          {/* Guidelines Sidebar Column */}
          <div className="flex-[1_1_300px]">
            <div className="bg-sara-panel border border-[rgba(214,178,106,0.25)] rounded-md p-8 sticky top-[120px] bg-gradient-to-b from-[rgba(214,178,106,0.02)] to-transparent">
              <h4 className="text-sara-gold font-serif text-[1.25rem] mb-5 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1px] uppercase">
                Important Notes
              </h4>
              <p className="text-sara-muted text-[0.95rem] leading-6 mb-6">
                {POLICY_DATA.intro}
              </p>
              
              <ul className="pl-5 m-0 text-sara-muted leading-7 text-[0.9rem]">
                {POLICY_DATA.points.map((pt, i) => (
                  <li key={i} className="mb-3 list-square">
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="border-t border-[rgba(214,178,106,0.15)] mt-8 pt-6 text-center">
                <span className="text-xs text-sara-muted block mb-4">
                  All sessions require pre-payment verification.
                </span>
                <Link 
                  to="/checkout" 
                  className="block bg-transparent text-sara-gold border border-[rgba(214,178,106,0.5)] py-3 no-underline text-xs font-semibold uppercase tracking-[1px] transition-all hover:bg-[rgba(214,178,106,0.1)] hover:border-sara-gold"
                >
                  View My Cart / Pay
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
