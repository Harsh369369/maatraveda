'use client';
import React from 'react';
import { usePathname, useRouter, useLocation } from '../utils/router-compat';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const location = useLocation();

  // Show bottom nav ONLY on the main tab pages
  const allowedPaths = ['/', '/profile', '/products', '/wishlist'];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  // Hide bottom navigation if specifically on the profile address section
  const searchParams = new URLSearchParams(location.search);
  const activeSection = location.state?.section || searchParams.get('section');
  if (pathname === '/profile' && activeSection === 'address') {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: Home },
    { id: 'shop', label: 'Shop', path: '/products', icon: ShoppingBag },
    { id: 'favorites', label: 'Wishlist', path: '/wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', path: '/profile', icon: User }
  ];

  const handleNav = (path) => {
    router.push(path);
  };

  const isActive = (itemPath) => {
    if (itemPath === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <>
      {/* Floating Green WhatsApp/Chat FAB */}
      <button
        className="md:hidden fixed bottom-24 right-6 w-12 h-12 bg-[#22C55E] hover:bg-[#16A34A] rounded-full text-white shadow-lg flex items-center justify-center z-50 transition-all active:scale-95 cursor-pointer border border-white/10"
        aria-label="Chat"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
      </button>

      {/* Bottom Nav Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md border border-mv-dark-green/10 shadow-lg rounded-full py-2.5 px-4 flex items-center justify-between z-50 transition-all duration-300 select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return active ? (
            <button
              key={item.id}
              onClick={() => handleNav(item.path)}
              className="flex items-center gap-1.5 bg-mv-olive text-cream rounded-full py-2 px-4 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <Icon className="h-4.5 w-4.5 stroke-[2.5]" />
              <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => handleNav(item.path)}
              className="p-2.5 text-charcoal/50 hover:text-mv-olive transition-colors rounded-full cursor-pointer"
              aria-label={item.label}
            >
              <Icon className="h-4.5 w-4.5 stroke-[2]" />
            </button>
          );
        })}
      </div>
    </>
  );
}
