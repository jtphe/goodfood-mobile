import React from 'react';
import Navigation from '@navigation/index';
import configureStore from '@store/configureStore';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';

export const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
