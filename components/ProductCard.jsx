'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      {/* Card Header & Badges */}
      <div className="card-media">
        {product.discount && (
          <span className="badge-discount">{product.discount}</span>
        )}
        {product.badge && (
          <span className="badge-tag">{product.badge}</span>
        )}

        <button
          className={`btn-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Save to Wishlist"
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>

        <div className="product-img-box">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-img"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-category-rating">
          <span className="product-category">{product.category}</span>
          <div className="rating-box">
            <span className="star">★</span>
            <span className="rating-val">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div className="card-footer-row">
          <div className="price-block">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn-add-cart"
            onClick={() => addToCart(product)}
            title="Add to Cart"
            aria-label={`Add ${product.name} to Cart`}
          >
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

