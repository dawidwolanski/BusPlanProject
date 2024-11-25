import React, { useEffect, useState } from 'react';
import MenuLink from '../../components/MenuLink/MenuLink';
import BurgerMenuButton from '../../components/BurgerMenuButton/BurgerMenuButton';
import styles from './Header.module.scss';
import LoginButton from '../../components/LoginButton/LoginButton';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
    const toggleMenu = (): void => {
      setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
      if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 400);
          }
      }
  }, [location]);
  
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src="/assets/logos/logo-white.webp" alt="company logo" />
          </Link>
        </div>
  
        <div className={styles['right-container']}>
            <BurgerMenuButton onClick={toggleMenu} />
            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
                <ul className={styles['menu-list']}>
                    <li><MenuLink href="/" label="Home" /></li>
                    <li><MenuLink href="./#connections" label="Departures" /></li>
                    <li><MenuLink href="/panel" label="Panel" /></li>
                    {isMenuOpen && (
                      <li>
                        <LoginButton className={'menu-login-button'} />
                      </li>
                    )}
                </ul>
            </nav>
            <LoginButton className={'desktop-login-button'}/>
        </div>

        
      </header>
    );
  };
  
  

export default Header;
