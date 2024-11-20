import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormTextInput.module.scss';

interface FormTextInputProps {
  label: string;
  id: string;
  type: 'text' | 'password' | 'email';
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormTextInput: React.FC<FormTextInputProps> = ({ label, id, type, register, error }) => {
  return (
    <div className={styles['form-group']}>
      <label htmlFor={id} className={styles['form-label']}>{label}</label>
      <input
        type={type}
        id={id}
        {...register}
        className={styles['form-input']}
      />
      {error && <p className={styles['error-message']}>{error.message}</p>}
    </div>
  );
};

export default FormTextInput;
