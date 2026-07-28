import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const ITEMS_DATA = [
  {
    id: 'tarot-1-question',
    name: 'One Question Consultation',
    price: 500,
    type: 'Voice Note Only',
    desc: 'Submit 1 specific question. You will receive a detailed audio voice note explaining your cards and solutions.'
  },
  {
    id: 'tarot-30-mins',
    name: '30 Minutes Session',
    price: 2500,
    type: 'Live Call or Voice Note',
    desc: 'Covers up to 3 questions, detailed solutions, and interactive guidance.'
  },
  {
    id: 'tarot-1-hour',
    name: '1 Hour Session',
    price: 4000,
    type: 'Live Call or Voice Note',
    desc: 'Covers up to 7 questions, deep-dive solutions, remedies, and astrological chart guidance.'
  },
  {
    id: 'tarot-angel-messages',
    name: 'Angel Messages',
    price: 1500,
    type: 'Voice Note Only',
    desc: 'Receive special angel guidance and messages for 2 specific questions.'
  },
  {
    id: 'tarot-murugan-messages',
    name: 'Murugan Message Reading',
    price: 1500,
    type: 'Voice Note Only',
    desc: 'Specific guidance and messages for 2 questions via Sara Murugan Cards.'
  },
  {
    id: 'tarot-relationship',
    name: 'Relationship Specific Session',
    price: 3800,
    type: 'Live Call or Voice Note',
    desc: 'Specialized focus on relationship dynamics, healing, and compatibility analysis.'
  },
  {
    id: 'tarot-past-present-future',
    name: 'Past, Present & Future Reading',
    price: 6500,
    type: 'Live Call or Voice Note',
    desc: 'Comprehensive life spread analyzing your past influences, current state, and future paths.'
  },
  {
    id: 'tarot-past-life',
    name: 'Past Life Reading Session',
    price: 8000,
    type: 'Live Call or Voice Note',
    desc: 'Explore your past life karmas, lessons, and how they impact your current lifetime.'
  },
  {
    id: 'tarot-healing-session',
    name: 'Spiritual Healing Session (40 Mins)',
    price: 7000,
    type: 'Duration: 40 minutes',
    desc: 'Energy healing session tailored for relationships, money attraction, career, mental peace, or protection.'
  },
  {
    id: 'tarot-special-guidance',
    name: 'Special Spiritual Guidance & Remedies',
    price: 5000,
    type: 'Live Call or Zoom Call',
    desc: 'Holistic spiritual guidance combined with active remedies for wellness.'
  }
];

const POLICY_DATA = {
  intro: 'Dear Sir/Madam, please review our consultation guidelines below:',
  points: [
    'WhatsApp Call or Zoom Call options are available.',
    'Appointments will be given within 10 days from when the date of your payment is confirmed by you.',
    'Express Booking: If you want to get an appointment within 24 hours, you can pay an extra Rs. 1,000 for your selected session.'
  ]
};

export default function TarotConsultation({ cart = [], setCart, setIsCartOpen }) {
  const [expressChecked, setExpressChecked] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?category=Tarot Private Consultation`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch Tarot consultation products. Using fallback.', err);
        setItems(ITEMS_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    let finalPrice = item.price;
    let nameSuffix = '';

    if (expressChecked) {
      finalPrice += 1000;
      nameSuffix = ' (Express 24H)';
    }

    const cartItemId = expressChecked ? `${item.id}-express` : item.id;
    const existingItem = cart.find((c) => c.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === cartItemId
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: `${item.name}${nameSuffix}`,
          price: finalPrice,
          image: '/saraa-logo.jpeg',
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
          <span className="text-sara-gold">Tarot Reading Private Consultation</span>
        </div>

        {/* Header Section */}
        <div className="mb-16 border-b border-[rgba(214,178,106,0.15)] pb-10 bg-sara-darkDeep -mx-4 sm:-mx-8 px-4 sm:px-8 pt-16 pb-10 bg-[radial-gradient(ellipse_at_center,rgba(67,32,78,0.2)_0%,transparent_70%)]">
          <span className="text-sara-gold tracking-[2px] text-xs font-semibold uppercase">
            PERSONALIZED CELESTIAL GUIDANCE
          </span>
          <h1 className="text-sara-gold font-serif text-[2.8rem] font-normal mt-2 mb-6 uppercase tracking-[1px] leading-tight">
            Tarot Reading Private Consultation
          </h1>
          <p className="text-sara-muted text-[1.05rem] leading-7 max-w-[800px] m-0">
            Get deep clarity, practical solutions, and spiritual remedies for your life. All consultations are personalized and conducted by Sara via voice note or live call.
          </p>
        </div>

        <div className="flex flex-row gap-12 flex-wrap">
          
          {/* Items Listing Column */}
          <div className="flex-[2_1_600px]">
            <h3 className="text-sara-gold font-serif text-1.5rem mb-8 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1.5px] uppercase">
              Available Bookings
            </h3>

            {/* Express Booking Toggle */}
            <div 
              className="bg-[rgba(214,178,106,0.05)] border border-[rgba(214,178,106,0.3)] rounded p-5 mb-8 flex items-center gap-3 cursor-pointer"
              onClick={() => setExpressChecked(!expressChecked)}
            >
              <input 
                type="checkbox" 
                checked={expressChecked}
                onChange={() => {}}
                className="cursor-pointer w-[18px] h-[18px] accent-sara-gold" 
              />
              <div>
                <div className="font-semibold text-sara-gold text-sm tracking-[0.5px]">
                  ADD EXPRESS BOOKING (+ Rs. 1,000)
                </div>
                <div className="text-xs text-sara-muted mt-0.5">
                  Guarantees your appointment within 24 hours of payment verification (instead of the standard 10 days wait).
                </div>
              </div>
            </div>

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
                      ₹{(item.price + (expressChecked ? 1000 : 0)).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-sara-panel text-sara-gold border border-[rgba(214,178,106,0.3)] rounded-sm py-3 px-6 text-xs font-bold uppercase tracking-[1px] cursor-pointer transition-all w-full hover:bg-sara-gold hover:text-sara-dark"
                    >
                      Book & Add
                    </button>
                  </div>
                </div>
              ))
            )}
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
