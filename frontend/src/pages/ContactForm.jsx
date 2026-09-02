import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setStatus({
        type: 'success',
        message: res.data.message || t('contactForm.successMsg')
      });

      const whatsappNumber = "919655199507";
      const formattedMessage = `${t('contactForm.whatsappGreeting')}\n\n` +
                               `${t('contactForm.whatsappName')}${formData.name}\n` +
                               `${t('contactForm.whatsappEmail')}${formData.email}\n` +
                               `${t('contactForm.whatsappSubject')}${formData.subject}\n` +
                               `${t('contactForm.whatsappMessage')}${formData.message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, '_blank');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.response?.data?.message || t('contactForm.errorMsg')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 w-full box-border px-4 bg-gradient-to-b from-[#FDFBF7] to-sara-cream">

      <div data-aos="fade-up" className="max-w-3xl mx-auto p-8 md:p-12 bg-white border border-sara-gold/15 shadow-[0_4px_20px_rgba(29,11,46,0.08)] rounded-sm">
        <div className="text-center mb-12">
          <h3 className="m-0 mb-2 font-serif text-3xl text-[#2A1635] font-normal">
            {t('contactForm.title')}
          </h3>
          <p className="m-0 font-sans text-[#3E2F48] text-sm font-light">
            {t('contactForm.description')}
          </p>
        </div>

        {status.message && (
          <div className={`mb-8 p-4 text-sm font-sans rounded text-center border ${
            status.type === 'success'
              ? 'bg-sara-gold/10 text-sara-gold border-sara-gold/30'
              : 'bg-red-500/10 text-red-600 border-red-500/30'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="flex-1">
              <div className="relative mb-10">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-transparent border-0 border-b border-[#3E2F48]/30 text-[#2A1635] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#3E2F48]/50 placeholder:font-light disabled:opacity-50"
                  placeholder={t('contactForm.name')}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mb-10">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-transparent border-0 border-b border-[#3E2F48]/30 text-[#2A1635] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#3E2F48]/50 placeholder:font-light disabled:opacity-50"
                  placeholder={t('contactForm.email')}
                  required
                />
              </div>
            </div>
          </div>

          <div className="relative mb-10">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-0 border-b border-[#3E2F48]/30 text-[#2A1635] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#3E2F48]/50 placeholder:font-light disabled:opacity-50"
              placeholder={t('contactForm.subject')}
              required
            />
          </div>

          <div className="relative mb-10">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-0 border-b border-[#3E2F48]/30 text-[#2A1635] font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#3E2F48]/50 placeholder:font-light resize-none disabled:opacity-50"
              placeholder={t('contactForm.message')}
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-sara-gold text-[#2A1635] py-4 md:py-5 font-sans text-[13px] font-semibold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:bg-sara-goldSoft hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? t('contactForm.sending') : t('contactForm.sendBtn')}
          </button>
        </form>
      </div>

    </section>
  );
}
