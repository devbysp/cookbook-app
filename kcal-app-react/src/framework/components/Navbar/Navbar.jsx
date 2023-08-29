import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Nav } from '../Nav/Nav';
import { NavItem } from '../NavItem/NavItem';
import { useNavbar } from './helpers/useNavbar';
import { normalize } from './helpers/validation';
import './navbar.css';

export function Navbar({
  brand, breakpoint, size, color, float, navItems,
}) {
  const [visible, setVisible] = useNavbar(breakpoint);
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="brand">{brand}</div>
      <Button className="toggler" onClick={() => setVisible(!visible)} />
      <Nav visible={visible}>
        {navItems.map((item) => (
          <NavItem
            key={item.link}
            href={normalize(item.link)}
            size={size}
            color={color}
            float={float}
            selected={normalize(location.pathname) === normalize(item.link)}
          >
            {item.label}
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}
