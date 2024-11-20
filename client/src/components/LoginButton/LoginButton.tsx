import React from 'react';
import styles from './LoginButton.module.scss';
import MenuLink from '../MenuLink/MenuLink';

interface LoginButtonProps {
  className: string;
}
const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  return (
    <div className={styles['login-button']}>
      <MenuLink label='Login' href='/login' className={`${styles[className]} ${styles['login-button']}`}></MenuLink>
    </div>
  );
};

export default LoginButton;
