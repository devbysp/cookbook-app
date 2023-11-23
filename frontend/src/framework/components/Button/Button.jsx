import React from 'react';
import './button.css';

export function Button({
  className, size, color, children, ...props
}) {
  return (
    <button
      type="button"
      className={`button float ${size ?? ''} ${color ?? ''} ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
