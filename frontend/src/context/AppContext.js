import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile");
      setUser(data);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
