'use client';

import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CategoryPills from '../components/CategoryPills';
import ProductCard from '../components/ProductCard';
import PromoBanners from '../components/PromoBanners';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { PRODUCTS } from '../data/products';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'sale', 'popular'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category, tab, and search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Tab filter
      let matchesTab = true;
      if (activeTab === 'sale') matchesTab = Boolean(product.discount);
      if (activeTab === 'popular') matchesTab = product.rating >= 4.8;

      // Search filter
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTab && matchesSearch;
    });
  }, [selectedCategory, activeTab, searchQuery]);

  return (
    <div className="home-page">
      {/* Hero Showcase */}
      <Hero />

      {/* Category Pills Strip */}
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Product Listing Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="products-header">
            <div>
              <span className="eyebrow-tag">Handpicked Essentials</span>
              <h2 className="section-heading">Top Picks For You 🌿</h2>
            </div>

            {/* Filter Tabs */}
            <div className="product-tabs" role="tablist">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Items
              </button>
              <button
                className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
                onClick={() => setActiveTab('popular')}
              >
                Top Rated ★
              </button>
              <button
                className={`tab-btn ${activeTab === 'sale' ? 'active' : ''}`}
                onClick={() => setActiveTab('sale')}
              >
                On Sale 🔥
              </button>
            </div>
          </div>

          {/* Search Indicator if search active */}
          {searchQuery && (
            <div className="search-status-bar">
              <span>Showing results for "{searchQuery}" ({filteredProducts.length} items)</span>
              <button onClick={() => setSearchQuery('')} className="btn-clear-search">
                Clear Search ✕
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products-found">
              <div className="no-products-icon">🔍</div>
              <h3>No matching products found</h3>
              <p>Try searching for another keyword or select a different category.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className="btn btn-hero"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lifestyle Promo Banners */}
      <PromoBanners />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter & Trust Badges */}
      <Newsletter />
    </div>
  );
}

