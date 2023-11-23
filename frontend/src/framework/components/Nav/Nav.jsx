import React from 'react';
import './nav.css';

export function Nav({ visible, children }) {
  return (
    <div className={`nav collapsible  ${visible ? 'show' : ''}`}>
      <ul className="nav-item-list">
        {children}
      </ul>
    </div>
  );
}
