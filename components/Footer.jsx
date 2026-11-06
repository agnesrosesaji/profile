import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Col */}
        <div className="footer-col brand-col">
          <Link href="/" className="footer-logo">
            <span className="logo-icon">🌿</span>
            <div className="logo-text">
              <span className="logo-title">VIVA</span>
              <span className="logo-tagline">LIVE BETTER</span>
            </div>
          </Link>
          <p className="footer-description">
            Your mindful shop for health, everyday living, and conscious lifestyle essentials crafted with care.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </div>
        </div>

        {/* Column 2: Shop */}
        <div className="footer-col">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-list">
            <li><Link href="/#products">All Categories</Link></li>
            <li><Link href="/#products">New Arrivals</Link></li>
            <li><Link href="/#products">Best Sellers</Link></li>
            <li><Link href="/#products">Deals &amp; Offers</Link></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-list">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns &amp; Refunds</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQ &amp; Help</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Company */}
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Our Journal</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </div>

        {/* Column 5: App Download */}
        <div className="footer-col app-col">
          <h4 className="footer-heading">Download Our App</h4>
          <p className="app-sub">Enjoy exclusive mobile deals and early access.</p>
          <div className="app-badges">
            <div className="app-store-badge">
              <span>🍏</span>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </div>
            <div className="app-store-badge">
              <span>🤖</span>
              <div>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} VIVA Live Better. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="country-selector">
          <span>🇺🇸 United States (USD $)</span>
        </div>
      </div>
    </footer>
  );
}

