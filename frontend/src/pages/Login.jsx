import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { loginSuccess } from '../store/slices/authSlice';
import api, { getErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0 mr-2">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.77-.07-1.54-.2-2.27H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-8.97z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.32 14.24A7.16 7.16 0 0 1 4.9 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.49l4.11-3.25z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.51l4.11 3.25c.94-2.85 3.57-4.96 6.68-4.96z"
    />
  </svg>
);

export default function Login() {
  const { t, locale } = useLanguage();
  const { user } = useSelector(state => state.auth);
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || (user.role === 'ADMIN' ? '/dashboard' : '/');
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? 'customer-login' : 'register';
      const body = mode === 'login' ? { email, password } : { name, email, password };

      const res = await api.post(`/api/auth/${endpoint}`, body);

      setLoading(false);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(getErrorMessage(err, t('login.error')));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('');
      setLoading(true);
      try {
        const res = await api.post('/api/auth/google', {
          accessToken: tokenResponse.access_token
        });
        setLoading(false);
        dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(getErrorMessage(err, t('login.error')));
      }
    },
    onError: () => {
      setLoading(false);
      setError('Google sign-in failed');
    }
  });

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-16 bg-[#0B1225]">
      <div className="relative z-10 w-full max-w-[420px] rounded-2xl p-8 md:p-10 transition-all duration-500 bg-[#111827] border border-[rgba(223,186,107,0.2)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="text-center mb-8">
          <span className="text-[12px] font-medium tracking-[3px] uppercase font-sans text-white">
            {mode === 'login' ? t('login.title') : 'Create Account'}
          </span>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-center tracking-wide mt-2 text-sara-gold">
            {mode === 'login' ? t('login.welcome') : 'Join Us'}
          </h2>
        </div>

        <div className="flex mb-6 bg-[rgba(223,186,107,0.08)] rounded-lg p-1">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 text-[13px] font-semibold uppercase tracking-[1px] rounded-md transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-sara-gold text-sara-textDark'
                : 'text-white hover:text-sara-gold'
            }`}
          >
            {t('login.signIn')}
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 text-[13px] font-semibold uppercase tracking-[1px] rounded-md transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-sara-gold text-sara-textDark'
                : 'text-white hover:text-sara-gold'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg font-sans">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 rounded-lg border border-gray-700 bg-[#1a1f33] text-white text-[13.5px] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#252b47] hover:border-sara-gold"
          >
            <GoogleIcon />
            <span>{locale === 'ta' ? 'கூகுள் மூலம் தொடரவும்' : 'Continue with Google'}</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(223,186,107,0.2)]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#111827] px-4 text-white font-sans font-medium">
              {t('login.or') || 'or'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="mb-5 font-sans">
              <label className="block text-[11px] uppercase tracking-[1px] mb-2 font-medium text-white">
                {t('login.name') || 'Name'}
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg border border-[rgba(223,186,107,0.15)] focus:outline-none focus:border-sara-gold transition-all duration-300 text-[14px] bg-[#1a1f33] text-white placeholder:text-[#6b6b80]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

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

          <div className="mb-6 font-sans relative">
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
                required={mode === 'register'}
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
                {mode === 'login' ? t('login.signingIn') : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? t('login.signIn') : 'Create Account'
            )}
          </button>
        </form>

        {mode === 'login' && (
          <p className="text-center mt-6 text-[12px] text-white font-sans">
            Don't have an account?{' '}
            <button
              onClick={() => switchMode('register')}
              className="bg-none border-none text-sara-gold cursor-pointer underline font-medium"
            >
              Register here
            </button>
          </p>
        )}

        {mode === 'register' && (
          <p className="text-center mt-6 text-[12px] text-white font-sans">
            Already have an account?{' '}
            <button
              onClick={() => switchMode('login')}
              className="bg-none border-none text-sara-gold cursor-pointer underline font-medium"
            >
              Sign in
            </button>
          </p>
        )}

        <p className="text-center mt-4 text-[11px] text-white font-sans">
          <Link to="/admin" className="text-sara-gold no-underline hover:underline">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}
