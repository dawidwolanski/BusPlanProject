import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button 
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
