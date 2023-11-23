import React from 'react';
import { Link } from 'react-router-dom';
import './navitem.css';

export function NavItem({
  className, href, size, color, float, selected, children,
}) {
  return (
    <li className={`nav-item button ${size ?? ''} ${color ?? ''} ${float ? 'float' : ''} ${selected ? 'selected' : ''} ${className || ''}`.trim()}>
      <Link className="nav-link" to={href || '/'}>
        {children}
      </Link>
    </li>
  );
}
