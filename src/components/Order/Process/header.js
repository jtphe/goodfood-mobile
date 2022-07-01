import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '@i18n/i18n';

const Header = ({ step }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('orderPage.orderStep', { step })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Header;
