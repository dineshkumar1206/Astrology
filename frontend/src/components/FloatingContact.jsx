import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+91 96551 99507';
  // formatting for links
  const waNumber = '919655199507';
  const whatsappUrl = `https://wa.me/${waNumber}`;
  const callUrl = `tel:+${waNumber}`;

  return (
    <div className="fixed bottom-[85px] right-[25px] z-50 flex flex-col-reverse items-end gap-3">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 focus:outline-none"
        aria-label="Contact Options"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Expanded Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-end gap-3 mb-2 mr-1"
          >
            {/* WhatsApp Option */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-50 transition-all duration-300 group"
            >
              <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold whitespace-nowrap pr-2">WhatsApp Us</span>
            </a>

            {/* Phone Call Option */}
            <a
              href={callUrl}
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Phone size={20} />
              </div>
              <span className="text-gray-800 font-semibold whitespace-nowrap pr-2">Call {phoneNumber}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
