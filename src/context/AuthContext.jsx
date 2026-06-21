'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getSafeLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  // Admin Credentials States
  const [admin, setAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(getSafeLocalStorageItem('matree_admin_token') || null);
  const [adminLoading, setAdminLoading] = useState(true);

  // Standard Customer Credentials States
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(getSafeLocalStorageItem('matree_user_token') || null);
  const [userLoading, setUserLoading] = useState(true);

  // Verify Admin Session on mount or when adminToken changes (Mocked)
  useEffect(() => {
    const verifyAdminToken = () => {
      if (!adminToken) {
        setAdmin(null);
        setAdminLoading(false);
        return;
      }
      // Mock successful admin verification if token exists
      setAdmin({
        id: 'admin_mock_id',
        email: 'admin@matriveda.com'
      });
      setAdminLoading(false);
    };

    verifyAdminToken();
  }, [adminToken]);

  // Verify Customer Session on mount or when userToken changes (Mocked)
  useEffect(() => {
    const verifyUserToken = () => {
      if (!userToken) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      // Mock successful user verification if token exists
      setUser({
        id: 'user_mock_id',
        name: 'Test Customer',
        email: 'test@user.com'
      });
      setUserLoading(false);
    };

    verifyUserToken();
  }, [userToken]);

  // ------------------------------------------
  // ADMIN PORTAL METHODS (Mocked)
  // ------------------------------------------
  const login = async (email, password) => {
    // Simply accept any login for UI testing, generate mock token
    const token = 'mock_admin_token_' + Math.random().toString(36).substring(2);
    localStorage.setItem('matree_admin_token', token);
    setAdminToken(token);
    setAdmin({
      id: 'admin_mock_id',
      email: email || 'admin@matriveda.com'
    });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('matree_admin_token');
    setAdminToken(null);
    setAdmin(null);
  };

  // ------------------------------------------
  // CUSTOMER WEBSITE METHODS (Mocked)
  // ------------------------------------------
  const userRegister = async (name, email, password) => {
    // Simply accept any registration for UI testing
    const token = 'mock_user_token_' + Math.random().toString(36).substring(2);
    localStorage.setItem('matree_user_token', token);
    setUserToken(token);
    setUser({
      id: 'user_mock_id',
      name: name,
      email: email
    });
    return { success: true };
  };

  const userLogin = async (email, password) => {
    // Simply accept any login for UI testing
    const token = 'mock_user_token_' + Math.random().toString(36).substring(2);
    localStorage.setItem('matree_user_token', token);
    setUserToken(token);
    setUser({
      id: 'user_mock_id',
      name: 'Test Customer',
      email: email
    });
    return { success: true };
  };

  const userLogout = () => {
    localStorage.removeItem('matree_user_token');
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        // Admin Exports
        admin,
        adminToken,
        adminLoading,
        login,
        logout,
        isAuthenticated: !!admin,

        // Customer User Exports
        user,
        userToken,
        userLoading,
        userRegister,
        userLogin,
        userLogout,
        userIsAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
