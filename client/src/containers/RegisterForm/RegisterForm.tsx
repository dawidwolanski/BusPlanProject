import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import styles from './RegisterForm.module.scss';
import Button from '../../components/Button/Button';
import FormTextInput from '../../components/FormTextInput/FormTextInput';
import { sleep } from '../../utils/utils';
import { UserRegistration } from 'shared/Interfaces/UserRegistration';

type FormData = UserRegistration

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
        const result = await registerUser(data);
        await sleep(500);
        
        if (result.ok) {
            setRegisterError(null);
            navigate('/login');
        } else {
            setRegisterError(result.message);
        }
    } catch (error: any) {
        setRegisterError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-form']}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput
            label="username"
            id="username"
            type="text"
            register={register('username', { required: 'Username is required' })}
            error={errors.username}
          />
          <FormTextInput
            label="email"
            id="email"
            type="email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email}
          />
          <FormTextInput
            label="password"
            id="password"
            type="password"
            register={register('password', { required: 'Password is required' })}
            error={errors.password}
          />
          <FormTextInput
            label="repeat password"
            id="repeatedPassword"
            type="password"
            register={register('repeatedPassword', { required: 'Repeated password is required' })}
            error={errors.repeatedPassword}
          />
          <div className={styles['error-message-container']}>
            {registerError && <p className={styles['error-message']}>{registerError}</p>}
          </div>
          <Button label={isLoading ? 'Loading...' : 'Register'} className={styles['btn-submit']} isSubmit={true} isDisabled={isLoading}></Button>
          <Link to="/login" className={styles['btn-login']}>Already have an account? Login here</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
