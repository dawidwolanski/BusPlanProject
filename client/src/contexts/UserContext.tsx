import React, { createContext, useState, useContext, useEffect } from 'react';
import { getLoginStatus, loginUser, logoutUser, registerUser, AuthApiResponse } from '../api/authApi';
import { User } from 'shared/Interfaces/User';
import { UserRegistration } from 'shared/Interfaces/UserRegistration';

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (data: { input: string; password: string }) => Promise<AuthApiResponse>;
  logout: () => Promise<AuthApiResponse>;
  register: (data: { username: string; email: string; password: string; repeatedPassword: string }) => Promise<AuthApiResponse>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    verifyLoginStatus();
  }, []);

  
  const verifyLoginStatus = async () => {
    console.log('Verifying login status');
    
    try {
      const data = await getLoginStatus();
      if (data.loggedIn && data.user) {
        setUser(data.user);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setUser(null);
        sessionStorage.removeItem('user');
        logout()
      }
    } catch {
      setUser(null);
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { input: string; password: string }): Promise<AuthApiResponse> => {
    try {
      const response = await loginUser(data);
      if (response.ok && response.user) {
        setUser(response.user);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { ok: 0, message: 'Login error' };
    }
  };

  const logout = async (): Promise<AuthApiResponse> => {
    try {
      const response = await logoutUser();
      if (response.ok) {
        setUser(null);
        sessionStorage.removeItem('user');
      }
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      return { ok: 0, message: 'Logout error' };
    }
  };

  const register = async (data: UserRegistration): Promise<AuthApiResponse> => {
    try {
      const response = await registerUser(data);
      if (response.ok && response.user) {
        setUser(response.user);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error('Register error:', error);
      return { ok: 0, message: 'Register error' };
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
