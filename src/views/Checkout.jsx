'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from '../utils/router-compat';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderServices, paymentServices } from '../services/api';
import { ShieldCheck, Calendar, Info, ShoppingBag, ArrowLeft, CheckCircle, CreditCard, Landmark, Banknote } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 
  'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, userIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Form coordinates
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: ''
  });

  // Pre-fill user profile fields if authenticated
  useEffect(() => {
    if (userIsAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name || prev.customerName,
        email: user.email || prev.email,
        address: user.address || prev.address,
        city: user.city || prev.city,
        state: user.state || prev.state,
        pincode: user.pincode || prev.pincode
      }));
    }
  }, [user, userIsAuthenticated]);

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, CARD, NETBANKING, COD
  const [upiProvider, setUpiProvider] = useState('gpay'); // gpay, phonepe, paytm
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Discount calculation retrieved from cart
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const savedDiscount = localStorage.getItem('matree_checkout_discount');
    if (savedDiscount) {
      try {
        const parsed = JSON.parse(savedDiscount);
        setDiscountPercent(parsed.percent || 0);
        setCouponCode(parsed.code || '');
      } catch (err) {
        console.error('Failed to parse checkout coupon:', err);
      }
    }
  }, []);

  // Shipping Calculations
  const shippingThreshold = 499;
  const freeShipping = cartTotal >= shippingThreshold;
  const shippingFee = freeShipping ? 0 : 50;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const grandTotal = cartTotal - discountAmount + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { customerName, phone, email, address, city, state, pincode } = formData;
    if (!customerName || !phone || !email || !address || !city || !state || !pincode) {
      setErrorMsg('Please fully fill out your shipping coordinates to dispatch your order.');
      return;
    }

    // Basic Indian phone validation (10 digits)
    const sanitizedPhone = phone.replace(/\D/g, '');
    if (sanitizedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Basic Pincode validation (6 digits)
    const sanitizedPincode = pincode.replace(/\D/g, '');
    if (sanitizedPincode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Pincode.');
      return;
    }

    setLoading(true);

    const itemsPayload = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price
    }));

    // COD Checkout Path (Bypass Payment Gateway)
    if (paymentMethod === 'COD') {
      try {
        const response = await orderServices.createOrder({
          customerName,
          phone: sanitizedPhone,
          email,
          address,
          city,
          state,
          pincode: sanitizedPincode,
          items: itemsPayload,
          totalAmount: grandTotal,
          paymentMethod: 'Cash on Delivery (COD)',
          orderedViaWhatsApp: false
        });

        if (response.success) {
          localStorage.removeItem('matree_checkout_discount');
          const details = {
            order: response.order,
            discountAmount,
            couponCode,
            shippingFee,
            grandTotal,
            paymentMethod: 'Cash on Delivery (COD)',
            email
          };
          clearCart();
          navigate('/order-confirmation', { state: details });
        }
      } catch (err) {
        console.error('Order checkout placement failed:', err);
        setErrorMsg(err.response?.data?.message || 'Failed to establish connection to our checkout server. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Online Payments Path (Razorpay Gateway)
    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setErrorMsg('Failed to load Razorpay payment gateway. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order on backend
      const paymentOrderRes = await paymentServices.createOrder(grandTotal);
      if (!paymentOrderRes.success) {
        setErrorMsg('Failed to initialize secure payment. Please try again.');
        setLoading(false);
        return;
      }

      const { order: rzpOrder, keyId, simulated } = paymentOrderRes;

      // 3. Configure Razorpay modal options
      const options = {
        key: keyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: 'Maatraveda',
        description: 'Ayurvedic Wellness Rituals',
        image: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌿</text></svg>',
        order_id: rzpOrder.id,
        handler: async function (paymentRes) {
          setLoading(true);
          try {
            // 4. Verify signature on backend
            const verifyRes = await paymentServices.verifyPayment({
              razorpay_order_id: paymentRes.razorpay_order_id || rzpOrder.id,
              razorpay_payment_id: paymentRes.razorpay_payment_id || `pay_mock_${Date.now()}`,
              razorpay_signature: paymentRes.razorpay_signature || 'mock_sig',
              simulated
            });

            if (verifyRes.success) {
              // 5. Create final database order
              const orderResponse = await orderServices.createOrder({
                customerName,
                phone: sanitizedPhone,
                email,
                address,
                city,
                state,
                pincode: sanitizedPincode,
                items: itemsPayload,
                totalAmount: grandTotal,
                paymentMethod: `${paymentMethod} (Paid via Razorpay)`,
                orderedViaWhatsApp: false
              });

              if (orderResponse.success) {
                localStorage.removeItem('matree_checkout_discount');
                const details = {
                  order: orderResponse.order,
                  discountAmount,
                  couponCode,
                  shippingFee,
                  grandTotal,
                  paymentMethod: `${paymentMethod} (Paid)`,
                  email
                };
                clearCart();
                navigate('/order-confirmation', { state: details });
              }
            } else {
              setErrorMsg('Payment verification check failed. Signature mismatch.');
            }
          } catch (verificationErr) {
            console.error('Payment verification failed:', verificationErr);
            setErrorMsg('Unable to verify payment signature. Please check your internet connection.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: customerName,
          email: email,
          contact: sanitizedPhone
        },
        notes: {
          address: `${address}, ${city}, ${state} - ${pincode}`
        },
        theme: {
          color: '#2D5016'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      // 4. Sandbox simulation handler if running with test key placeholders
      if (simulated) {
        alert("🌿 [Maatraveda Sandbox] Simulating secure Razorpay payment...\nPayment success handler will be triggered automatically.");
        setTimeout(() => {
          options.handler({
            razorpay_order_id: rzpOrder.id,
            razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            razorpay_signature: `sig_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          });
        }, 1500);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Razorpay payment execution failed:', err);
      setErrorMsg('Failed to process payment gateway transaction. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-8 text-left">
      
      {/* Back to Cart link */}
      <div>
        <Link 
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-leaf transition-colors font-sans"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-black text-forest">Dispatch Checkout</h1>
        <p className="font-sans text-sm text-charcoal/60">
          Enter your delivery details and choose your preferred payment option below.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-900/10 text-red-700 border border-red-200 text-xs sm:text-sm font-bold rounded-xl max-w-4xl">
          {errorMsg}
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Columns: Forms (8 columns) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-8">
          
          {/* Shipping Address Section */}
          <div className="bg-cream border border-forest/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest border-b border-forest/10 pb-2.5">
              1. Shipping Coordinates
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="customerName" className="text-xs font-bold text-forest uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="text-xs font-bold text-forest uppercase tracking-wider">Mobile Number (WhatsApp preferred)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10 Digits Mobile Number"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-bold text-forest uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="yourname@gmail.com"
                className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="text-xs font-bold text-forest uppercase tracking-wider">Full Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House No, Apartment name, Landmark and street details"
                className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="city" className="text-xs font-bold text-forest uppercase tracking-wider">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="state" className="text-xs font-bold text-forest uppercase tracking-wider">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-forest font-semibold focus:outline-none focus:border-forest cursor-pointer"
                  required
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="pincode" className="text-xs font-bold text-forest uppercase tracking-wider">Pincode (6 digits)</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g. 411001"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-cream border border-forest/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest border-b border-forest/10 pb-2.5">
              2. Secure Payment Gateway
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option A: UPI */}
              <div 
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                  paymentMethod === 'UPI' ? 'bg-forest/5 border-forest shadow-sm' : 'bg-cream border-forest/10 hover:border-forest/30'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-forest font-bold text-sm">
                    <CheckCircle className={`h-4.5 w-4.5 ${paymentMethod === 'UPI' ? 'text-forest fill-forest/10' : 'text-forest/20'}`} />
                    <span>UPI Payment</span>
                  </div>
                  <span className="text-[10px] bg-forest text-cream font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">Popular</span>
                </div>
                
                {/* UPI provider visual icons */}
                <div className="flex gap-3 items-center">
                  <div className={`p-1 border rounded bg-cream ${upiProvider === 'gpay' && paymentMethod === 'UPI' ? 'border-forest' : 'border-transparent'}`} onClick={(e) => { e.stopPropagation(); setPaymentMethod('UPI'); setUpiProvider('gpay'); }}>
                    <img src="https://img.icons8.com/color/48/google-pay.png" alt="GPay" className="h-5 w-auto" />
                  </div>
                  <div className={`p-1 border rounded bg-cream ${upiProvider === 'phonepe' && paymentMethod === 'UPI' ? 'border-forest' : 'border-transparent'}`} onClick={(e) => { e.stopPropagation(); setPaymentMethod('UPI'); setUpiProvider('phonepe'); }}>
                    <img src="https://img.icons8.com/color/48/phonepe.png" alt="PhonePe" className="h-5 w-auto" />
                  </div>
                  <div className={`p-1 border rounded bg-cream ${upiProvider === 'paytm' && paymentMethod === 'UPI' ? 'border-forest' : 'border-transparent'}`} onClick={(e) => { e.stopPropagation(); setPaymentMethod('UPI'); setUpiProvider('paytm'); }}>
                    <img src="https://img.icons8.com/color/48/paytm.png" alt="Paytm" className="h-5 w-auto" />
                  </div>
                </div>
              </div>

              {/* Option B: Debit/Credit Card */}
              <div 
                onClick={() => setPaymentMethod('CARD')}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                  paymentMethod === 'CARD' ? 'bg-forest/5 border-forest shadow-sm' : 'bg-cream border-forest/10 hover:border-forest/30'
                }`}
              >
                <div className="flex items-center gap-2 text-forest font-bold text-sm">
                  <CheckCircle className={`h-4.5 w-4.5 ${paymentMethod === 'CARD' ? 'text-forest fill-forest/10' : 'text-forest/20'}`} />
                  <span className="flex items-center gap-1"><CreditCard className="h-4 w-4 text-forest/75" /> Card Payment</span>
                </div>
                <div className="text-[10px] text-charcoal/50 leading-relaxed text-left">
                  Supports Visa, Mastercard, RuPay & Maestro Cards.
                </div>
              </div>

              {/* Option C: Net Banking */}
              <div 
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                  paymentMethod === 'NETBANKING' ? 'bg-forest/5 border-forest shadow-sm' : 'bg-cream border-forest/10 hover:border-forest/30'
                }`}
              >
                <div className="flex items-center gap-2 text-forest font-bold text-sm">
                  <CheckCircle className={`h-4.5 w-4.5 ${paymentMethod === 'NETBANKING' ? 'text-forest fill-forest/10' : 'text-forest/20'}`} />
                  <span className="flex items-center gap-1"><Landmark className="h-4 w-4 text-forest/75" /> Net Banking</span>
                </div>
                <div className="text-[10px] text-charcoal/50 leading-relaxed text-left">
                  Secure checkout via SBI, HDFC, ICICI, Axis and major banks.
                </div>
              </div>

              {/* Option D: Cash on Delivery (COD) */}
              <div 
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                  paymentMethod === 'COD' ? 'bg-forest/5 border-forest shadow-sm' : 'bg-cream border-forest/10 hover:border-forest/30'
                }`}
              >
                <div className="flex items-center gap-2 text-forest font-bold text-sm">
                  <CheckCircle className={`h-4.5 w-4.5 ${paymentMethod === 'COD' ? 'text-forest fill-forest/10' : 'text-forest/20'}`} />
                  <span className="flex items-center gap-1"><Banknote className="h-4 w-4 text-forest/75" /> Cash on Delivery (COD)</span>
                </div>
                <div className="text-[10px] text-charcoal/50 leading-relaxed text-left">
                  Pay with cash or scan UPI upon safe package delivery.
                </div>
              </div>

            </div>

            {/* Simulated secure payment info banner */}
            <div className="p-3 bg-forest/5 border border-forest/10 rounded-xl flex gap-3 text-xs leading-relaxed text-charcoal/70">
              <Info className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <span>We utilize a fully encrypted SSL payment structure. Card credentials or net banking pins are processed securely and are never stored on our nodes.</span>
            </div>
          </div>

        </form>

        {/* Right Columns: Cart Summary Checkout Sticky Card (4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="bg-cream border border-forest/10 p-6 rounded-2xl shadow-sm space-y-5">
            <h4 className="font-serif text-base font-bold text-forest border-b border-forest/10 pb-2.5 flex items-center gap-2">
              <ShoppingBag className="h-4.5 w-4.5" /> Ritual Dispatch Summary
            </h4>

            {/* Short compact items list */}
            <div className="divide-y divide-forest/5 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.product._id} className="py-3 flex gap-3 items-center text-xs">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="h-10 w-10 object-cover rounded-md bg-cream border border-forest/10 shrink-0"
                  />
                  <div className="flex-grow text-left space-y-0.5">
                    <h5 className="font-serif font-bold text-forest line-clamp-1">{item.product.name}</h5>
                    <span className="text-charcoal/50 block font-semibold">{item.quantity} x ₹{item.price}</span>
                  </div>
                  <span className="font-sans font-bold text-forest shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations breaking */}
            <div className="space-y-3 text-xs pt-3 border-t border-forest/10 leading-normal">
              <div className="flex justify-between text-charcoal/65">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gold font-bold">
                  <span>Discount ({couponCode})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/65">
                <span>Standard Delivery</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-forest border-t border-forest/5 pt-2.5">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Primary Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Dispatched Ingesting...' : 'Place Secure Order'}
            </button>

            {/* Cert badges footer */}
            <div className="flex justify-center items-center gap-1.5 text-[9px] text-forest/65 font-bold uppercase tracking-wider pt-2">
              <ShieldCheck className="h-4 w-4" /> 100% Certified Sourcing Sourced
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;
