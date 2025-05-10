import React, { createContext, useState, useEffect, useContext } from 'react';
import { userAPI } from '../api/API';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await userAPI.status();
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const signup = async (credentials) => {
    try {
      await userAPI.signup(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await userAPI.login(credentials);
      setIsAuthenticated(true);
      setUser(response.data.user); // Ensure the user object includes the role
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const logout = async () => {
    await userAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const verifySecurityCode = async ({ email, code }) => {
    try {
      const response = await userAPI.verifySecurityCode({ email, code });
      const { accesstoken, refreshtoken } = response.data;

      // Store tokens in cookies or localStorage if needed
      setIsAuthenticated(true);
      return { success: true, message: 'Verification successful' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Verification failed',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signup,
        login,
        logout,
        verifySecurityCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}