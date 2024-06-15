import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [profileId, setProfileId] = useState(null);

  return (
    <UserContext.Provider value={{ profileId, setProfileId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
