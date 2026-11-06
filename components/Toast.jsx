'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      <span className="toast-icon">
        {toast.type === 'success' && '✓'}
        {toast.type === 'error' && '✕'}
        {toast.type === 'info' && 'ℹ'}
      </span>
      <span>{toast.message}</span>
    </div>
  );
}

