import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import IconUser from 'react-native-vector-icons/FontAwesome';
import IconSearch from 'react-native-vector-icons/Feather';
import IconOrder from 'react-native-vector-icons/Fontisto';
import i18n from '@i18n/i18n';

const TabBarIcon = ({ route, color, size }) => {
  const routeName = useMemo(() => {
    return route.name;
  }, [route]);

  const _handleIconName = () => {
    switch (routeName) {
      case i18n.t('home.screenTitle'):
        return 'home';
      case i18n.t('searchPage.screenTitle'):
        return 'search';
      case i18n.t('orderPage.screenTitle'):
        return 'prescription';
      case i18n.t('accountPage.screenTitle'):
        return 'user';
      default:
        return 'home';
    }
  };

  if (routeName === i18n.t('searchPage.screenTitle')) {
    return <IconSearch name={_handleIconName()} size={size} color={color} />;
  }

  if (routeName === i18n.t('orderPage.screenTitle')) {
    return <IconOrder name={_handleIconName()} size={size} color={color} />;
  }

  return routeName === i18n.t('home.screenTitle') ? (
    <Icon name={_handleIconName()} size={size} color={color} />
  ) : (
    <IconUser name={_handleIconName()} size={size} color={color} />
  );
};

export default TabBarIcon;
