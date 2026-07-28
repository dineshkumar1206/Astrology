import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_PHONE = '919999999999';
const MERCHANT_UPI_ID = '50100234981123@hdfcbank';
const MERCHANT_NAME = 'SARAA TAROT SERVICES';

export default function Checkout({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [lastOrderDetails, setLastOrderDetails] = useState({ items: [], total: 0 });

  const itemsTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = itemsTotalAmount;

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const upiLink = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${grandTotal}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handlePay = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    setLastOrderDetails({
      items: cartItems.map(item => `${item.name} (Qty: ${item.quantity})`),
      total: grandTotal
    });

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCartItems([]);
    }, 2000);
  };

  if (isSuccess) {
    const orderItemsText = lastOrderDetails.items.join(', ');
    const messageText = `Hi Saraa Tarot, I have placed an order for: ${orderItemsText}. Total Amount: ₹${lastOrderDetails.total.toLocaleString('en-IN')}. Please confirm my booking.`;
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageText)}`;

    return (
      <div className="bg-sara-dark min-h-[85vh] flex justify-center items-center text-sara-white font-sans p-8">
        <div className="bg-sara-panel border border-[rgba(214,178,106,0.15)] rounded-lg px-12 py-12 max-w-[500px] w-full text-center shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
          <div className="text-[4.5rem] text-sara-gold mb-4">✓</div>
          <h2 className="text-[1.8rem] font-normal text-sara-gold mb-5 uppercase tracking-[1px]">
            Booking Received
          </h2>
          <p className="text-sara-white text-[15px] leading-relaxed mb-10">
            Your booking request has been registered. Please send the payment confirmation screenshot on WhatsApp or message to activate your ritual sankalpam.
          </p>

          <div className="flex flex-col gap-4 w-full">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white border-none py-[1.1rem] px-8 text-[14px] font-bold uppercase tracking-[1px] no-underline cursor-pointer rounded flex items-center justify-center gap-[10px] transition-opacity hover:opacity-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.414 9.866-9.843.002-2.63-1.023-5.101-2.886-6.968C16.383 1.928 13.911.906 11.282.906c-5.442 0-9.873 4.414-9.877 9.846 0 1.635.489 3.223 1.411 4.61l-.995 3.635 3.731-.977zm11.367-5.463c-.305-.153-1.802-.889-2.08-.99-.278-.101-.48-.153-.68.153-.2.305-.778 1.01-.954 1.21-.176.2-.353.228-.658.076-.305-.153-1.286-.474-2.45-1.512-.906-.809-1.517-1.809-1.695-2.114-.177-.305-.019-.47.133-.621.137-.136.305-.356.458-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.153-.68-1.639-.933-2.247-.246-.593-.497-.513-.68-.522-.176-.008-.378-.01-.58-.01-.202 0-.531.076-.809.381-.278.305-1.062 1.037-1.062 2.531 0 1.493 1.088 2.935 1.238 3.138.15.203 2.14 3.267 5.185 4.578.725.312 1.29.499 1.732.64.73.232 1.393.197 1.917.12.584-.087 1.802-.736 2.057-1.448.255-.713.255-1.323.179-1.448-.076-.125-.278-.203-.584-.356z"/>
              </svg>
              Confirm on WhatsApp
            </a>

            <button
              onClick={() => navigate('/')}
              className="bg-transparent text-sara-gold border border-[rgba(214,178,106,0.3)] py-4 px-4 text-[13px] font-bold uppercase tracking-[1px] cursor-pointer rounded w-full transition-colors hover:bg-[rgba(214,178,106,0.08)]"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sara-dark min-h-[90vh] text-sara-white font-sans py-12 px-8">
      <div className="max-w-[1100px] mx-auto">

        <button
          onClick={() => navigate('/')}
          className="bg-transparent border-none text-sara-gold cursor-pointer text-[14px] font-medium uppercase tracking-[1px] flex items-center gap-2 mb-10 p-0"
        >
          ➔ Back to Services
        </button>

        <h1 className="text-sara-gold text-[2.2rem] font-light uppercase tracking-[1.5px] mb-10">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-lg:gap-10">

          <div className="bg-sara-panel border border-[rgba(214,178,106,0.15)] rounded-md p-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-medium mb-6 text-sara-gold uppercase tracking-[0.5px]">
              Select Payment Method
            </h3>

            <div className="flex gap-2 mb-8 flex-wrap">
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className="flex-[1_1_100px] py-[0.8rem] px-2 bg-[rgba(214,178,106,0.15)] text-sara-gold border border-sara-gold cursor-pointer rounded font-semibold text-[12px] uppercase tracking-[0.5px]"
              >
                QR Code
              </button>
            </div>

            <form onSubmit={handlePay}>
              {paymentMethod === 'qr' && (
                <div className="text-center mb-8">
                  <p className="text-[13px] text-sara-muted mb-6 uppercase tracking-[0.5px]">
                    Scan QR code with your UPI App to make payment
                  </p>
                  <div className="w-[200px] h-[200px] mx-auto mb-6 bg-sara-darkDeep rounded-lg p-3 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    {cartItems.length > 0 ? (
                      <img
                        src={qrImageUrl}
                        alt="Payment QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-sara-muted text-[12px] font-semibold">No active balance</div>
                    )}
                  </div>
                  <div className="text-sara-gold font-semibold text-[15px]">
                    Pay to: {MERCHANT_NAME}
                  </div>
                  <p className="text-[11px] text-sara-muted mt-2">
                    Your payment will settle directly into our linked bank account.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className={`w-full bg-gradient-to-r from-sara-gold to-sara-goldSoft text-sara-dark border-none rounded py-[1.1rem] text-[15px] font-bold uppercase tracking-[1px] flex justify-center items-center gap-[10px] transition-opacity ${
                  isProcessing || cartItems.length === 0 ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:opacity-90'
                }`}
              >
                {isProcessing
                  ? 'Processing...'
                  : `I Have Paid ₹${grandTotal.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          <div className="bg-sara-panel border border-[rgba(214,178,106,0.15)] rounded-md p-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-medium mb-6 text-sara-gold uppercase tracking-[0.5px]">
              Order Summary
            </h3>

            <div className="max-h-[320px] overflow-y-auto mb-6 pr-1">
              {cartItems.length === 0 ? (
                <p className="text-sara-muted text-[14px] text-center py-8">No items in checkout.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center justify-between mb-5 border-b border-[rgba(255,255,255,0.05)] pb-5">
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image || "/placeholder-item.jpg"}
                        alt={item.name}
                        className="w-[50px] h-[50px] object-cover rounded border border-[rgba(214,178,106,0.1)]"
                      />

                      <div>
                        <h4 className="m-0 mb-1 text-[13px] font-medium text-sara-white">{item.name}</h4>
                        <p className="m-0 text-[13px] text-sara-gold font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="bg-none border-none text-[#ef5350] cursor-pointer text-[16px] p-1 flex items-center"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[rgba(214,178,106,0.15)] pt-6">
                <div className="flex justify-between text-[13px] mb-3">
                  <span className="text-sara-muted">Items Total</span>
                  <span className="text-sara-white">₹{itemsTotalAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[16px] font-semibold border-t border-dashed border-[rgba(214,178,106,0.2)] pt-4 text-sara-gold">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
