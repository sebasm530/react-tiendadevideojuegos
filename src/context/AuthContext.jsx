import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    // Check for existing token on app startup
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser({ token: storedToken });
    }
    setLoading(false);
  }, []);

  function login(userToken, userData) {
    if (userData === undefined) userData = null;
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData || { token: userToken });
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  function isAuthenticated() {
    return !!token;
  }

  const value = {
    user: user,
    token: token,
    loading: loading,
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    props.children
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };