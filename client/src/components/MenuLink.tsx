import React from 'react';
import styles from './MenuLink.module.scss';

interface MenuLinkProps {
  label: string;
  href: string;
  className?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, href, className = '' }) => {
  return (
    <a
      className={`${styles.menu_link} ${className}`}
      href={href}
    >
      {label}
    </a>
  );
};

export default MenuLink;
