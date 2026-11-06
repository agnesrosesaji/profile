import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          <div className="hero-content">
            <span className="hero-badge">Curated Living 🌿</span>
            <h1 className="hero-title">Elevate Your Everyday</h1>
            <p className="hero-description">
              Discover quality sustainable essentials across every category — mindfully crafted for the modern lifestyle.
            </p>
            <div className="hero-actions">
              <Link href="/#products" className="btn btn-hero">
                Shop Now →
              </Link>
            </div>

            <div className="hero-features">
              <div className="hero-feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Curated Quality</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-icon">🏷️</span>
                <span>Best Prices</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-icon">🚀</span>
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-sale-tag">
              <span className="sale-text">SUMMER SALE</span>
              <span className="sale-highlight">Up to 40%</span>
            </div>
            {/* High-res lifestyle collage image representing the mockup */}
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=85"
                alt="Curated Lifestyle Products"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

