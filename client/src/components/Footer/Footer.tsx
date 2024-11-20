import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>2024</p>
      </div>
    </footer>
  );
};

export default Footer;
