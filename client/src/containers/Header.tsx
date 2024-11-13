import React, { useState } from 'react';
import MenuLink from '../components/MenuLink';
import BurgerMenuButton from '../components/BurgerMenuButton';
import styles from './Header.module.scss';
import Button from '../components/Button';


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
    const toggleMenu = (): void => {
      setIsMenuOpen(prevState => !prevState);
    };
  
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">
            <img src="/assets/logos/logo-white.webp" alt="company logo" />
          </a>
        </div>
  
        <div className={styles['right-container']}>
            <BurgerMenuButton onClick={toggleMenu} />
            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
                <ul className={styles['menu-list']}>
                    <li><MenuLink href="/home" label="Home" /></li>
                    <li><MenuLink href="/about" label="About" /></li>
                    <li><MenuLink href="/services" label="Services" /></li>
                    <li><MenuLink href="/contact" label="Contact" /></li>
                </ul>
            </nav>
            <Button label="Login/Register" />
        </div>

        
      </header>
    );
  };
  
  

export default Header;
