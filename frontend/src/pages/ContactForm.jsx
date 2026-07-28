import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function ContactForm() {
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
        message: res.data.message || 'Your message has been sent successfully.'
      });

      const whatsappNumber = "919655199507";
      const formattedMessage = `Hello, I'd like to get in touch!\n\n` +
                               `*Name:* ${formData.name}\n` +
                               `*Email:* ${formData.email}\n` +
                               `*Subject:* ${formData.subject}\n` +
                               `*Message:* ${formData.message}`;
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
        message: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 w-full box-border px-4 bg-gradient-to-b from-[#FDFBF7] to-sara-cream">

      <div className="max-w-3xl mx-auto p-8 md:p-12 bg-sara-white border border-sara-gold/15 shadow-[0_4px_20px_rgba(29,11,46,0.08)] rounded-sm">
        <div className="text-center mb-12">
          <h3 className="m-0 mb-2 font-serif text-3xl text-sara-purple font-normal">
            Send a Message
          </h3>
          <p className="m-0 font-sans text-[#4A4458] text-sm font-light">
            Fill out the form below and we will get back to you shortly.
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
                  className="w-full bg-transparent border-0 border-b border-[#4A4458]/30 text-sara-purple font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#6B5F7E] placeholder:font-light disabled:opacity-50"
                  placeholder="Your Name"
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
                  className="w-full bg-transparent border-0 border-b border-[#4A4458]/30 text-sara-purple font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#6B5F7E] placeholder:font-light disabled:opacity-50"
                  placeholder="Your Email"
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
              className="w-full bg-transparent border-0 border-b border-[#4A4458]/30 text-sara-purple font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#6B5F7E] placeholder:font-light disabled:opacity-50"
              placeholder="Subject / Service Requested"
              required
            />
          </div>

          <div className="relative mb-10">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-0 border-b border-[#4A4458]/30 text-sara-purple font-sans text-[15px] py-3 outline-none transition-colors duration-300 focus:border-sara-gold placeholder:text-[#6B5F7E] placeholder:font-light resize-none disabled:opacity-50"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-sara-gold text-sara-purple py-4 md:py-5 font-sans text-[13px] font-semibold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:bg-sara-goldSoft hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

    </section>
  );
}
