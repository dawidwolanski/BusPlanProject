import { User } from 'shared/Interfaces/User'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  login: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/userapi/status', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setIsLoggedIn(result.loggedIn);
          setUser(result.user || null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/userapi/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setLoginError(errorMessage);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setIsLoggedIn(true);
      setUser(result.user);
      setLoginError(null);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/userapi/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <div>
          <h2>Zalogowano jako: {user?.username}</h2>
          <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login trzeba dodac jakies f5 albo redirect po zalogowaniu</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="login" className="form-label">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                {...register('login', { required: 'Login is required' })}
              />
              {errors.login && <p className="text-danger">{errors.login.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            {loginError && <p className="text-danger mt-3">{loginError}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
