import React, { createContext } from "react";

import useAuth from "./hooks/useAuth";

const Context = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
