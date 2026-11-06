'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! Welcome to the VIVA family. 🌿', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-info">
            <div className="newsletter-icon">✉️</div>
            <div>
              <h3 className="newsletter-title">Stay in the Loop</h3>
              <p className="newsletter-sub">
                Get exclusive deals, new arrivals, and mindful living inspiration straight to your inbox.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="btn-subscribe">
              Subscribe
            </button>
          </form>
        </div>

        {/* Trust Badges Bar */}
        <div className="trust-features-row">
          <div className="trust-item">
            <span className="trust-icon">🚚</span>
            <div>
              <strong>Free Shipping</strong>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔄</span>
            <div>
              <strong>Easy Returns</strong>
              <p>30 days return policy</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <div>
              <strong>Secure Payments</strong>
              <p>100% encrypted checkout</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💬</span>
            <div>
              <strong>24/7 Support</strong>
              <p>Dedicated customer care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

