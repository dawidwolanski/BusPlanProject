import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import styles from './LoginForm.module.scss';
import Button from '../../components/Button/Button';
import FormTextInput from '../../components/FormTextInput/FormTextInput';

type FormData = {
  input: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { user, login, logout } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
        const response = await login(data);

        if (!response.ok) {
          setLoginError(response.message);
          return
        }

        setLoginError(null);
    } catch (error: any) {
        setLoginError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={styles['login-container']}>
      {user ? (
        <div className={styles['login-status']}>
          <h2>Logged in as: {user?.username}</h2>
          <button onClick={handleLogout} className={styles['btn-logout']}>Logout</button>
        </div>
      ) : (
        <div className={styles['login-form']}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput
              label="username or email"
              id="input"
              type="text"
              register={register('input', { required: 'Login is required' })}
              error={errors.input}
            />
            <FormTextInput
              label="password"
              id="password"
              type="password"
              register={register('password', { required: 'Password is required' })}
              error={errors.password}
            />
            <div className={styles['error-message-container']}>
              {loginError && <p className={styles['error-message']}>{loginError}</p>}
            </div>
            <Button label={isLoading ? 'Loading...' : 'Login'} className={styles['btn-submit']} isSubmit={true} isDisabled={isLoading}></Button>
            <Link to="/register" className={styles['btn-register']}>Don't have an account? Register here</Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
