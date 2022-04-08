import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreenAnimated from '@components/SplashScreenAnimated';
import Login from '@components/Login';
import Register from '@components/Register';
import Home from '@components/Home';
import i18n from '@i18n/i18n';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SplashScreenAnimated>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={i18n.t('login.screenTitle')}
        >
          <Stack.Group>
            <Stack.Screen
              name={i18n.t('login.screenTitle')}
              component={Login}
            />
            <Stack.Screen
              name={i18n.t('register.screenTitle')}
              component={Register}
            />
          </Stack.Group>
          <Stack.Screen name={i18n.t('home.screenTitle')} component={Home} />
        </Stack.Navigator>
      </SplashScreenAnimated>
    </NavigationContainer>
  );
};

export default Navigation;
