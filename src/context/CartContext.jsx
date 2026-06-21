'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('matree_cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('matree_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id);

      if (existingItem) {
        // If item exists, update its quantity (max check optional, but standard)
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // If new item, add to array
      return [...prevItems, { product, quantity, price: product.price }];
    });
    
    // Auto-open cart drawer for premium customer experience
    setCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price of cart items (in ₹)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate total number of items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
