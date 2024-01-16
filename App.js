import NavigationStack from './util/NavigationStack';
import React from 'react';
import TopLevelContext from './context/index';

export default function App() {
  return (
    <TopLevelContext>
        <NavigationStack/>
    </TopLevelContext>
  );
}


