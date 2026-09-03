import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { useLanguage } from '../context/LanguageContext';
import api, { getErrorMessage } from '../api/client';

// Component Imports
import AdminNavbar from './AdminNavbar'; 
import Orders from './Orders';
import TestimonialsManager from './TestimonialsManager';

export default function ControlDesk() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  // Auth state from Redux
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user) || {};

  // Active Category Selection
  const [activeCategory, setActiveCategory] = useState('Tarot Private Consultation');

  // Products and Categories states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Product Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    type: 'Blessed & Energized',
    category: '',
    desc: '',
    image: '',
    inclusions: '',
    sizes: '',
    stock: ''
  });

  // Category Modal / Form state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [catFormLoading, setCatFormLoading] = useState(false);
  const [catFormError, setCatFormError] = useState('');
  const [catFormSuccess, setCatFormSuccess] = useState('');
  const [catImageFile, setCatImageFile] = useState(null);

  const [catFormData, setCatFormData] = useState({
    id: null,
    name: '',
    type: 'service', // 'crystal' or 'service'
    desc: '',
    image: ''
  });

  // Drag and Drop state
  const [draggedCategoryId, setDraggedCategoryId] = useState(null);
  const [draggedProductId, setDraggedProductId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedCategoryId(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedCategoryId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetId, type) => {
    e.preventDefault();
    if (draggedCategoryId === targetId || draggedCategoryId === null) return;

    const filtered = categories.filter(c => c.type === type);
    const draggedIndex = filtered.findIndex(c => c.id === draggedCategoryId);
    const targetIndex = filtered.findIndex(c => c.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFiltered = [...filtered];
    const [draggedItem] = newFiltered.splice(draggedIndex, 1);
    newFiltered.splice(targetIndex, 0, draggedItem);

    const updates = newFiltered.map((cat, index) => ({
      id: cat.id,
      order: index
    }));

    const otherCategories = categories.filter(c => c.type !== type);
    const updatedCategories = newFiltered.map((c, index) => ({ ...c, order: index }));
    const newCategories = [...otherCategories, ...updatedCategories];
    
    // Maintain overall id/order sorting
    newCategories.sort((a, b) => {
      if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
      return a.id - b.id;
    });
    setCategories(newCategories);

    try {
      await api.post('/api/categories/reorder', { updates });
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err, 'Failed to save new order.'));
      fetchData(); // revert
    }
  };

  const handleProductDragStart = (e, id) => {
    setDraggedProductId(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleProductDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedProductId(null);
  };

  const handleProductDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleProductDrop = async (e, targetId) => {
    e.preventDefault();
    if (draggedProductId === targetId || draggedProductId === null) return;

    const filtered = products.filter(
      p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase()
    );
    
    const draggedIndex = filtered.findIndex(p => p.id === draggedProductId);
    const targetIndex = filtered.findIndex(p => p.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFiltered = [...filtered];
    const [draggedItem] = newFiltered.splice(draggedIndex, 1);
    newFiltered.splice(targetIndex, 0, draggedItem);

    const updates = newFiltered.map((p, index) => ({
      id: p.id,
      order: index
    }));

    const otherProducts = products.filter(
      p => !(p.category && p.category.toLowerCase() === activeCategory.toLowerCase())
    );
    const updatedProducts = newFiltered.map((p, index) => ({ ...p, order: index }));
    const newProducts = [...otherProducts, ...updatedProducts];
    
    newProducts.sort((a, b) => {
      if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
      return a.id - b.id;
    });
    setProducts(newProducts);

    try {
      await api.post('/api/products/reorder', { updates });
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err, 'Failed to save new product order.'));
      fetchData(); // revert
    }
  };

  // Image compression helper to prevent large payloads on live servers
  const compressImage = (file, callback) => {
    if (!file || !file.type.startsWith('image/')) {
      callback(file);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            callback(compressedFile);
          } else {
            callback(file);
          }
        }, 'image/jpeg', 0.8);
      };
    };
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/categories')
      ]);
      const prodData = Array.isArray(prodRes.data) ? prodRes.data : [];
      const catData = Array.isArray(catRes.data) ? catRes.data : [];
      setProducts(prodData);
      setCategories(catData);
      
      // Auto select first category if current is not in the loaded list
      const loadedCatNames = catData.map(c => c.name);
      if (loadedCatNames.length > 0 && !loadedCatNames.includes(activeCategory) && activeCategory !== '_manage_menus' && activeCategory !== '_orders') {
        setActiveCategory(loadedCatNames[0]);
      }
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err, t('controlDesk.fetchError')));
    } finally {
      setLoading(false);
    }
  };

  // Verify auth on mount / when the token changes. First call /auth/me so a
  // stale or invalid token (the source of "Token is not valid" on production)
  // is detected immediately — the global 401 interceptor then logs the user
  // out and redirects to /admin for a clean re-login — instead of failing only
  // when a product/menu is submitted.
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    let cancelled = false;
    const init = async () => {
      try {
        await api.get('/api/auth/me');
        if (!cancelled) await fetchData();
      } catch (err) {
        // 401 is handled by the global interceptor (logout + redirect).
        if (!cancelled && err?.response?.status !== 401) {
          setError(getErrorMessage(err, t('controlDesk.fetchError')));
        }
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [token, navigate]);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  // Check if a category belongs to Crystals
  const isCrystalCategory = (catName) => {
    const found = categories.find(c => c.name.toLowerCase() === (catName || '').toLowerCase());
    return found ? found.type === 'crystal' : false;
  };

  // Check if a category matches Kali Pooja
  const isKaliPoojaCategory = (catName) => {
    return (catName || '').toLowerCase() === 'kali pooja';
  };

  // Check if a category matches Murugar Cards
  const isMurugarCategory = (catName) => {
    return (catName || '').toLowerCase() === 'murugar cards';
  };

  const openAddModal = () => {
    const isCrystal = isCrystalCategory(activeCategory);
    setFormData({
      id: null,
      name: '',
      price: '',
      type: isCrystal ? 'Blessed & Energized' : 'Duration: 40 minutes',
      category: activeCategory,
      desc: '',
      image: '',
      inclusions: '',
      sizes: '',
      stock: ''
    });
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    const isCrystal = isCrystalCategory(product.category || activeCategory);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type || (isCrystal ? 'Blessed & Energized' : 'Duration: 40 minutes'),
      category: product.category || activeCategory,
      desc: product.desc || '',
      image: product.image || '',
      inclusions: Array.isArray(product.inclusions) ? product.inclusions.join('\n') : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join('\n') : '',
      stock: product.stock !== undefined && product.stock !== null ? product.stock : ''
    });
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('controlDesk.deleteConfirm'))) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err, t('controlDesk.deleteError')));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormLoading(true);

    const isCrystal = isCrystalCategory(formData.category);
    const inclusionsArray = isCrystal
      ? formData.inclusions
          .split('\n')
          .map(item => item.trim())
          .filter(item => item.length > 0)
      : [];
    const sizesArray = isCrystal
      ? formData.sizes
          .split('\n')
          .map(item => item.trim())
          .filter(item => item.length > 0)
      : [];

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('price', formData.price);
    fd.append('type', formData.type);
    fd.append('category', formData.category);
    fd.append('desc', formData.desc);
    fd.append('inclusions', JSON.stringify(inclusionsArray));
    fd.append('sizes', JSON.stringify(sizesArray));
    fd.append('stock', formData.stock !== undefined && formData.stock !== '' ? formData.stock : 'null');

    if (imageFile) {
      fd.append('image', imageFile);
    } else if (!formData.id) {
      fd.append('image', formData.image || '');
    }

    try {
      if (formData.id) {
        const res = await api.put(`/api/products/${formData.id}`, fd);
        setProducts(products.map(p => p.id === formData.id ? res.data : p));
        setFormSuccess(t('controlDesk.updateSuccess'));
      } else {
        const res = await api.post('/api/products', fd);
        setProducts([...products, res.data]);
        setFormSuccess(t('controlDesk.addSuccess'));
      }

      setTimeout(() => {
        setShowModal(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setFormError(getErrorMessage(err, t('controlDesk.saveError')));
    } finally {
      setFormLoading(false);
    }
  };

  // ─── CATEGORY MANAGEMENT ACTIONS ───

  const openAddCategoryModal = () => {
    setCatFormData({
      id: null,
      name: '',
      type: 'service',
      desc: '',
      image: ''
    });
    setCatImageFile(null);
    setCatFormError('');
    setCatFormSuccess('');
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (cat) => {
    setCatFormData({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      desc: cat.desc || '',
      image: cat.image || ''
    });
    setCatImageFile(null);
    setCatFormError('');
    setCatFormSuccess('');
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm(t('controlDesk.deleteCategoryConfirm'))) return;
    try {
      await api.delete(`/api/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err, t('controlDesk.deleteCategoryError')));
    }
  };

  const handleCatInputChange = (e) => {
    const { name, value } = e.target;
    setCatFormData({ ...catFormData, [name]: value });
  };

  const handleCatFormSubmit = async (e) => {
    e.preventDefault();
    setCatFormError('');
    setCatFormSuccess('');
    setCatFormLoading(true);

    const fd = new FormData();
    fd.append('name', catFormData.name);
    fd.append('type', catFormData.type);
    fd.append('desc', catFormData.desc);

    if (catImageFile) {
      fd.append('image', catImageFile);
    } else if (!catFormData.id) {
      fd.append('image', catFormData.image || '');
    }

    try {
      if (catFormData.id) {
        const res = await api.put(`/api/categories/${catFormData.id}`, fd);
        setCategories(categories.map(c => c.id === catFormData.id ? res.data : c));
        setCatFormSuccess(t('controlDesk.categoryUpdateSuccess'));
      } else {
        const res = await api.post('/api/categories', fd);
        setCategories([...categories, res.data]);
        setCatFormSuccess(t('controlDesk.categoryAddSuccess'));
      }

      setTimeout(() => {
        setShowCategoryModal(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setCatFormError(getErrorMessage(err, t('controlDesk.categorySaveError')));
    } finally {
      setCatFormLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.category && product.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#F8F6FF] text-[#2A1635] flex flex-col font-sans">
      
      {/* ─── NAVBAR PANEL ─── */}
      <AdminNavbar 
        user={user}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleSignOut={handleSignOut}
        categories={categories}
      />

      {/* ─── MAIN PANEL ─── */}
      <main className="flex-grow p-6 md:p-8 max-w-[1400px] mx-auto w-full overflow-y-auto">
        
        {activeCategory === '_orders' ? (
          /* ─── ORDERS DASHBOARD VIEW ─── */
          <Orders />
        ) : activeCategory === '_testimonials' ? (
          /* ─── TESTIMONIALS DASHBOARD VIEW ─── */
          <TestimonialsManager />
        ) : activeCategory === '_manage_menus' ? (
          /* ─── CATEGORY MANAGEMENT DASHBOARD VIEW ─── */
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#D9B56A]/10 pb-6">
              <div>
                <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
                  {t('controlDesk.manageMenus')}
                </h2>
                <p className="text-[13px] text-[#3E2F48] mt-1">
                  {t('controlDesk.manageMenusDesc')}
                </p>
              </div>
              
              <button
                onClick={openAddCategoryModal}
                className="flex items-center gap-2 bg-[#D9B56A] text-[#2A1635] px-5 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-[0.5px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer shadow-[0_4px_15px_rgba(217,181,106,0.15)]"
              >
                <Plus size={16} />
                <span>{t('controlDesk.addCategory')}</span>
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
                <p className="text-[#3E2F48] text-sm">{t('controlDesk.loadingMenus')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                {/* Spiritual Services Column */}
                <div className="bg-white border border-[#D9B56A]/10 rounded-xl p-6">
                  <h3 className="font-['Cinzel'] text-lg text-[#D9B56A] border-b border-[#D9B56A]/10 pb-3 mb-4">
                    {t('controlDesk.spiritualMenus')}
                  </h3>
                  <div className="space-y-3">
                    {categories.filter(c => c.type === 'service').map((cat) => (
                      <div 
                        key={cat.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, cat.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, cat.id, 'service')}
                        className="flex justify-between items-center bg-white border border-[#D9B56A]/10 rounded-lg p-4 hover:border-[#D9B56A]/20 transition-all cursor-move shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-[#D9B56A]/50">
                            {/* Drag handle icon (6 dots) */}
                            <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                              <circle cx="4" cy="4" r="1.5"/><circle cx="10" cy="4" r="1.5"/>
                              <circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
                              <circle cx="4" cy="16" r="1.5"/><circle cx="10" cy="16" r="1.5"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[14px] text-[#2A1635]">{cat.name}</h4>
                            <p className="text-[11px] text-[#3E2F48] mt-0.5 line-clamp-1 max-w-[300px]">{cat.desc || 'No description provided.'}</p>
                            <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wider bg-[#D9B56A]/10 text-[#D9B56A] px-2 py-0.5 rounded">
                              Slug: {cat.slug}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); openEditCategoryModal(cat); }}
                            className="p-2 text-[#3E2F48] hover:text-[#D9B56A] hover:bg-[#D9B56A]/5 rounded transition-all cursor-pointer"
                            title="Edit Menu"
                          >
                            <Pencil size={15} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all cursor-pointer"
                            title="Delete Menu"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crystals Subcategories Column */}
                <div className="bg-white border border-[#D9B56A]/10 rounded-xl p-6">
                  <h3 className="font-['Cinzel'] text-lg text-[#D9B56A] border-b border-[#D9B56A]/10 pb-3 mb-4">
                    Crystals Collection Menus
                  </h3>
                  <div className="space-y-3">
                    {categories.filter(c => c.type === 'crystal').map((cat) => (
                      <div 
                        key={cat.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, cat.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, cat.id, 'crystal')}
                        className="flex justify-between items-center bg-white border border-[#D9B56A]/10 rounded-lg p-4 hover:border-[#D9B56A]/20 transition-all cursor-move shadow-sm hover:shadow-md"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="text-[#D9B56A]/50 pr-2">
                            {/* Drag handle icon (6 dots) */}
                            <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                              <circle cx="4" cy="4" r="1.5"/><circle cx="10" cy="4" r="1.5"/>
                              <circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
                              <circle cx="4" cy="16" r="1.5"/><circle cx="10" cy="16" r="1.5"/>
                            </svg>
                          </div>
                          {cat.image && (
                            <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded border border-[#D9B56A]/20" />
                          )}
                          <div>
                            <h4 className="font-semibold text-[14px] text-[#2A1635]">{cat.name}</h4>
                            <p className="text-[11px] text-[#3E2F48] mt-0.5 line-clamp-1 max-w-[250px]">{cat.desc || 'No description provided.'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); openEditCategoryModal(cat); }}
                            className="p-2 text-[#3E2F48] hover:text-[#D9B56A] hover:bg-[#D9B56A]/5 rounded transition-all cursor-pointer"
                            title="Edit Menu"
                          >
                            <Pencil size={15} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all cursor-pointer"
                            title="Delete Menu"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ─── PRODUCTS LIST VIEW ─── */
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#D9B56A]/10 pb-6">
              <div>
                <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
                  {activeCategory} Collection
                </h2>
                <p className="text-[13px] text-[#3E2F48] mt-1">
                  Manage listings published under the {activeCategory} category.
                </p>
              </div>
              
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-[#D9B56A] text-[#2A1635] px-5 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-[0.5px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer shadow-[0_4px_15px_rgba(217,181,106,0.15)]"
              >
                <Plus size={16} />
                <span>Add Product / Item</span>
              </button>
            </div>

            {/* Loading / Error States */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
                <p className="text-[#3E2F48] text-sm font-sans">Loading listings...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6 font-sans">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Grid of Listings */}
            {!loading && !error && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-[#D9B56A]/20 rounded-xl font-sans">
                    <p className="text-[#3E2F48] text-[15px]">No products found in the {activeCategory} category.</p>
                    <button
                      onClick={openAddModal}
                      className="text-[#D9B56A] underline mt-2 text-sm font-semibold hover:text-[#2A1635]"
                    >
                      Create first listing for {activeCategory}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        draggable
                        onDragStart={(e) => handleProductDragStart(e, product.id)}
                        onDragEnd={handleProductDragEnd}
                        onDragOver={handleProductDragOver}
                        onDrop={(e) => handleProductDrop(e, product.id)}
                        className="bg-white border border-[#D9B56A]/15 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D9B56A]/40 cursor-move"
                      >
                        {/* Card Image */}
                        <div className="w-full h-[160px] aspect-video overflow-hidden relative bg-[#F5F0FF] flex items-center justify-center">
                          {isCrystalCategory(product.category) || isKaliPoojaCategory(product.category) ? (
                            product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-gray-600 font-medium">No Image Uploaded</span>
                            )
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 p-4 text-center">
                              <span className="text-xs text-[#D9B56A] font-bold uppercase tracking-wider">Service Booking</span>
                              <span className="text-[10px] text-gray-500 max-w-[200px] truncate">{product.name}</span>
                            </div>
                          )}
                          
                          <div className="absolute top-3 right-3 bg-[#F5F0FF] border border-[#D9B56A]/20 px-2.5 py-1 rounded text-[10px] text-[#D9B56A] font-bold uppercase tracking-wider backdrop-blur-sm">
                            ₹{product.price}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-1.5">
                              <h3 className="font-semibold text-base text-[#2A1635] tracking-wide leading-tight">
                                {product.name}
                              </h3>
                            </div>
                            <p className="text-[11px] text-[#D9B56A] font-bold uppercase tracking-wider mb-2.5">
                              {product.type}
                            </p>
                            {/* Description as points */}
                            <ul className="text-xs text-[#3E2F48] leading-relaxed mb-4 pl-4 list-disc space-y-1">
                              {product.desc ? product.desc.split('\n').map((point, i) => point.trim() && (
                                <li key={i}>{point.trim()}</li>
                              )) : <li>No description provided.</li>}
                            </ul>

                            {/* Sizes */}
                            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                              <div className="border-t border-[#D9B56A]/10 pt-3 mt-3">
                                <span className="text-[9px] text-[#D9B56A] font-bold uppercase tracking-widest block mb-1">Sizes:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {product.sizes.map((size, i) => (
                                    <span key={i} className="text-[10px] text-[#3E2F48] bg-[#D9B56A]/10 border border-[#D9B56A]/15 px-2 py-0.5 rounded">
                                      {size}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2.5 mt-5 pt-3 border-t border-[#D9B56A]/10">
                            <button
                              onClick={() => openEditModal(product)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-[#D9B56A]/10 hover:bg-[#D9B56A]/20 border border-[#D9B56A]/20 text-[#D9B56A] py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                            >
                              <Pencil size={12} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                            >
                              <Trash2 size={12} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* ─── PRODUCT ADD / EDIT MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white border border-[#D9B56A]/30 w-full max-w-lg rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#D9B56A]/10 flex justify-between items-center">
              <h3 className="font-['Cinzel'] text-lg font-normal text-[#D9B56A] uppercase tracking-wider">
                {formData.id ? 'Edit Item' : 'Add Item'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#3E2F48] hover:text-[#2A1635] text-lg font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              {formError && (
                <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="mb-4 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle size={15} />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-sm font-sans">
                
                {/* Name */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    {isCrystalCategory(formData.category) ? 'Product Name *' : 'Service Title / Name *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isCrystalCategory(formData.category) ? 'e.g. Dhanyog Crystal' : 'e.g. Relationship Healing Session'}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Price & Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                      Price (INR) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 1800"
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                      {isCrystalCategory(formData.category) ? 'Product Type' : 'Duration / Session Type *'}
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required={!isCrystalCategory(formData.category)}
                      placeholder={isCrystalCategory(formData.category) ? 'e.g. Blessed & Energized' : 'e.g. Duration: 40 minutes'}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Category selector */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Category Menu Selection *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name} className="bg-white text-[#2A1635]">
                        {cat.name} ({cat.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload Area */}
                <div>
                    <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                      Item Image
                    </label>
                    
                    <div style={{
                      border: '2px dashed rgba(217, 181, 106, 0.3)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(245, 240, 255, 0.8)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.3)'}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) compressImage(file, setImageFile);
                          else setImageFile(null);
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      
                      {imageFile ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={URL.createObjectURL(imageFile)} 
                            alt="Selected Preview" 
                            style={{ maxHeight: '120px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                          />
                          <span className="text-xs text-[#D9B56A] font-semibold truncate max-w-[250px]">
                            {imageFile.name}
                          </span>
                          <span className="text-[10px] text-gray-500 mt-1">Click or drag to change image</span>
                        </div>
                      ) : formData.image ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={formData.image} 
                            alt="Current Product Preview" 
                            style={{ maxHeight: '120px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-xs text-gray-400">Current Image Loaded</span>
                          <span className="text-[10px] text-gray-500 mt-1">Click or drag to replace image</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-2 text-[#3E2F48]">
                          <span className="text-[13px] font-medium">Drag file here or click to upload</span>
                          <span className="text-[10px] text-gray-500 mt-0.5">Supports PNG, JPG, JPEG (Max 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Item Description
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Provide a detailed description of the product or healing service..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>



                {/* Sizes (Crystals Only) */}
                {isCrystalCategory(formData.category) && (
                  <div>
                    <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                      Available Sizes (one size per line)
                    </label>
                    <textarea
                      name="sizes"
                      value={formData.sizes}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="e.g.&#10;Small&#10;Medium&#10;Large"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>
                )}

                {/* Stock Limit / Quantity */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Stock Limit / Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#D9B56A] text-[#2A1635] py-3 rounded-lg text-xs font-bold uppercase tracking-[1px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* ─── CATEGORY ADD / EDIT MODAL ─── */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white border border-[#D9B56A]/30 w-full max-w-lg rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#D9B56A]/10 flex justify-between items-center">
              <h3 className="font-['Cinzel'] text-lg font-normal text-[#D9B56A] uppercase tracking-wider">
                {catFormData.id ? 'Edit Menu Category' : 'Add Menu Category'}
              </h3>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-[#3E2F48] hover:text-[#2A1635] text-lg font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {catFormError && (
                <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{catFormError}</span>
                </div>
              )}

              {catFormSuccess && (
                <div className="mb-4 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle size={15} />
                  <span>{catFormSuccess}</span>
                </div>
              )}

              <form onSubmit={handleCatFormSubmit} className="space-y-4 text-sm font-sans">
                
                {/* Menu Name */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Menu Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={catFormData.name}
                    onChange={handleCatInputChange}
                    placeholder="e.g. Anklets, Tarot Card Reading, Aura Healing"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Menu Type */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Menu Section / Type *
                  </label>
                  <select
                    name="type"
                    value={catFormData.type}
                    onChange={handleCatInputChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200"
                  >
                    <option value="service" className="bg-white text-[#2A1635]">Spiritual Service (Main Navbar dropdown list)</option>
                    <option value="crystal" className="bg-white text-[#2A1635]">Crystal Category (Crystals page subcategories list)</option>
                  </select>
                </div>

                {/* Image Upload Area (Optional, useful for crystals) */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Category Icon / Image (Optional)
                  </label>
                  
                  <div style={{
                    border: '2px dashed rgba(217, 181, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(245, 240, 255, 0.8)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.6)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.3)'}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) compressImage(file, setCatImageFile);
                        else setCatImageFile(null);
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    
                    {catImageFile ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={URL.createObjectURL(catImageFile)} 
                          alt="Selected Preview" 
                          style={{ maxHeight: '100px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                        />
                        <span className="text-xs text-[#D9B56A] font-semibold truncate max-w-[250px]">
                          {catImageFile.name}
                        </span>
                      </div>
                    ) : catFormData.image ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={catFormData.image} 
                          alt="Category Preview" 
                          style={{ maxHeight: '100px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="text-xs text-gray-400">Current Category Image</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-2 text-[#3E2F48]">
                        <span className="text-[12px] font-medium">Click to upload icon image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] text-[#3E2F48] uppercase tracking-[1px] mb-1 font-medium">
                    Menu/Category Description
                  </label>
                  <textarea
                    name="desc"
                    value={catFormData.desc}
                    onChange={handleCatInputChange}
                    rows="3"
                    placeholder="Short description displayed on page headings..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D9B56A]/15 text-[#2A1635] placeholder-[#3E2F48]/50 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={catFormLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#D9B56A] text-[#2A1635] py-3 rounded-lg text-xs font-bold uppercase tracking-[1px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {catFormLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Saving Menu...</span>
                      </>
                    ) : (
                      <span>Save Menu Category</span>
                    )}
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