// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);

  // Check if user is logged in when app initializes
  

  return (
    <ItemContext.Provider value={{ inventory, setInventory }}>
      {children}
    </ItemContext.Provider>
  );
};

// Hook for easy access to auth context
export const useItemState = () => useContext(ItemContext);
