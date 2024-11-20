import { User } from 'shared/Interfaces/User';
import ENDPOINTS from '../config/endpoints';

export interface AuthApiResponse {
  ok: 0 | 1;
  message: string;
  loggedIn?: boolean;
  user?: User;
  expiresAt?: number
};

export const getLoginStatus = async (): Promise<AuthApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.USER.STATUS, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    console.error('Unable to fetch login status');
    return { ok: 0, message: 'Unable to fetch login status' };
  } catch (error: any) {
    console.error(error);
    return { ok: 0, message: error.message };
  }
};

export const loginUser = async (data: { input: string; password: string }): Promise<AuthApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.USER.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) {
      console.error(await response.text());
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
    return { ok: 0, message: error.message };
  }
};

export const logoutUser = async (): Promise<AuthApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.USER.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Logout failed');
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
    return { ok: 0, message: error.message };
  }
};

export const registerUser = async (data: { username: string; email: string; password: string; repeatedPassword: string }): Promise<AuthApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.USER.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) {
      console.error(await response.text());
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
    return { ok: 0, message: error.message };
  }
};
