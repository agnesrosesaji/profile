import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div className="announcement-item">
          <span>🚚</span> Free Shipping on Orders Over $50
        </div>
        <div className="announcement-divider">•</div>
        <div className="announcement-item">
          <span>🔄</span> 30-Day Easy Returns
        </div>
        <div className="announcement-divider">•</div>
        <div className="announcement-item">
          <span>🔒</span> 100% Secure Checkout
        </div>
      </div>
    </div>
  );
}

