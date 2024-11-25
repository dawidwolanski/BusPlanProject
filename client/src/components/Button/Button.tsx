import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: (e?: any) => void;
  className?: string;
  isSubmit?: boolean;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', isSubmit = false }) => {
  return (
    <button 
      type={isSubmit ? 'submit' : 'button'}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
