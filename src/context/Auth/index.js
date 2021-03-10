import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthAPI from "../../services/api/authorization";

const AuthContext = createContext();

const { Provider, Consumer } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    initalizing: true,
    error: null,
  });

  const location = useLocation();

  useEffect(() => {
    // handle the case of where error message not dissapearing when moving between routes
    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      error: null,
    }));
  }, [location]);

  useEffect(() => {
    /* 
       handle getting the token on refresh of page
       note if we had an observor that monitors the sign in state we can redirect
       the user to the main page because they have been authenticated 
    */
    const getToken = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          authenticated: true,
          initalizing: false,
        }));
      } else {
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          initalizing: false,
        }));
      }
    };

    getToken();
  }, []);

  const handleSignUp = async (email) => {
    try {
      const response = await AuthAPI.signup(email);
      const { token } = response.data;
      if (token) {
        sessionStorage.setItem("token", token);
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          authenticated: true,
        }));
      }
    } catch (error) {
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        error: error?.data?.error ?? error,
      }));
    }
  };

  return (
    <Provider
      value={{
        ...authState,
        handleSignUp,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider, Consumer as AuthConsumer };
