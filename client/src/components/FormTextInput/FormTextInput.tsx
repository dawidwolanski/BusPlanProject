import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormTextInput.module.scss';

interface FormTextInputProps {
  label: string;
  id: string;
  type: 'text' | 'password' | 'email' | 'datetime-local';
  register: UseFormRegisterReturn;
  error?: FieldError;
  defaultValue?: string | number;
}

const FormTextInput: React.FC<FormTextInputProps> = ({ label, id, type, register, error, defaultValue }) => {
  return (
    <div className={styles['form-group']}>
      <label htmlFor={id} className={styles['form-label']}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        id={id}
        {...register}
        className={styles['form-input']}
      />
      {error && <p className={styles['error-message']}>{error.message}</p>}
    </div>
  );
};

export default FormTextInput;
