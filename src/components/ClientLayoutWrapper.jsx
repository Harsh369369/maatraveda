'use client';
import React from 'react';
import { usePathname } from '../utils/router-compat';
import DeliveryBanner from './DeliveryBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import FloatingWhatsApp from './FloatingWhatsApp';
import BottomNavigation from './BottomNavigation';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isOnboarding = pathname === '/onboarding';
  
  // Show bottom nav ONLY on these main tab paths
  const showBottomNav = ['/', '/profile', '/products', '/wishlist'].includes(pathname);

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans selection:bg-mv-olive/25 selection:text-mv-dark-green">
      {/* Top Promotion Ribbon (Hidden on Mobile) */}
      <div className="hidden md:block">
        <DeliveryBanner />
      </div>
      
      {/* Sticky Navigation Header (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Main Page Content Body */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Organic Premium Footer (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Footer />
      </div>
      
      {/* Slide-in Cart Drawer Overlay */}
      <CartDrawer />
      
      {/* Global Floating WhatsApp Support Widget (Hidden on Onboarding) */}
      <FloatingWhatsApp />

      {/* Floating Bottom Nav (Visible only on Mobile) */}
      <BottomNavigation />
    </div>
  );
}
