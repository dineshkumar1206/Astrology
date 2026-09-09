import React, { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../api/client';
import { Users, UserCheck, Activity, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Overview() {
  const [data, setData] = useState({ uniqueVisitors: 0, uniqueLogins: 0, recentLogins: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/api/analytics/overview');
        setData(response.data);
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to fetch analytics data.'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-full">
        <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
        <p className="text-[#3E2F48] text-sm">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 font-sans">
        <AlertCircle size={20} />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  // Group logins by date
  const groupedLogins = {};
  if (data.recentLogins) {
    data.recentLogins.forEach(login => {
      const date = new Date(login.createdAt);
      const dateKey = date.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      if (!groupedLogins[dateKey]) {
        groupedLogins[dateKey] = [];
      }
      groupedLogins[dateKey].push(login);
    });
  }

  return (
    <div className="font-sans space-y-8 animate-fade-in pb-10">
      <div className="border-b border-[#D9B56A]/10 pb-4">
        <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
          Dashboard Overview
        </h2>
        <p className="text-[13px] text-[#3E2F48] mt-1">
          Monitor your website's traffic and user login activities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#D9B56A]/15 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#D9B56A]/30 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#3E2F48] uppercase tracking-[1px] font-semibold mb-1">Total Visitors</p>
            <h3 className="text-3xl font-bold text-[#2A1635]">{data.uniqueVisitors}</h3>
          </div>
          <div className="bg-[#D9B56A]/10 p-4 rounded-full text-[#D9B56A]">
            <Activity size={28} strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white border border-[#D9B56A]/15 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#D9B56A]/30 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#3E2F48] uppercase tracking-[1px] font-semibold mb-1">Total Logged-in Users</p>
            <h3 className="text-3xl font-bold text-[#2A1635]">{data.uniqueLogins}</h3>
          </div>
          <div className="bg-[#D9B56A]/10 p-4 rounded-full text-[#D9B56A]">
            <Users size={28} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Logins By Date Section */}
      <div className="bg-white border border-[#D9B56A]/15 rounded-xl overflow-hidden shadow-sm mt-8">
        <div className="p-5 border-b border-[#D9B56A]/10 bg-[#FAFAFA] flex items-center justify-between">
          <h3 className="font-['Cinzel'] text-lg font-semibold text-[#2A1635]">Logins by Date</h3>
        </div>
        
        <div className="p-0">
          {Object.keys(groupedLogins).length > 0 ? (
            Object.entries(groupedLogins).map(([dateStr, logins], groupIdx) => (
              <div key={dateStr} className={`w-full ${groupIdx !== 0 ? 'border-t border-[#D9B56A]/15' : ''}`}>
                {/* Date Header */}
                <div className="bg-[#F5F0FF]/40 px-6 py-3 border-b border-[#D9B56A]/5 flex items-center justify-between">
                  <span className="font-bold text-[13px] text-[#2A1635] uppercase tracking-wider">{dateStr}</span>
                  <span className="inline-flex items-center justify-center bg-[#D9B56A]/15 text-[#D9B56A] font-bold border border-[#D9B56A]/20 px-3 py-1 rounded-full text-[11px] min-w-[40px]">
                    {logins.length} {logins.length === 1 ? 'Login' : 'Logins'}
                  </span>
                </div>
                
                {/* Logins Table for this Date */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white text-[10px] uppercase tracking-widest text-[#3E2F48]/70 font-semibold border-b border-[#D9B56A]/5">
                        <th className="px-6 py-2.5 w-1/3">User</th>
                        <th className="px-6 py-2.5 w-1/4">Email</th>
                        <th className="px-6 py-2.5 w-1/6">Method</th>
                        <th className="px-6 py-2.5 w-1/6">IP Address</th>
                        <th className="px-6 py-2.5 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logins.map((login, idx) => (
                        <tr key={login.id} className={`hover:bg-[#F5F0FF]/30 transition-colors ${idx !== logins.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-[#D9B56A]/10 flex items-center justify-center text-[#D9B56A] font-bold text-[10px] border border-[#D9B56A]/20">
                                {login.User?.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <span className="font-semibold text-[13px] text-[#2A1635]">
                                {login.User?.name || 'Unknown'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-[12px] text-[#3E2F48]">
                            {login.User?.email || 'N/A'}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              login.loginMethod === 'google' 
                                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                : 'bg-[#D9B56A]/10 text-[#D9B56A] border border-[#D9B56A]/20'
                            }`}>
                              {login.loginMethod}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-[11px] text-[#3E2F48] opacity-70">
                            {login.ipAddress || 'Unknown'}
                          </td>
                          <td className="px-6 py-3.5 text-[11px] text-[#3E2F48] text-right font-medium">
                            {new Date(login.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-[#3E2F48] text-sm">
              No login history found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
