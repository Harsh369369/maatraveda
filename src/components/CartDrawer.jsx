'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { orderServices } from '../services/api';

const CartDrawer = () => {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart
  } = useCart();

  const [step, setStep] = useState(1); // Step 1: Cart Items Summary, Step 2: Shipping Form Details
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Shipping Calculations
  const shippingThreshold = 499;
  const freeShipping = cartTotal >= shippingThreshold;
  const shippingFee = freeShipping ? 0 : 50;
  const grandTotal = cartTotal + shippingFee;
  const amountNeededForFreeShipping = shippingThreshold - cartTotal;

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // WhatsApp Order Submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { customerName, phone, address, city, state, pincode } = formData;
    if (!customerName || !phone || !address || !city || !state || !pincode) {
      setErrorMsg('Please fill in all delivery details to complete your order.');
      return;
    }

    setLoading(true);

    try {
      // 1. Structure the items payload for the API
      const itemsPayload = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      }));

      // 2. Issue a POST request to our database to save the order
      const apiResponse = await orderServices.createOrder({
        customerName,
        phone,
        address,
        city,
        state,
        pincode,
        items: itemsPayload,
        totalAmount: grandTotal,
        orderedViaWhatsApp: true
      });

      if (apiResponse.success) {
        const orderId = apiResponse.order._id.toString().substring(18).toUpperCase();

        // 3. Format a beautiful organic WhatsApp message detailing all order specifications
        let whatsappMessage = `🌿 *Matree Ayurvedic Wellness Order* 🌿\n\n`;
        whatsappMessage += `*Order ID:* #MATREE_${orderId}\n`;
        whatsappMessage += `*Status:* Pending Confirmation\n\n`;
        whatsappMessage += `*Customer Details:*\n`;
        whatsappMessage += `• Name: ${customerName}\n`;
        whatsappMessage += `• Phone: ${phone}\n`;
        whatsappMessage += `• Address: ${address}, ${city}, ${state} - ${pincode}\n\n`;
        whatsappMessage += `*Ritual Cart Items:*\n`;
        
        cartItems.forEach((item) => {
          whatsappMessage += `• ${item.quantity}x ${item.product.name} (₹${item.price} each) → ₹${item.price * item.quantity}\n`;
        });
        
        whatsappMessage += `\n*Subtotal:* ₹${cartTotal}\n`;
        whatsappMessage += `*Shipping:* ${freeShipping ? 'FREE 🚚' : `₹${shippingFee}`}\n`;
        whatsappMessage += `*Grand Total Amount:* ₹${grandTotal}\n\n`;
        whatsappMessage += `Please confirm my order and share secure payment credentials! Thank you! 🙏`;

        // 4. Encode message and direct user to Matree Business WhatsApp
        const encodedText = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '919119047015'; // Traditional WhatsApp customer care portal
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Open WhatsApp on a new tab
        window.open(waUrl, '_blank');

        // 5. Clear state, reset items and close drawer
        clearCart();
        setFormData({ customerName: '', phone: '', address: '', city: '', state: '', pincode: '' });
        setStep(1);
        setCartOpen(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit order to database. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Background Dark Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        
        {/* Drawer Panel Container */}
        <div className="w-screen max-w-md bg-cream border-l border-forest/10 shadow-2xl flex flex-col justify-between h-full animate-slide-in">
          
          {/* Header Section */}
          <div className="p-6 border-b border-forest/10 flex items-center justify-between bg-cream-dark/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-forest" />
              <h3 className="font-serif text-lg font-bold text-forest">
                {step === 1 ? 'Your Sacred Cart' : 'Delivery Details'}
              </h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-forest/5 text-forest transition-colors"
              aria-label="Close Drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core Body Section (Step 1: Items, Step 2: Form) */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            
            {/* STEP 1: ITEM LISTING */}
            {step === 1 && (
              <>
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-72 text-center space-y-4">
                    <div className="p-4 rounded-full bg-forest/5 text-forest/45">
                      <ShoppingBag className="h-12 w-12" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-forest text-base">Your cart is empty</h4>
                      <p className="text-xs text-charcoal/50 max-w-[200px] mt-1 mx-auto leading-relaxed">
                        Add pure Ayurvedic products to begin your path to wellness.
                      </p>
                    </div>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="bg-forest text-cream font-bold text-xs py-2.5 px-6 rounded-lg hover:bg-leaf transition-all shadow-sm uppercase tracking-wider"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Free Shipping Marketing Banner Trigger */}
                    <div
                      className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 transition-colors ${
                        freeShipping
                          ? 'bg-forest/10 text-forest border-forest/20'
                          : 'bg-gold/10 text-terracotta border-gold/30'
                      }`}
                    >
                      <CheckCircle className={`h-5 w-5 shrink-0 ${freeShipping ? 'text-forest' : 'text-gold fill-gold/10'}`} />
                      <div>
                        {freeShipping ? (
                          <span className="font-bold">🎉 Congratulations! You unlocked FREE shipping!</span>
                        ) : (
                          <span>
                            Add <span className="font-black text-forest">₹{amountNeededForFreeShipping}</span> more to unlock <span className="font-bold">FREE delivery!</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.product._id}
                          className="flex items-center gap-4 p-3.5 rounded-xl bg-cream-dark/20 border border-forest/5 hover:border-forest/15 transition-all shadow-sm"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-16 w-16 object-cover rounded-lg bg-cream border border-forest/10 shadow-sm shrink-0"
                          />
                          <div className="flex-grow text-left space-y-1">
                            <h4 className="font-serif text-sm font-bold text-forest leading-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="text-[10px] font-sans text-charcoal/50 font-bold uppercase tracking-wider block">
                              ₹{item.price} each
                            </span>
                            
                            {/* Quantity Adjustment Buttons */}
                            <div className="flex items-center gap-3.5 pt-1.5">
                              <div className="flex items-center border border-forest/10 rounded-md bg-cream overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-forest/5 text-forest"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-2 text-xs font-bold font-sans text-forest">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-forest/5 text-forest"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-terracotta hover:text-red-700 transition-colors p-1"
                                title="Delete Item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-sans font-bold text-sm text-forest block">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* STEP 2: DELIVERY FORM DETAILS */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                <p className="text-xs text-charcoal/60 leading-relaxed bg-forest/5 border border-forest/10 p-3 rounded-lg">
                  🌿 Please enter your shipping coordinates below. We will save this order and generate a formatted cart invoice redirecting you directly to our WhatsApp support portal to confirm dispatch details.
                </p>

                {errorMsg && (
                  <div className="p-3 bg-red-900/10 text-red-700 border border-red-200 text-xs rounded-lg font-bold">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="customerName" className="text-xs font-bold text-forest uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-bold text-forest uppercase tracking-wider">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9119047015 (10 Digits)"
                    className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="address" className="text-xs font-bold text-forest uppercase tracking-wider">
                    Detailed Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat No, Street, Landmark details"
                    className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-xs font-bold text-forest uppercase tracking-wider">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Bengaluru"
                      className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="state" className="text-xs font-bold text-forest uppercase tracking-wider">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Karnataka"
                      className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="pincode" className="text-xs font-bold text-forest uppercase tracking-wider">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 560037"
                    className="w-full px-3 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </form>
            )}

          </div>

          {/* Footer Receipt Summary Section */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-forest/10 bg-cream-dark/15 space-y-4">
              
              {/* Bill Details */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Botanical Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping Fee</span>
                  <span>{freeShipping ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-forest/5">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Secure checkout badges */}
              <div className="flex justify-center items-center gap-1.5 text-[10px] text-forest/65 font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> 100% Traditional Ayurvedic Sourcing
              </div>

              {/* Main Call To Action */}
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-forest text-cream hover:bg-leaf font-sans text-sm font-bold py-4 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-transparent border border-forest/35 text-forest hover:bg-forest/5 font-sans text-xs font-bold py-4 rounded-lg transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-2/3 bg-terracotta text-cream hover:bg-[#A85122] font-sans text-xs font-bold py-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : '🌿 Order via WhatsApp'}
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default CartDrawer;
