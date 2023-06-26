import React, { createContext } from "react";

import useAuth from "./hooks/useAuth";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
