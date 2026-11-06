'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar({ searchQuery = '', onSearchChange }) {
  const { cartCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      {/* Main Header Row */}
      <div className="main-header">
        <div className="container header-container">
          {/* Logo */}
          <Link href="/" className="brand-logo">
            <div className="logo-icon">🌿</div>
            <div className="logo-text">
              <span className="logo-title">VIVA</span>
              <span className="logo-tagline">LIVE BETTER</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="header-search">
            <input
              type="text"
              placeholder="Search products, organic beauty, home decor..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="search-input"
            />
            <button className="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Action Links */}
          <div className="header-actions">
            <button className="action-item" title="Account">
              <span className="action-icon">👤</span>
              <span className="action-label">Account</span>
            </button>

            <button className="action-item" title="Wishlist">
              <span className="action-icon">
                🤍
                {wishlist.length > 0 && (
                  <span className="badge-count">{wishlist.length}</span>
                )}
              </span>
              <span className="action-label">Wishlist</span>
            </button>

            <Link href="/cart" className={`action-item cart-action ${pathname === '/cart' ? 'active' : ''}`} title="Cart">
              <span className="action-icon">
                🛍️
                {cartCount > 0 && (
                  <span className="badge-count">{cartCount}</span>
                )}
              </span>
              <span className="action-label">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Navigation Bar */}
      <nav className={`secondary-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="container nav-strip">
          <div className="category-dropdown-btn">
            <span>☰</span>
            <span>All Categories</span>
          </div>

          <div className="nav-links">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/#products" className="nav-link">
              Shop
            </Link>
            <Link href="/#products" className="nav-link">
              Deals
            </Link>
            <Link href="/#products" className="nav-link">
              New Arrivals
            </Link>
            <span className="nav-link">Brands</span>
            <span className="nav-link">Inspiration</span>
            <span className="nav-link">Track Order</span>
          </div>

          <div className="nav-extra-badge">
            Summer Sale: <strong>Up to 40% Off</strong>
          </div>
        </div>
      </nav>
    </header>
  );
}

