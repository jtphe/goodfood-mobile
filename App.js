import React from 'react';
import Navigation from '@navigation/index';
import configureStore from '@store/configureStore';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
