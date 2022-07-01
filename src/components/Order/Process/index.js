import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getMenuOrderStep } from '@store/modules/order/selectors';
import Header from '@components/Order/Process/header';

const mapStateToProps = createSelector([getMenuOrderStep], (menuOrderStep) => {
  return {
    menuOrderStep
  };
});

const OrderProcess = ({ menuOrderStep }) => {
  console.log('menuOrderStep', menuOrderStep);
  return (
    <View style={styles.container}>
      <Header step={menuOrderStep} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default connect(mapStateToProps)(OrderProcess);
