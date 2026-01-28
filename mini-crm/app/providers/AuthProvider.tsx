import { AuthContext, type Role } from './AuthContext';
import type { ReactNode } from 'react';
import { useState } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState<Role>('user');

  const login = (r: Role) => {
    setIsAuth(true);
    setRole(r);
  };

  const logout = () => {
    setIsAuth(false);
    setRole('user');
  };

  return (
    <AuthContext.Provider value={{ isAuth, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
