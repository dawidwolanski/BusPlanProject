import React, { useState } from 'react';
import styles from './BurgerMenuButton.module.scss';
import BurgerMenuIcon from '../assets/icons/burger-menu.svg?react'

interface BurgerMenuButtonProps {
  onClick: () => void;
}

const BurgerMenuButton: React.FC<BurgerMenuButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.burgerMenuButton} onClick={onClick} aria-label="Menu">
      <BurgerMenuIcon className={styles.burgerMenuIcon} width={48} height={48}/>
    </button>
  );
};

export default BurgerMenuButton;
