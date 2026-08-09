import { useEffect, useState, useCallback } from 'react';
import { fetchMe, loginUser, logoutUser, registerUser } from '../api/auth.api';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (payload) => {
    const loggedInUser = await loginUser(payload);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (payload) => {
    const newUser = await registerUser(payload);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser().catch(() => {});
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
