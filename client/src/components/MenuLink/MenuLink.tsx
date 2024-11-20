import React from 'react';
import styles from './MenuLink.module.scss';
import { Link } from 'react-router-dom';

interface MenuLinkProps {
  label: string;
  href: string;
  className?: string;
}
const MenuLink: React.FC<MenuLinkProps> = ({ label, href, className = '' }) => {
  return (
    <Link
      to={href}
      className={`${styles.menu_link} ${className}`}
    >
      {label}
    </Link>
  );
};

export default MenuLink;
