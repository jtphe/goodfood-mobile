/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Home from '@components/Home';
import Order from '@components/Order';
import i18n from '@i18n/i18n';
import TabBarIcon from '@navigation/BottomNavigator/tabBarIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '@config/';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <TabBarIcon
              route={route}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: colors.RED,
        tabBarInactiveTintColor: colors.GREY
      })}
    >
      <Tab.Screen
        name={i18n.t('home.screenTitle')}
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={i18n.t('searchPage.screenTitle')}
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={i18n.t('orderPage.screenTitle')}
        component={Order}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={i18n.t('accountPage.screenTitle')}
        component={Home}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
