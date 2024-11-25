import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import { getLoginStatus } from '../api/authApi';

const Register: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await getLoginStatus();
      if (response.loggedIn) {
        navigate('/');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <RegisterForm />
  );
}

export default Register;