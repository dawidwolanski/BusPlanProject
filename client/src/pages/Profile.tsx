import React from 'react';
import { useUser } from '../contexts/UserContext';
import styles from './Profile.module.scss';
import Button from '../components/Button/Button';

const Profile: React.FC = () => {
  const { user, logout } = useUser();

  if (!user) {
    return <p>You're logged out</p>;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Type:</strong> {user.type}</p>
      <Button label='Logout' className={styles.logoutButton} onClick={handleLogout} />
    </div>
  );
}

export default Profile;
