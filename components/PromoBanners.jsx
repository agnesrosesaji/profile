import React from 'react';
import Link from 'next/link';
import { PROMO_BANNERS } from '../data/products';

export default function PromoBanners() {
  return (
    <section className="promo-banners-section">
      <div className="container">
        <div className="promo-grid">
          {PROMO_BANNERS.map((banner, index) => (
            <div key={index} className="promo-card">
              <div className="promo-card-content">
                <span className="promo-tag">{banner.tag}</span>
                <h3 className="promo-title">{banner.title}</h3>
                <Link href="/#products" className="promo-link">
                  {banner.linkText}
                </Link>
              </div>
              <div className="promo-img-box">
                <img src={banner.image} alt={banner.title} className="promo-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

