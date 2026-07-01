'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '../utils/router-compat';
import { useAuth } from '../context/AuthContext';
import { productServices, orderServices, newsletterServices } from '../services/api';
import {
  Package,
  ShoppingBag,
  Mail,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  LogOut,
  Leaf,
  RefreshCw,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('products'); // options: products, orders, newsletter

  // API Lists State
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Loading States
  const [fetching, setFetching] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: '' });

  // Modal / Form States for Products (Add/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null); // null for Add, ID for Edit

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'hair',
    price: '',
    mrp: '',
    imagesInput: '', // will be split into array
    ingredientsInput: '', // comma separated, split into array
    benefitsInput: '', // comma separated, split into array
    inStock: true,
    isComingSoon: false,
    isFeatured: false
  });

  // Protect Admin Access Client-Side
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Load Data
  const loadData = async () => {
    setFetching(true);
    setFeedback({ type: null, message: '' });
    try {
      if (activeTab === 'products') {
        const res = await productServices.getAllProducts('all');
        if (res.success) setProducts(res.products);
      } else if (activeTab === 'orders') {
        const res = await orderServices.getAllOrders();
        if (res.success) setOrders(res.orders);
      } else if (activeTab === 'newsletter') {
        const res = await newsletterServices.getAllSubscribers();
        if (res.success) setSubscribers(res.subscribers);
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        type: 'error',
        message: 'Failed to synchronize workspace logs with the database.'
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeTab, isAuthenticated]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: null, message: '' }), 5000);
  };

  // Open Modal to Add Product
  const handleOpenAddModal = () => {
    setEditProductId(null);
    setProductForm({
      name: '',
      description: '',
      category: 'hair',
      price: '',
      mrp: '',
      imagesInput: '',
      ingredientsInput: '',
      benefitsInput: '',
      inStock: true,
      isComingSoon: false,
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  // Open Modal to Edit Product
  const handleOpenEditModal = (product) => {
    setEditProductId(product._id);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      mrp: product.mrp,
      imagesInput: product.images.join(', '),
      ingredientsInput: product.ingredients.join(', '),
      benefitsInput: product.benefits.join(', '),
      inStock: product.inStock,
      isComingSoon: product.isComingSoon || false,
      isFeatured: product.isFeatured || false
    });
    setIsModalOpen(true);
  };

  // Handle Product Form Submits (Create or Update)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const {
      name,
      description,
      category,
      price,
      mrp,
      imagesInput,
      ingredientsInput,
      benefitsInput,
      inStock,
      isComingSoon,
      isFeatured
    } = productForm;

    // Build arrays out of comma-separated lines
    const imagesArr = imagesInput.split(',').map((img) => img.trim()).filter((img) => img !== '');
    const ingredientsArr = ingredientsInput.split(',').map((ing) => ing.trim()).filter((ing) => ing !== '');
    const benefitsArr = benefitsInput.split(',').map((ben) => ben.trim()).filter((ben) => ben !== '');

    if (imagesArr.length === 0) {
      showFeedback('error', 'Please provide at least one valid organic product image URL.');
      setActionLoading(false);
      return;
    }

    const payload = {
      name,
      description,
      category,
      price: Number(price),
      mrp: Number(mrp),
      images: imagesArr,
      ingredients: ingredientsArr,
      benefits: benefitsArr,
      inStock,
      isComingSoon,
      isFeatured
    };

    try {
      if (editProductId) {
        // Edit Operations
        const res = await productServices.updateProduct(editProductId, payload);
        if (res.success) {
          showFeedback('success', `🍂 "${name}" successfully updated!`);
          setIsModalOpen(false);
          loadData();
        }
      } else {
        // Add Operations
        const res = await productServices.createProduct(payload);
        if (res.success) {
          showFeedback('success', `🌱 New product "${name}" added to dispensary!`);
          setIsModalOpen(false);
          loadData();
        }
      }
    } catch (error) {
      showFeedback('error', error.response?.data?.message || 'Failed to register product details.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Product Trigger
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete "${name}" from Matree inventory?`)) {
      return;
    }

    setActionLoading(true);
    try {
      const res = await productServices.deleteProduct(id);
      if (res.success) {
        showFeedback('success', `🧹 "${name}" deleted successfully.`);
        loadData();
      }
    } catch (error) {
      showFeedback('error', 'Failed to delete product from database.');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Shipping Order Status
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const res = await orderServices.updateStatus(id, status);
      if (res.success) {
        showFeedback('success', `🚚 Order status updated to "${status}".`);
        loadData();
      }
    } catch (error) {
      showFeedback('error', 'Failed to update order status.');
    }
  };

  if (loading || !admin) {
    return (
      <div className="py-20 text-center text-forest font-bold">
        Synchronizing credentials...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 font-sans">
      
      {/* 1. Header Admin Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-cream border border-forest/10 p-6 rounded-2xl shadow-sm gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 bg-forest/5 text-forest rounded-xl border border-forest/10">
            <Leaf className="h-6 w-6 text-gold fill-gold/10 animate-spin duration-3000" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-forest">Matree Admin Operations</h2>
            <p className="text-xs text-charcoal/50">Logged in: <span className="font-bold text-forest">{admin.email}</span></p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 bg-cream-dark/50 border border-forest/15 hover:bg-cream-dark text-forest font-bold py-2 px-4 rounded-lg text-xs transition-colors"
            title="Refresh Logs"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Synchronize
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 bg-terracotta text-cream font-bold py-2 px-4 rounded-lg text-xs hover:bg-[#A85122] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* 2. Operations Tabs menu */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none border-b border-forest/10 w-full">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 py-3 px-6 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'products' ? 'border-forest text-forest bg-forest/5' : 'border-transparent text-charcoal/50 hover:text-forest'
          }`}
        >
          <Package className="h-4 w-4" /> Manage Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 py-3 px-6 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'orders' ? 'border-forest text-forest bg-forest/5' : 'border-transparent text-charcoal/50 hover:text-forest'
          }`}
        >
          <ShoppingBag className="h-4 w-4" /> WhatsApp Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`flex items-center gap-2 py-3 px-6 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'newsletter' ? 'border-forest text-forest bg-forest/5' : 'border-transparent text-charcoal/50 hover:text-forest'
          }`}
        >
          <Mail className="h-4 w-4" /> Newsletter Letters ({subscribers.length})
        </button>
      </div>

      {/* Action Dialog Banners */}
      {feedback.message && (
        <div
          className={`flex items-center gap-2.5 p-4 rounded-xl text-xs font-bold leading-relaxed text-left animate-fade-in ${
            feedback.type === 'success' ? 'bg-cream-dark/40 text-forest border border-forest/10 shadow-sm' : 'bg-red-900/10 text-red-700 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 3. Main Data logs */}
      {fetching ? (
        <div className="py-20 text-center text-charcoal/50 text-xs">
          Loading logs from database...
        </div>
      ) : (
        <div className="bg-cream border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          
          {/* TAB 1: PRODUCT LISTING */}
          {activeTab === 'products' && (
            <div>
              <div className="p-6 border-b border-forest/10 flex justify-between items-center bg-cream-dark/20">
                <h3 className="font-serif text-base font-bold text-forest">Ayur Herbal Inventory</h3>
                <button
                  onClick={handleOpenAddModal}
                  className="bg-forest text-cream hover:bg-leaf font-bold py-2 px-4 rounded-lg text-xs shadow-sm flex items-center gap-1.5 transition-all duration-300"
                >
                  <Plus className="h-4 w-4" /> Add Product Ritual
                </button>
              </div>

              {products.length === 0 ? (
                <div className="p-12 text-center text-charcoal/50 text-sm">
                  Inventory is empty. Please add a product or run the db seeder script.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-cream-dark/30 border-b border-forest/10 text-forest/75 font-semibold text-xs tracking-wider uppercase">
                        <th className="py-4 px-6">Dispensary Image</th>
                        <th className="py-4 px-6">Ritual Name</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Price</th>
                        <th className="py-4 px-6">Status Flags</th>
                        <th className="py-4 px-6 text-center">Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p._id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                          <td className="py-4 px-6 shrink-0">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="h-12 w-12 object-cover rounded-lg border border-forest/10 shadow-sm"
                            />
                          </td>
                          <td className="py-4 px-6 font-serif font-bold text-forest">{p.name}</td>
                          <td className="py-4 px-6 uppercase text-xs font-semibold text-forest/70">{p.category}</td>
                          <td className="py-4 px-6 font-bold text-forest">
                            ₹{p.price} <span className="text-[10px] line-through text-charcoal/45 pl-1.5">₹{p.mrp}</span>
                          </td>
                          <td className="py-4 px-6 space-y-1">
                            <div className="flex gap-1.5 flex-wrap">
                              {p.isComingSoon && <span className="bg-forest/10 border border-forest/20 text-forest text-[9px] font-bold px-2 py-0.5 rounded-full">Coming Soon</span>}
                              {p.isFeatured && <span className="bg-gold/15 border border-gold/30 text-forest text-[9px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                              {!p.inStock && <span className="bg-red-900/10 border border-red-200 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full">Sold Out</span>}
                              {p.inStock && !p.isComingSoon && <span className="bg-green-800/10 border border-green-200 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full">Active stock</span>}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 bg-cream border border-forest/15 hover:bg-forest/10 text-forest rounded-lg transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p._id, p.name)}
                                className="p-2 bg-cream border border-red-200 hover:bg-red-50 text-terracotta rounded-lg transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDER LISTINGS */}
          {activeTab === 'orders' && (
            <div>
              <div className="p-6 border-b border-forest/10 bg-cream-dark/20">
                <h3 className="font-serif text-base font-bold text-forest">WhatsApp Checkout Pipelines</h3>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center text-charcoal/50 text-sm">
                  No orders have been submitted yet. Place a checkout on WhatsApp to create logs.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-cream-dark/30 border-b border-forest/10 text-forest/75 font-semibold text-xs tracking-wider uppercase">
                        <th className="py-4 px-6">Order ID</th>
                        <th className="py-4 px-6">Customer Details</th>
                        <th className="py-4 px-6">Dispensation Items</th>
                        <th className="py-4 px-6">Bill Total</th>
                        <th className="py-4 px-6">Tracking Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => {
                        const orderId = o._id.toString().substring(18).toUpperCase();
                        return (
                          <tr key={o._id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors items-start">
                            <td className="py-4 px-6 font-bold text-forest shrink-0">
                              #MATREE_{orderId}
                              <span className="block text-[10px] text-charcoal/45 font-normal pt-0.5">
                                {new Date(o.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="py-4 px-6 space-y-1.5 text-xs text-left">
                              <h5 className="font-serif font-black text-forest text-sm">{o.customerName}</h5>
                              <p className="font-semibold text-charcoal/60">📞 {o.phone}</p>
                              <p className="max-w-[200px] text-charcoal/50 leading-relaxed text-[11px]">
                                {o.address}, {o.city}, {o.state} - {o.pincode}
                              </p>
                            </td>
                            <td className="py-4 px-6 space-y-1 text-xs">
                              {o.items.map((item, idx) => (
                                <div key={idx} className="font-semibold text-charcoal/70">
                                  {item.quantity}x {item.product?.name || 'Ayurvedic product'} (₹{item.price})
                                </div>
                              ))}
                            </td>
                            <td className="py-4 px-6 font-bold text-forest text-base">₹{o.totalAmount}</td>
                            <td className="py-4 px-6">
                              <div className="relative">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none cursor-pointer ${
                                    o.status === 'delivered' ? 'bg-green-800/10 border-green-200 text-green-700' :
                                    o.status === 'shipped' ? 'bg-blue-900/10 border-blue-200 text-blue-700' :
                                    o.status === 'confirmed' ? 'bg-forest/15 border-forest/20 text-forest' :
                                    'bg-gold/15 border-gold/30 text-terracotta'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NEWSLETTER LOG */}
          {activeTab === 'newsletter' && (
            <div>
              <div className="p-6 border-b border-forest/10 bg-cream-dark/20">
                <h3 className="font-serif text-base font-bold text-forest">Botanical Subscriber Letters</h3>
              </div>

              {subscribers.length === 0 ? (
                <div className="p-12 text-center text-charcoal/50 text-sm">
                  Subscribers index empty. Subscriptions appear here upon signup.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-cream-dark/30 border-b border-forest/10 text-forest/75 font-semibold text-xs tracking-wider uppercase">
                        <th className="py-4 px-6">Index</th>
                        <th className="py-4 px-6">Email Address</th>
                        <th className="py-4 px-6">Subscribed Coordinates</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((s, idx) => (
                        <tr key={s._id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                          <td className="py-4 px-6 text-charcoal/55 font-bold shrink-0">{idx + 1}</td>
                          <td className="py-4 px-6 font-semibold text-forest">{s.email}</td>
                          <td className="py-4 px-6 text-charcoal/55">
                            {new Date(s.subscribedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* 4. CRUD INLINE PRODUCT FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-cream border border-forest/10 p-5 sm:p-8 rounded-3xl shadow-2xl space-y-6 text-left animate-slide-in max-h-[90vh] overflow-y-auto overscroll-contain">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-forest/5 text-forest transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-forest">
              {editProductId ? '🖊️ Edit Botanical Ritual' : '🌿 Create New Ritual'}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Keshya Neem Scalp Wash"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider">Detailed Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Wellness description, historical references..."
                  rows="2"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-forest font-semibold focus:outline-none focus:border-forest"
                  >
                    <option value="hair">Hair Care</option>
                    <option value="face">Face Care</option>
                    <option value="body">Body Care</option>
                    <option value="health">Health Care</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="349"
                    className="w-full px-3 py-2 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                    placeholder="499"
                    className="w-full px-3 py-2 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider">Product Photo URLs</label>
                <input
                  type="text"
                  value={productForm.imagesInput}
                  onChange={(e) => setProductForm({ ...productForm, imagesInput: e.target.value })}
                  placeholder="Separate URLs with commas. E.g. https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider">Certified Ingredients</label>
                <input
                  type="text"
                  value={productForm.ingredientsInput}
                  onChange={(e) => setProductForm({ ...productForm, ingredientsInput: e.target.value })}
                  placeholder="Separate ingredients with commas. E.g. Shikakai, Neem, Aloe Vera"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider">Health/Skin Benefits</label>
                <input
                  type="text"
                  value={productForm.benefitsInput}
                  onChange={(e) => setProductForm({ ...productForm, benefitsInput: e.target.value })}
                  placeholder="Separate benefits with commas. E.g. Restores scalp shine, Prevents splitting"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              {/* Toggles Checklist */}
              <div className="flex flex-wrap gap-4 sm:gap-6 py-2 border-t border-b border-forest/10 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-forest">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="h-4 w-4 rounded border-forest/20 accent-forest cursor-pointer"
                  />
                  In Stock
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-forest">
                  <input
                    type="checkbox"
                    checked={productForm.isComingSoon}
                    onChange={(e) => setProductForm({ ...productForm, isComingSoon: e.target.checked })}
                    className="h-4 w-4 rounded border-forest/20 accent-forest cursor-pointer"
                  />
                  Coming Soon
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-forest">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded border-forest/20 accent-forest cursor-pointer"
                  />
                  Featured Ritual
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-transparent border border-forest/35 text-forest font-bold py-2.5 px-5 rounded-lg text-xs hover:bg-forest/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-forest text-cream font-bold py-2.5 px-6 rounded-lg text-xs hover:bg-leaf transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editProductId ? 'Update Product' : 'Register Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
