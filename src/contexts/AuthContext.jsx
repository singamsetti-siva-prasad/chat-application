import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  //capture current user
  const [currentUser, setCurrentUser] = useState({});

  //fetch current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    //to avoid memory leaks
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
