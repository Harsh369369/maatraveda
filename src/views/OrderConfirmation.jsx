'use client';
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from '../utils/router-compat';
import { CheckCircle2, ShoppingBag, MessageSquare, Clipboard, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const RITUAL_USAGE_TIPS = {
  'Keshya Bhringraj & Amla Hair Oil': '💡 Warm the oil slightly before massaging onto your scalp. Leave it on for at least 45 minutes or overnight, then wash off with our Shikakai cleanser to stimulate follicle growth.',
  'Keshya Shikakai Herbal Shampoo': '💡 Dilute a capful of shampoo in half a cup of water before applying to wet hair. This helps distribute the natural soapnuts uniformly and maintains your scalp pH balance.',
  'Soundarya Kumkumadi Radiant Facial Serum': '💡 Apply exactly 2-3 drops on a clean, damp face at bedtime. Gently massage in upward, sweeping strokes for 5 minutes, allowing saffron stigmas to illuminate your skin overnight.',
  'Soundarya Tejas Golden Ubtan Mask': '💡 Apply a medium layer on face and neck. Let it dry for 10 minutes, then wash off by softly massaging in circular motions with cool water to reveal clean, smooth skin.',
  'Suryakanti Neem & Turmeric Body Wash': '💡 Inhale the fresh, herbaceous neem aroma deeply during Snana (bathing). Lather using hands instead of plastic loofahs to keep your delicate skin barrier fully protected.',
  'Suryakanti Royal Sandalwood Body Butter': '💡 Apply immediately after stepping out of the bath when skin is warm and damp. This locks in 24-hour moisture and keeps you wrapped in mysore sandalwood aroma.',
  'Ojas Triphala Detoxifying Capsules': '💡 Swallow 2 capsules at bedtime with half a glass of lukewarm water. Triphala works overnight to cleanse your digestive fire (Agni), giving you clear skin in the morning.',
  'Ojas Ashwagandha Vitality Elixir': '💡 Stir 1 tablespoon of elixir into a glass of warm milk or warm water at dusk. It calms hyperactive stress chemicals and ensures a deeply restorative sleep cycle.',
  'Ojas Brahmi Memory Concentrate': '💡 Take 1 teaspoon in the morning on an empty stomach to enhance mental focus, calm hyperactive nerves, and support cognitive concentration.'
};

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve receipt details from navigation state. Fallback to mock data if accessed directly to prevent crash.
  const stateData = location.state || {
    order: {
      _id: 'order_mock_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      customerName: 'Aditi Sharma',
      phone: '9119047015',
      address: 'Flat 402, Spice Towers, HAL Phase 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560037',
      items: [
        { product: { name: 'Keshya Bhringraj & Amla Hair Oil' }, quantity: 1, price: 349 },
        { product: { name: 'Soundarya Kumkumadi Radiant Facial Serum' }, quantity: 1, price: 699 }
      ],
      totalAmount: 1048
    },
    discountAmount: 104,
    couponCode: 'RITUAL10',
    shippingFee: 0,
    grandTotal: 944,
    paymentMethod: 'COD',
    email: 'aditi.sharma@gmail.com'
  };

  const { order, discountAmount, couponCode, shippingFee, grandTotal, paymentMethod, email } = stateData;

  // Formulate a beautiful Order ID
  const shortOrderId = order._id.toString().substring(Math.max(0, order._id.toString().length - 8)).toUpperCase();
  const fullOrderId = `MATRIVEDA_${shortOrderId}`;

  // Estimate delivery (3-5 business days)
  const getDeliveryDateRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 5);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-IN', options)} - ${end.toLocaleDateString('en-IN', options)}`;
  };

  // Extract custom usage tips based on items in the cart
  const orderTips = [];
  order.items.forEach((item) => {
    const productName = item.product.name || '';
    if (RITUAL_USAGE_TIPS[productName]) {
      orderTips.push({
        product: productName,
        tip: RITUAL_USAGE_TIPS[productName]
      });
    }
  });

  // Handle WhatsApp Dispatch Message
  const handleWhatsAppNotify = () => {
    let msg = `🌿 *Matriveda Ayurvedic Wellness Order* 🌿\n\n`;
    msg += `*Order ID:* #${fullOrderId}\n`;
    msg += `*Status:* Confirmed (Pending Dispatch)\n\n`;
    msg += `*Customer Info:*\n`;
    msg += `• Name: ${order.customerName}\n`;
    msg += `• Phone: ${order.phone}\n`;
    msg += `• Address: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}\n\n`;
    
    msg += `*Items Harvested:*\n`;
    order.items.forEach((item) => {
      msg += `• ${item.quantity}x ${item.product.name || 'Ayurvedic Blend'} (₹${item.price} each)\n`;
    });

    msg += `\n*Subtotal:* ₹${order.totalAmount - shippingFee + discountAmount}\n`;
    if (discountAmount > 0) {
      msg += `*Discount:* -₹${discountAmount} (${couponCode})\n`;
    }
    msg += `*Shipping:* ${shippingFee === 0 ? 'FREE 🚚' : `₹${shippingFee}`}\n`;
    msg += `*Grand Total:* ₹${grandTotal}\n`;
    msg += `*Payment:* ${paymentMethod} (Selectable)\n\n`;
    
    msg += `🙏 Thank you for supporting sustainable Indian farms.\n\n`;
    
    if (orderTips.length > 0) {
      msg += `💡 *Daily Wellness Ritual Tip for You:*\n`;
      msg += `${orderTips[0].tip}\n`;
    }

    const waUrl = `https://wa.me/919119047015?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-8 text-left">
      
      {/* Top Banner Success Indicator */}
      <div className="bg-forest/5 border border-forest/10 p-6 sm:p-10 rounded-3xl text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-forest mx-auto animate-float-slow fill-forest/10" />
        <div className="space-y-1">
          <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gold">Order Placed Successfully</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest">Your path to wellness has begun!</h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-lg mx-auto">
            Order ID: <span className="font-bold text-forest">#{fullOrderId}</span>. We have dispatched a confirmation receipt to your email <span className="font-bold text-charcoal/80">{email}</span>.
          </p>
        </div>
      </div>

      {/* Split Receipt Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Order Items & Shipping Coordinates (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Sourcing details */}
          <div className="bg-cream border border-forest/10 p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-forest text-base border-b border-forest/10 pb-2 flex items-center gap-1.5">
              <ShoppingBag className="h-4.5 w-4.5" /> Order Summary
            </h4>
            <div className="divide-y divide-forest/5">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center text-sm">
                  <div className="space-y-0.5 text-left">
                    <span className="font-serif font-bold text-forest block">{item.product.name}</span>
                    <span className="text-charcoal/50 text-xs">{item.quantity} x ₹{item.price}</span>
                  </div>
                  <span className="font-sans font-bold text-forest">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            {/* Calculation summary */}
            <div className="space-y-2 text-xs pt-3 border-t border-forest/10">
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping standard delivery</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gold font-semibold">
                  <span>Discount Applied ({couponCode})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-forest border-t border-forest/5 pt-2">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Delivery coordinates */}
          <div className="bg-cream border border-forest/10 p-6 rounded-2xl shadow-sm space-y-3">
            <h4 className="font-serif font-bold text-forest text-base border-b border-forest/10 pb-2">
              Shipping Coordinates
            </h4>
            <div className="text-sm space-y-2 text-charcoal/70">
              <div><span className="font-semibold text-forest">Consignee:</span> {order.customerName}</div>
              <div><span className="font-semibold text-forest">WhatsApp Mobile:</span> +91 {order.phone}</div>
              <div><span className="font-semibold text-forest">Delivery Address:</span> {order.address}, {order.city}, {order.state} - {order.pincode}</div>
              <div className="pt-2 border-t border-forest/5 flex justify-between items-center text-xs">
                <span className="font-semibold text-forest">Estimated Delivery:</span>
                <span className="font-sans font-bold text-gold uppercase tracking-wider">{getDeliveryDateRange()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive WhatsApp and Ayurvedic usage tips (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* WhatsApp Activation Box */}
          <div className="bg-gold/10 border border-gold/30 p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-serif text-base font-bold text-forest flex items-center gap-1.5">
              <MessageSquare className="h-5 w-5 text-gold fill-gold/15 animate-bounce" /> WhatsApp Consultation
            </h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Confirm your order instantly and get in touch with our certified Vaidyas on WhatsApp to schedule a free pulse check!
            </p>
            <button
              onClick={handleWhatsAppNotify}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans text-xs font-black py-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <MessageSquare className="h-4.5 w-4.5 fill-current" /> Confirm via WhatsApp
            </button>
          </div>

          {/* Ayurvedic Sourcing tips */}
          {orderTips.length > 0 && (
            <div className="bg-cream border border-forest/10 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-forest flex items-center gap-1.5 border-b border-forest/10 pb-2">
                <ShieldCheck className="h-4.5 w-4.5 text-gold" /> Ayurvedic Daily Ritual
              </h4>
              <div className="space-y-4">
                {orderTips.map((tipObj, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs text-left">
                    <span className="font-serif font-black text-forest block text-xs underline">{tipObj.product}</span>
                    <p className="font-sans text-charcoal/75 leading-relaxed bg-cream-dark/15 border border-forest/5 p-3 rounded-lg">
                      {tipObj.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Bottom control links */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-forest/10 pt-8">
        <Link 
          to="/products"
          className="bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-3.5 px-8 rounded-lg shadow-sm transition-colors uppercase tracking-widest flex items-center gap-1"
        >
          Browse More Rituals <ArrowRight className="h-4 w-4" />
        </Link>
        <Link 
          to="/"
          className="text-xs font-bold text-forest hover:text-leaf uppercase tracking-wider font-sans underline"
        >
          Return to Homepage
        </Link>
      </div>

    </div>
  );
};

export default OrderConfirmation;
