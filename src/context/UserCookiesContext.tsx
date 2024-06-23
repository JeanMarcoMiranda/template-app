import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { User, UserCookiesContextType } from '@/types';

const userApp = 'user';
const authTokenApp = 'authToken';
const refreshTokenApp = 'refreshToken';

const UserCookiesContext = createContext<UserCookiesContextType | null>(null);

export const UserCookiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([userApp, authTokenApp, refreshTokenApp]);

  const saveUser = (user: User) => {
    setCookie(userApp, JSON.stringify(user), { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  };

  const removeUser = () => {
    removeCookie(userApp, { path: '/' });
  };

  const getUser = (): User | null => {
    const user = cookies[userApp];
    return user ? JSON.parse(user) : null;
  };

  const saveAccessToken = (token: string) => {
    setCookie(authTokenApp, token, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  };

  const removeAccessToken = () => {
    removeCookie(authTokenApp, { path: '/' });
  };

  const getAccessToken = (): string | undefined => {
    return cookies[authTokenApp];
  };

  const saveRefreshToken = (token: string) => {
    setCookie(refreshTokenApp, token, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  };

  const removeRefreshToken = () => {
    removeCookie(refreshTokenApp, { path: '/' });
  };

  const getRefreshToken = (): string | undefined => {
    return cookies[refreshTokenApp];
  };

  const removeSession = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
  };

  return (
    <UserCookiesContext.Provider
      value={{
        saveUser,
        removeUser,
        getUser,
        saveAccessToken,
        removeAccessToken,
        getAccessToken,
        saveRefreshToken,
        removeRefreshToken,
        getRefreshToken,
        removeSession,
      }}
    >
      {children}
    </UserCookiesContext.Provider>
  );
};

export const useUserCookies = (): UserCookiesContextType => {
  const context = useContext(UserCookiesContext);
  if (!context) {
    throw new Error('useUserCookies must be used within a UserCookiesProvider');
  }
  return context;
};
