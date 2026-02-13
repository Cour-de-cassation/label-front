import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { urlHandler } from '../utils';
import { userType } from 'src/core';
import { localStorage } from '../services/localStorage';
import { jwtTokenHandler } from '../services/jwtToken';

export interface CurrentUser {
  _id?: string;
  email?: string;
  name?: string;
  role?: userType['role'];
  sessionIndex?: string;
}
interface UserContextType {
  user: CurrentUser | null;
  loading: boolean;
  onLogout: () => void;
  onLogin: (token: string) => void;
}
const UserContext = createContext<UserContextType | null>(null);

// eslint-disable-next-line react/prop-types
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');

      if (urlToken) {
        jwtTokenHandler.set(urlToken);
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (jwtTokenHandler.isTokenPresent()) {
        const userData = await whoami();
        setUser(userData);
        if (userData && userData.role == 'admin') {
          localStorage.adminViewHandler.set('admin');
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);
  const onLogin = async (token: string) => {
    jwtTokenHandler.set(token);
    const userData = await whoami();
    setUser(userData);
    if (userData && userData.role == 'admin') {
      localStorage.adminViewHandler.set('admin');
    }
  };

  const onLogout = () => {
    jwtTokenHandler.remove();
    setUser(null);
  };

  return <UserContext.Provider value={{ user, loading, onLogout, onLogin }}>{children}</UserContext.Provider>;
};

export const useCtxUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useCtxUser must be used within a UserProvider `);
  }
  return context;
};

async function whoami(): Promise<CurrentUser | null> {
  try {
    const token = jwtTokenHandler.get();
    if (!token) {
      return null;
    }

    const response = await fetch(`${urlHandler.getApiUrl()}/label/api/sso/whoami`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      if (response.status === 401) {
        jwtTokenHandler.remove();
      }
      return null;
    }
    return (await response.json()) as CurrentUser;
  } catch (error) {
    console.error('Error fetching authentication status:', error);
    return null;
  }
}
