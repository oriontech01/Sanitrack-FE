import React, { useContext, useEffect } from 'react';
import NavigationStack from './util/NavigationStack';
import TopLevelContext from './context/index';
import { NotificationContext } from './context/NotificationContext';

export default function App() {
  return (
    <TopLevelContext>
      <NavigationStack />
    </TopLevelContext>
  );
}
