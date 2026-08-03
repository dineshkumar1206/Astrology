import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
import {
  Loader2,
  Package,
  IndianRupee,
  Search,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Wallet,
  User,
  CalendarDays
} from 'lucide-react';

const STATUS_STYLES = {
  CONFIRMED: 'bg-green-500/10 text-green-600 border-green-500/30',
  PENDING: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  COMPLETED: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  CANCELLED: 'bg-red-500/10 text-red-600 border-red-500/30'
};

const STATUS_LABELS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

export default function Orders() {
  const token = useSelector(state => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(Array.isArray(res.data?.orders) ? res.data.orders : []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => {
      const email = (o.customerInfo?.email || '').toLowerCase();
      const name = (o.customerInfo?.name || '').toLowerCase();
      const phone = (o.customerInfo?.phone || '').toLowerCase();
      return email.includes(q) || name.includes(q) || phone.includes(q);
    });
  }, [orders, search]);

  const totalRevenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
  const totalItems = orders.reduce(
    (s, o) => s + (Array.isArray(o.items) ? o.items.reduce((a, it) => a + (Number(it.quantity) || 1), 0) : 0),
    0
  );
  const pendingCount = orders.filter((o) => o.status === 'PENDING').length;

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#D9B56A]/10 pb-6">
        <div>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
            Orders
          </h2>
          <p className="text-[13px] text-[#3E2F48] mt-1">
            View every order placed on the store, along with the customer who placed it.
          </p>
        </div>
        <div className="relative w-full md:w-[300px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3E2F48]/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email, name or phone..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 text-[13px] focus:outline-none focus:border-[#D9B56A]/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#D9B56A] to-[#B8904A] rounded-xl p-5 text-[#2A1635] shadow-[0_8px_25px_rgba(217,181,106,0.25)]">
          <div className="flex items-center gap-3">
            <div className="bg-white/25 rounded-lg p-2.5">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none">{orders.length}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider mt-1 opacity-80">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D9B56A]/15 rounded-xl p-5 shadow-[0_8px_25px_rgba(42,22,53,0.05)]">
          <div className="flex items-center gap-3">
            <div className="bg-[#D9B56A]/10 text-[#D9B56A] rounded-lg p-2.5">
              <IndianRupee size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none text-[#2A1635]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-[#3E2F48] opacity-70">Total Revenue</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D9B56A]/15 rounded-xl p-5 shadow-[0_8px_25px_rgba(42,22,53,0.05)]">
          <div className="flex items-center gap-3">
            <div className="bg-[#D9B56A]/10 text-[#D9B56A] rounded-lg p-2.5">
              <Package size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none text-[#2A1635]">{totalItems}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-[#3E2F48] opacity-70">Items Sold</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D9B56A]/15 rounded-xl p-5 shadow-[0_8px_25px_rgba(42,22,53,0.05)]">
          <div className="flex items-center gap-3">
            <div className="bg-[#D9B56A]/10 text-[#D9B56A] rounded-lg p-2.5">
              <Wallet size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none text-[#2A1635]">{pendingCount}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-[#3E2F48] opacity-70">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading / Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
          <p className="text-[#3E2F48] text-sm font-sans">Loading orders...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6 font-sans">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Orders List */}
      {!loading && !error && (
        <>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-[#D9B56A]/20 rounded-xl font-sans">
              <ShoppingBag size={40} className="mx-auto mb-3 text-[#D9B56A]/40" />
              <p className="text-[#3E2F48] text-[15px]">
                {search ? 'No orders match your search.' : 'No orders have been placed yet.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredOrders.map((order) => {
                const customer = order.customerInfo || {};
                const status = order.status || 'PENDING';
                const isExpanded = expandedId === order.id;

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-[#D9B56A]/15 rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(42,22,53,0.04)] transition-all duration-200 hover:border-[#D9B56A]/35"
                  >
                    {/* Card Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-5">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="bg-gradient-to-br from-[#D9B56A]/25 to-[#D9B56A]/5 border border-[#D9B56A]/25 rounded-lg p-2.5 shrink-0">
                          <Mail size={18} className="text-[#D9B56A]" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-[15px] text-[#2A1635] truncate">
                            {customer.email || '—'}
                          </div>
                          <div className="text-[12px] text-[#3E2F48] mt-0.5 flex items-center gap-1.5">
                            <CalendarDays size={12} className="text-[#D9B56A]" />
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-[#D9B56A]/10 text-[#D9B56A] px-3 py-1.5 rounded-lg border border-[#D9B56A]/20">
                          #{order.id}
                        </span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${STATUS_STYLES[status] || STATUS_STYLES.PENDING}`}>
                          {STATUS_LABELS[status] || status}
                        </span>
                        <div className="text-[15px] font-bold text-[#2A1635]">
                          ₹{(Number(order.total) || 0).toLocaleString('en-IN')}
                        </div>
                        <button
                          onClick={() => toggleExpand(order.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#D9B56A] hover:text-[#2A1635] transition-colors cursor-pointer bg-transparent border border-[#D9B56A]/25 rounded-lg px-3 py-1.5 hover:border-[#D9B56A]"
                        >
                          {isExpanded ? 'Less' : 'Details'}
                          <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="border-t border-[#D9B56A]/10 p-5 bg-[#FBF9FF]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                          <div className="flex items-start gap-2.5">
                            <User size={16} className="text-[#D9B56A] mt-0.5 shrink-0" />
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-[#3E2F48] opacity-60 mb-1">Customer</div>
                              <div className="text-[13px] font-semibold text-[#2A1635]">{customer.name || '—'}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Phone size={16} className="text-[#D9B56A] mt-0.5 shrink-0" />
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-[#3E2F48] opacity-60 mb-1">Phone</div>
                              <div className="text-[13px] font-semibold text-[#2A1635]">{customer.phone || '—'}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <MapPin size={16} className="text-[#D9B56A] mt-0.5 shrink-0" />
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-[#3E2F48] opacity-60 mb-1">Address</div>
                              <div className="text-[13px] font-semibold text-[#2A1635] leading-relaxed">{customer.address || '—'}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-[#D9B56A]/10 rounded-lg overflow-hidden">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D9B56A] px-4 py-2.5 bg-[#D9B56A]/5 border-b border-[#D9B56A]/10">
                            Items Ordered ({Array.isArray(order.items) ? order.items.length : 0})
                          </div>
                          <div className="divide-y divide-[#D9B56A]/10">
                            {Array.isArray(order.items) && order.items.length > 0 ? (
                              order.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="w-6 h-6 rounded bg-[#D9B56A]/10 text-[#D9B56A] flex items-center justify-center text-[11px] font-bold shrink-0">
                                      {i + 1}
                                    </span>
                                    <span className="text-[13px] font-medium text-[#2A1635] truncate">{item.name}</span>
                                  </div>
                                  <div className="flex items-center gap-4 shrink-0">
                                    <span className="text-[12px] text-[#3E2F48]">Qty: {item.quantity || 1}</span>
                                    <span className="text-[13px] font-bold text-[#2A1635]">
                                      ₹{(Number(item.price || 0) * (Number(item.quantity) || 1)).toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-[13px] text-[#3E2F48]">No item details recorded.</div>
                            )}
                          </div>
                          <div className="flex justify-end gap-6 px-4 py-3 bg-[#D9B56A]/5 border-t border-[#D9B56A]/10">
                            <div className="text-[12px] text-[#3E2F48]">
                              Payment: <span className="font-semibold text-[#2A1635]">{order.paymentMethod || '—'}</span>
                            </div>
                            <div className="text-[12px] font-bold uppercase tracking-wider text-[#2A1635]">
                              Total: <span className="text-[#D9B56A]">₹{(Number(order.total) || 0).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
