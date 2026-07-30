import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSuccess } from '../store/slices/authSlice';
import { API_BASE_URL } from '../config';
import { useLanguage } from '../context/LanguageContext';

export default function AdminLogin() {
  const { t } = useLanguage();
  const { user } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/admin-login`, { email, password });

      setLoading(false);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t('login.error'));
      }
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-16 bg-[#0B1225]">
      <div className="relative z-10 w-full max-w-[420px] rounded-2xl p-8 md:p-10 transition-all duration-500 bg-[#111827] border border-[rgba(223,186,107,0.2)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(223,186,107,0.1)] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DFBA6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="text-[12px] font-medium tracking-[3px] uppercase font-sans text-white">
            Admin Access
          </span>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-center tracking-wide mt-2 text-sara-gold">
            Admin Login
          </h2>
          <p className="text-[12px] text-white mt-2 font-sans">
            Authorized personnel only
          </p>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5 font-sans">
            <label className="block text-[11px] uppercase tracking-[1px] mb-2 font-medium text-white">
              {t('login.email')}
            </label>
            <input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              className="w-full px-4 py-3 rounded-lg border border-[rgba(223,186,107,0.15)] focus:outline-none focus:border-sara-gold transition-all duration-300 text-[14px] bg-[#1a1f33] text-white placeholder:text-[#6b6b80]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-8 font-sans relative">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[11px] uppercase tracking-[1px] font-medium text-white">
                {t('login.password')}
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('login.passwordPlaceholder')}
                className="w-full px-4 py-3 rounded-lg border border-[rgba(223,186,107,0.15)] focus:outline-none focus:border-sara-gold transition-all duration-300 text-[14px] pr-12 bg-[#1a1f33] text-white placeholder:text-[#6b6b80]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 text-white hover:text-sara-gold"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg font-semibold font-sans uppercase tracking-[1px] text-[13px] transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 bg-gradient-to-r from-sara-gold to-sara-goldSoft text-sara-textDark shadow-[0_10px_25px_rgba(214,178,106,0.2)]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[12px] text-white font-sans">
          <Link to="/login" className="text-sara-gold no-underline hover:underline">
            Customer Login
          </Link>
        </p>
      </div>
    </div>
  );
}
