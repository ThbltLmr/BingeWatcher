import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ checkAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
