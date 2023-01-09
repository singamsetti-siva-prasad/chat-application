import React, { createContext, useState } from "react";

export const ActiveContext = createContext();

export const ActiveContextProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  //   if (window.innerWidth < 768) {
  //     setActive(true);
  //   }
  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
};
