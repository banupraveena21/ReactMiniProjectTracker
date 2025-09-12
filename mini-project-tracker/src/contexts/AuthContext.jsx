import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const resp = await axios.get('/auth/profile/');
        setUser(resp.data);
      } catch (error) {
        console.error("Profile fetch failed", error.response?.data || error.message);
        logout(); // clear tokens if invalid
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const login = async (username, password) => {
    try {
      const resp = await axios.post('/api/token/', { username, password });
      const { access, refresh } = resp.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setAccessToken(access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      const profileResp = await axios.get('/auth/profile/');
      setUser(profileResp.data);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
