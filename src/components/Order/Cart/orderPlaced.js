import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@config/';
import Icon from 'react-native-vector-icons/AntDesign';
import Error from 'react-native-vector-icons/Entypo';
import i18n from '@i18n/i18n';
import * as Progress from 'react-native-progress';

const OrderPlaced = ({ processStatus, closeModal, orderIsCreating }) => {
  if (orderIsCreating) {
    return (
      <View style={styles.container}>
        <Progress.Circle
          size={60}
          indeterminate={true}
          borderWidth={2}
          color={colors.YELLOW}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => {
          closeModal();
        }}
      >
        <Icon name="close" size={28} color={colors.RED} />
      </TouchableOpacity>
      {processStatus ? (
        <>
          <Text style={styles.orderPlacedText}>
            {i18n.t('orderPage.orderPlaced')}
          </Text>
          <Icon name="checkcircle" size={40} color={colors.YELLOW} />
        </>
      ) : (
        <>
          <Text style={styles.orderPlacedText}>
            {i18n.t('orderPage.errorOrderPlaced')}
          </Text>
          <Error name="circle-with-cross" size={40} color={colors.RED} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  orderPlacedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.RED,
    textAlign: 'center',
    marginBottom: 24
  },
  closeBtn: { position: 'absolute', right: 18, top: 18 }
});

export default OrderPlaced;
