import React from 'react';
import Navigation from '@navigation/index';
import configureStore from '@store/configureStore';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';

export const { store, persistor } = configureStore();

const App = () => {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <MenuProvider
              customStyles={{
                backdrop: {
                  backgroundColor: 'black',
                  opacity: 0.5
                }
              }}
            >
              <Navigation />
            </MenuProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
