import React, { createContext, useState, useContext } from 'react';

const MemoryUsageContext = createContext();

export const MemoryUsageProvider = ({ children }) => {
  const [homeMemoryUsage, setHomeMemoryUsage] = useState(null);
  const [profileMemoryUsage, setProfileMemoryUsage] = useState(null);

  return (
    <MemoryUsageContext.Provider value={{ homeMemoryUsage, setHomeMemoryUsage, profileMemoryUsage, setProfileMemoryUsage }}>
      {children}
    </MemoryUsageContext.Provider>
  );
};

export const useMemoryUsage = () => useContext(MemoryUsageContext);
