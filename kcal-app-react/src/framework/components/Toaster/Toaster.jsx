import React from 'react';
import { Toast } from './components/Toast';

export function Toaster({ inbox }) {
  if (inbox.length === 0) return null;

  // Not needed, just to keep css compatible with html
  const showClass = inbox.length ? 'show' : '';

  return (
    <div className={`toaster ${showClass}`.trim()}>
      {inbox.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.content}
          toastType={toast.type}
          onClose={toast.onClose}
        />
      ))}
    </div>

  );
}
