import React from 'react';
import styles from './MenuLink.module.scss';

interface MenuLinkProps {
  label: string;
  href: string;
  className?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, className = '' }) => {
  return (
    <a
      className={`${styles.menu_link} ${className}`}
    >
      {label}
    </a>
  );
};

export default MenuLink;
