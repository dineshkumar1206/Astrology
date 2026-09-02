import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, AlertCircle } from 'lucide-react';
import api, { getErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsManager() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', role: '', rating: 5, quote: '' });
  
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/testimonials');
      setTestimonials(res.data || []);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch testimonials'));
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({ id: null, name: '', role: '', rating: 5, quote: '' });
    setShowModal(true);
  };

  const openEditModal = (t) => {
    setFormData({ id: t.id, name: t.name, role: t.role, rating: t.rating, quote: t.quote });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await api.delete(`/api/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete testimonial'));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (formData.id) {
        const res = await api.put(`/api/testimonials/${formData.id}`, formData);
        setTestimonials(testimonials.map(t => t.id === formData.id ? res.data : t));
      } else {
        const res = await api.post('/api/testimonials', formData);
        setTestimonials([...testimonials, res.data]);
      }
      setShowModal(false);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to save testimonial'));
    } finally {
      setFormLoading(false);
    }
  };

  // Drag and Drop
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (draggedId === targetId || draggedId === null) return;

    const draggedIndex = testimonials.findIndex(t => t.id === draggedId);
    const targetIndex = testimonials.findIndex(t => t.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTestimonials = [...testimonials];
    const [draggedItem] = newTestimonials.splice(draggedIndex, 1);
    newTestimonials.splice(targetIndex, 0, draggedItem);
    
    // Update local state immediately
    const orderedTestimonials = newTestimonials.map((t, index) => ({ ...t, order: index }));
    setTestimonials(orderedTestimonials);

    const updates = orderedTestimonials.map(t => ({ id: t.id, order: t.order }));

    try {
      await api.post('/api/testimonials/reorder', { updates });
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to save order'));
      fetchTestimonials();
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#D9B56A]/10 pb-6">
        <div>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
            Client Testimonials
          </h2>
          <p className="text-[13px] text-[#3E2F48] mt-1">
            Manage the client experiences displayed on the home page.
          </p>
        </div>
        
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#D9B56A] text-[#2A1635] px-5 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-[0.5px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer shadow-[0_4px_15px_rgba(217,181,106,0.15)]"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
          <p className="text-[#3E2F48] text-sm">Loading testimonials...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6 font-sans">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      ) : (
        <div className="bg-white border border-[#D9B56A]/10 rounded-xl p-6">
          <div className="space-y-3">
            {testimonials.length === 0 ? (
              <p className="text-center text-[#3E2F48] py-10">No testimonials found. Add one to get started.</p>
            ) : (
              testimonials.map((testi) => (
                <div 
                  key={testi.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, testi.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, testi.id)}
                  className="flex justify-between items-center bg-white border border-[#D9B56A]/10 rounded-lg p-4 hover:border-[#D9B56A]/20 transition-all cursor-move shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[#D9B56A]/50 pr-2">
                      <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                        <circle cx="4" cy="4" r="1.5"/><circle cx="10" cy="4" r="1.5"/>
                        <circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
                        <circle cx="4" cy="16" r="1.5"/><circle cx="10" cy="16" r="1.5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#2A1635]">{testi.name} <span className="text-[11px] font-normal text-[#3E2F48]">({testi.role})</span></h4>
                      <p className="text-[11px] text-[#3E2F48] mt-0.5 line-clamp-2 max-w-[400px] italic">"{testi.quote}"</p>
                      <div className="flex gap-1 mt-1 text-[#D9B56A]">
                        {Array.from({ length: testi.rating }).map((_, i) => (
                          <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEditModal(testi); }}
                      className="p-2 text-[#3E2F48] hover:text-[#D9B56A] hover:bg-[#D9B56A]/5 rounded transition-all cursor-pointer"
                      title="Edit Testimonial"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(testi.id); }}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all cursor-pointer"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-[#0B1225] p-5 border-b border-[#D9B56A]/20 flex justify-between items-center">
              <h3 className="text-white font-['Cinzel'] text-xl">
                {formData.id ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#B7AFC7] hover:text-white transition-colors text-2xl leading-none">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3E2F48] uppercase tracking-wider mb-1.5">Client Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#F5F0FF] border border-[#D9B56A]/20 rounded-lg px-4 py-2.5 text-sm text-[#2A1635] focus:outline-none focus:border-[#D9B56A]"
                      placeholder="e.g. Priya S."
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3E2F48] uppercase tracking-wider mb-1.5">Service/Role *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-[#F5F0FF] border border-[#D9B56A]/20 rounded-lg px-4 py-2.5 text-sm text-[#2A1635] focus:outline-none focus:border-[#D9B56A]"
                      placeholder="e.g. Tarot Consultation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3E2F48] uppercase tracking-wider mb-1.5">Rating (1-5) *</label>
                  <input 
                    type="number" 
                    min="1" max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="w-full bg-[#F5F0FF] border border-[#D9B56A]/20 rounded-lg px-4 py-2.5 text-sm text-[#2A1635] focus:outline-none focus:border-[#D9B56A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3E2F48] uppercase tracking-wider mb-1.5">Quote / Review *</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                    className="w-full bg-[#F5F0FF] border border-[#D9B56A]/20 rounded-lg px-4 py-3 text-sm text-[#2A1635] focus:outline-none focus:border-[#D9B56A] resize-none"
                    placeholder="Enter the client's experience..."
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#D9B56A] text-[#2A1635] hover:bg-[#c7a35a] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                  >
                    {formLoading ? <Loader2 className="animate-spin" size={16} /> : formData.id ? 'Save Changes' : 'Add Testimonial'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
