import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSuccess } from '../store/slices/authSlice';
import { API_BASE_URL } from '../config';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });

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
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-16 bg-[#F8F6FF]">

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[420px] backdrop-blur-xl rounded-2xl p-8 md:p-10 transition-all duration-500 bg-white border border-[rgba(214,178,106,0.15)] shadow-[0_20px_50px_rgba(42,22,53,0.08)]"
      >
        <div className="text-center mb-8">
          <span className="text-[12px] font-medium tracking-[3px] uppercase font-sans text-sara-muted">
            {t('login.title')}
          </span>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-center tracking-wide mt-2 text-sara-gold">
            {t('login.welcome')}
          </h2>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg font-sans">
            {error}
          </div>
        )}

        <div className="mb-5 font-sans">
          <label className="block text-[11px] uppercase tracking-[1px] mb-2 font-medium text-sara-muted">
            {t('login.email')}
          </label>
          <input
            type="email"
            placeholder={t('login.emailPlaceholder')}
            className="w-full px-4 py-3 rounded-lg border border-[rgba(214,178,106,0.15)] focus:outline-none focus:border-sara-gold transition-all duration-300 text-[14px] bg-white text-[#2A1635]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-8 font-sans relative">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[11px] uppercase tracking-[1px] font-medium text-sara-muted">
              {t('login.password')}
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('login.passwordPlaceholder')}
              className="w-full px-4 py-3 rounded-lg border border-[rgba(214,178,106,0.15)] focus:outline-none focus:border-sara-gold transition-all duration-300 text-[14px] pr-12 bg-white text-[#2A1635]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 text-sara-muted hover:text-sara-gold"
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
              {t('login.signingIn')}
            </>
          ) : (
            t('login.signIn')
          )}
        </button>

      </form>
    </div>
  );
}
