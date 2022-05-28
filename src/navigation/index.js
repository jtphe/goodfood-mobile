import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreenAnimated from '@components/SplashScreenAnimated';
import Login from '@components/Login';
import Register from '@components/Register';
import BottomNavigator from '@navigation/BottomNavigator';
import OrderDetails from '@components/Order/orderDetails';
import PasswordEdit from '@components/Profile/PasswordEdit';
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
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name={i18n.t('orderPage.detailsTitle')}
              component={OrderDetails}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name={i18n.t('accountPage.passwordEditScreenTitle')}
              component={PasswordEdit}
              options={{
                headerShown: false
              }}
            />
          </Stack.Group>
          <Stack.Screen
            name="Root"
            component={BottomNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animationEnabled: false
            }}
          />
        </Stack.Navigator>
      </SplashScreenAnimated>
    </NavigationContainer>
  );
};

export default Navigation;
