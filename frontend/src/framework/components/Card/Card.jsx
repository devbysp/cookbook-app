import React from 'react';
import './card.css';

export function Card({
  header, footer, children,
}) {
  return (
    <div className="card">
      <div className="card-header">
        {header}
      </div>

      <div className="card-body">
        {children}
      </div>

      <div className="card-footer">
        {footer}
      </div>
    </div>
  );
}
