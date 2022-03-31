import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Navigation from '@navigation/index';

const App = () => {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
};

export default App;
