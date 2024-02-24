// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkOrderContext = createContext();

export const WorkOrderProvider = ({ children }) => {
  const [locationName, setLocationName] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [facilityId, setFacilityId] = useState(null);

  // Check if user is logged in when app initializes
  

  return (
    <WorkOrderContext.Provider value={{ locationName, setLocationName,locationId, setLocationId,facilityId, setFacilityId }}>
      {children}
    </WorkOrderContext.Provider>
  );
};

// Hook for easy access to auth context
export const useWorkOrderState = () => useContext(WorkOrderContext);
