import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreenAnimated from '@shared/SplashScreenAnimated';
import Home from '@components/Home';
import i18n from '@i18n/i18n';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SplashScreenAnimated>
        <Stack.Navigator>
          <Stack.Screen name={i18n.t('home.screenTitle')} component={Home} />
        </Stack.Navigator>
      </SplashScreenAnimated>
    </NavigationContainer>
  );
}

export default App;
