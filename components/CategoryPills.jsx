'use client';

import React from 'react';
import { CATEGORIES } from '../data/products';

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <section className="categories-strip-section">
      <div className="container">
        <div className="categories-scroll-wrapper">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`category-circle-btn ${isActive ? 'active' : ''}`}
              >
                <div className="category-icon-bubble">{cat.icon}</div>
                <span className="category-btn-title">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

