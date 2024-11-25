import React from 'react';
import styles from './LoginButton.module.scss';
import MenuLink from '../MenuLink/MenuLink';
import { useUser } from '../../contexts/UserContext';

interface LoginButtonProps {
  className: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <div className={styles['login-button']}>
      <MenuLink
        label={user ? 'Profile' : 'Login'}
        href={user ? '/profile' : '/login'}
        className={`${styles[className]} ${styles['login-button']}`}
      />
    </div>
  );
};

export default LoginButton;
