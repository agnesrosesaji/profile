import React from 'react';
import { REVIEWS } from '../data/products';

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head-row">
          <div className="section-title-wrap">
            <span className="eyebrow-tag">Community Love</span>
            <h2 className="section-heading">Loved By Thousands 🌿</h2>
          </div>
          <div className="overall-rating-badge">
            <span className="rating-score">4.8/5</span>
            <div className="stars">★★★★★</div>
            <span className="rating-text">Over 12,000+ happy customers</span>
          </div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <img src={review.avatar} alt={review.name} className="review-avatar" />
                <div>
                  <h4 className="reviewer-name">{review.name}</h4>
                  <div className="review-stars">{'★'.repeat(review.rating)}</div>
                </div>
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

