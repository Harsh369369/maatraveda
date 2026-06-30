'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '../firebase.js';

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

  // Verify Admin Session on mount or when adminToken changes
  useEffect(() => {
    const verifyAdminToken = async () => {
      if (!adminToken) {
        setAdmin(null);
        setAdminLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setAdmin(data.admin);
        } else {
          localStorage.removeItem('matree_admin_token');
          setAdminToken(null);
          setAdmin(null);
        }
      } catch (err) {
        console.error('Admin verification failed:', err);
      } finally {
        setAdminLoading(false);
      }
    };

    verifyAdminToken();
  }, [adminToken]);

  // Verify Customer Session on mount or when userToken changes
  useEffect(() => {
    const verifyUserToken = async () => {
      if (!userToken) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/auth/user/me', {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('matree_user_token');
          setUserToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('User verification failed:', err);
      } finally {
        setUserLoading(false);
      }
    };

    verifyUserToken();
  }, [userToken]);

  // ------------------------------------------
  // ADMIN PORTAL METHODS (Real)
  // ------------------------------------------
  const login = async (email, password) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid administrative email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Password coordinates must be at least 4 characters long.' };
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('matree_admin_token', data.token);
        setAdminToken(data.token);
        setAdmin(data.admin);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid administrative credentials.' };
      }
    } catch (err) {
      return { success: false, message: 'Login failed due to a server connection error.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('matree_admin_token');
    setAdminToken(null);
    setAdmin(null);
  };

  // ------------------------------------------
  // CUSTOMER WEBSITE METHODS (Real)
  // ------------------------------------------
  const userRegister = async (name, email, password) => {
    if (!name || name.trim().length < 2) {
      return { success: false, message: 'Your name must contain at least 2 characters.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 2. Set profile display name
      await updateProfile(userCredential.user, { displayName: name });
      // 3. Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // 4. Send token to backend to sync/create in Firestore
      const response = await fetch('/api/auth/user/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: idToken })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('matree_user_token', data.token);
        setUserToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration synchronization failed.' };
      }
    } catch (err) {
      console.error(err);
      let errMsg = 'Registration failed due to a connection or server error.';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'An account with this email already exists in Firebase.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'The email address is badly formatted.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'The password is too weak.';
      } else if (err.message) {
        errMsg = err.message;
      }
      return { success: false, message: errMsg };
    }
  };

  const userLogin = async (email, password) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // 2. Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // 3. Send token to backend to establish local session
      const response = await fetch('/api/auth/user/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: idToken })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('matree_user_token', data.token);
        setUserToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login synchronization failed.' };
      }
    } catch (err) {
      console.error(err);
      let errMsg = 'Login failed due to a connection or server error.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errMsg = 'Invalid email or password.';
      } else if (err.message) {
        errMsg = err.message;
      }
      return { success: false, message: errMsg };
    }
  };

  const userGoogleLogin = async (credential) => {
    try {
      const response = await fetch('/api/auth/user/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('matree_user_token', data.token);
        setUserToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Google authentication failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Google authentication failed due to a server connection error.' };
    }
  };

  const userUpdateProfile = async (updateData) => {
    try {
      const response = await fetch('/api/auth/user/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Profile update failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Profile update failed due to a server connection error.' };
    }
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
        userGoogleLogin,
        userUpdateProfile,
        userLogout,
        userIsAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
