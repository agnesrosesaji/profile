'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    shippingCost,
    shippingThreshold,
    isFreeShipping,
    estimatedTax,
    total,
    showToast
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const amountNeededForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const shippingProgressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="cart-page-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">Shopping Cart</span>
        </nav>

        {/* Empty Cart State */}
        {cart.length === 0 && !orderPlaced ? (
          <div className="empty-cart-card">
            <div className="empty-cart-icon">🛍️</div>
            <h2 className="empty-cart-title">Your Cart is Empty</h2>
            <p className="empty-cart-sub">
              Looks like you haven't added anything to your cart yet. Explore our curated sustainable products!
            </p>
            <Link href="/#products" className="btn btn-hero">
              Start Shopping →
            </Link>
          </div>
        ) : orderPlaced ? (
          /* Order Confirmation Screen */
          <div className="order-success-card">
            <div className="success-icon">🎉</div>
            <h2>Thank You For Your Order!</h2>
            <p className="success-order-num">Order #VIVA-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="success-desc">
              We've received your mindful order and sent a confirmation email. It will be packaged with eco-friendly materials and dispatched shortly!
            </p>
            <div className="success-actions">
              <Link href="/" onClick={() => setOrderPlaced(false)} className="btn btn-hero">
                Continue Shopping 🌿
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Cart Content */
          <>
            {/* Free Shipping Meter */}
            <div className="shipping-progress-box">
              <div className="shipping-progress-text">
                {isFreeShipping ? (
                  <span>
                    🎉 <strong>Congratulations!</strong> You unlocked <strong>FREE Standard Shipping</strong>.
                  </span>
                ) : (
                  <span>
                    Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more to your order for <strong>FREE Shipping</strong>!
                  </span>
                )}
              </div>
              <div className="shipping-meter-track">
                <div
                  className="shipping-meter-fill"
                  style={{ width: `${shippingProgressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Main Cart Grid */}
            <div className="cart-grid">
              {/* Left Column: Cart Items */}
              <div className="cart-items-column">
                <div className="cart-header-row">
                  <h1 className="cart-title">Shopping Cart</h1>
                  <span className="cart-items-count">
                    ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    return (
                      <div key={item.id} className="cart-item-card">
                        <div className="cart-item-thumb">
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className="cart-item-details">
                          <span className="cart-item-category">{item.category}</span>
                          <h3 className="cart-item-name">{item.name}</h3>
                          <p className="cart-item-unit-price">${item.price.toFixed(2)} each</p>
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="cart-quantity-selector">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span className="qty-number">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="cart-item-total">
                          <span className="item-price-sum">${itemTotal.toFixed(2)}</span>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="btn-remove-item"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-footer-actions">
                  <Link href="/#products" className="btn-continue-shopping">
                    ← Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="btn-clear-cart">
                    Clear Entire Cart
                  </button>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="cart-summary-column">
                <div className="summary-card">
                  <h2 className="summary-title">Order Summary</h2>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {coupon.applied && (
                    <div className="summary-row discount-row">
                      <span>
                        Coupon ({coupon.code})
                        <button onClick={removeCoupon} className="btn-remove-coupon" title="Remove coupon">
                          ✕
                        </button>
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Estimated Shipping</span>
                    <span>
                      {isFreeShipping ? (
                        <strong className="free-shipping-text">FREE</strong>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Estimated Sales Tax (6%)</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span className="total-amount">${total.toFixed(2)}</span>
                  </div>

                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <input
                      type="text"
                      placeholder="Promo Code (try VIVA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="submit" className="btn-apply-coupon">
                      Apply
                    </button>
                  </form>
                  <p className="coupon-hint">💡 Try <strong>VIVA10</strong> for 10% off or <strong>GREEN20</strong> for 20% off.</p>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setCheckoutModalOpen(true)}
                    className="btn btn-checkout btn-block"
                  >
                    Proceed to Checkout →
                  </button>

                  {/* Security Guarantees */}
                  <div className="summary-guarantees">
                    <div className="guarantee-item">
                      <span>🔒</span> 256-Bit SSL Encrypted Checkout
                    </div>
                    <div className="guarantee-item">
                      <span>📦</span> Sustainable Carbon-Neutral Packaging
                    </div>
                    <div className="guarantee-item">
                      <span>🛡️</span> 30-Day Money Back Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="modal-backdrop" onClick={() => setCheckoutModalOpen(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Fast &amp; Secure Checkout</h3>
              <button className="modal-close" onClick={() => setCheckoutModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="checkout-summary-mini">
                <p>Order Total: <strong>${total.toFixed(2)}</strong></p>
                <p>Shipping to: <strong>Standard Express (2-3 Business Days)</strong></p>
              </div>

              <div className="checkout-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Sarah Jenkins" defaultValue="Sarah Jenkins" />
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <input type="text" placeholder="123 Blossom Way, Portland, OR" defaultValue="123 Blossom Way, Portland, OR" />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select defaultValue="card">
                    <option value="card">💳 Credit Card (•••• 4242)</option>
                    <option value="apple">🍏 Apple Pay</option>
                    <option value="paypal">🅿️ PayPal</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setCheckoutModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-checkout"
                onClick={() => {
                  setCheckoutModalOpen(false);
                  handlePlaceOrder();
                }}
              >
                Place Order (${total.toFixed(2)}) 🌿
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

