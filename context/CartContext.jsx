'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0, applied: false });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('viva_cart');
      const savedWishlist = localStorage.getItem('viva_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('viva_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('viva_wishlist', JSON.stringify(wishlist));
      } catch (e) {
        console.error('Failed to save wishlist to localStorage', e);
      }
    }
  }, [wishlist, isInitialized]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        showToast(`Increased "${product.name}" quantity (${existing.quantity + quantity})`);
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        showToast(`Added "${product.name}" to cart! 🛍️`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item) showToast(`Removed "${item.name}" from cart.`, 'info');
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon({ code: '', discountPercent: 0, applied: false });
    showToast('Cart cleared.', 'info');
  };

  // Wishlist Functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Coupon Logic
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VIVA10') {
      setCoupon({ code: 'VIVA10', discountPercent: 10, applied: true });
      showToast('Coupon "VIVA10" applied! 10% OFF 🌿');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'GREEN20') {
      setCoupon({ code: 'GREEN20', discountPercent: 20, applied: true });
      showToast('Coupon "GREEN20" applied! 20% OFF 🎉');
      return { success: true, message: '20% discount applied!' };
    } else {
      showToast('Invalid coupon code. Try "VIVA10" or "GREEN20"', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const removeCoupon = () => {
    setCoupon({ code: '', discountPercent: 0, applied: false });
    showToast('Coupon removed.', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = coupon.applied ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shippingThreshold = 50.0;
  const isFreeShipping = subtotal >= shippingThreshold || cart.length === 0;
  const shippingCost = isFreeShipping ? 0 : 5.99;
  const estimatedTax = (subtotal - discountAmount) * 0.06; // 6% tax
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        toast,
        coupon,
        cartCount,
        subtotal,
        discountAmount,
        shippingCost,
        shippingThreshold,
        isFreeShipping,
        estimatedTax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

