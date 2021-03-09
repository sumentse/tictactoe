import { createContext, useState } from "react";

const AuthContext = createContext();

const { Provider, Consumer } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    initalizing: true,
    error: null,
  });

  return (
    <Provider
      value={{
        ...authState,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider, Consumer as AuthConsumer };
