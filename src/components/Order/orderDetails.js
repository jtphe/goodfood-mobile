import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@config/';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '@i18n/i18n';
import Items from '@components/Order/items';

const OrderDetails = ({ navigation, route }) => {
  const order = useMemo(() => {
    return route.params.order;
  }, [route.params.order]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackRow}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-ios" size={20} style={styles.iconArrow} />
        <Text style={styles.textGoBack}>{i18n.t('button.back')}</Text>
      </TouchableOpacity>
      <View style={styles.containerOrderDetails}>
        <Text style={styles.orderDetailsTitle}>
          {i18n.t('orderPage.detailsTitle')}
        </Text>
        <Text style={styles.orderNumber}>
          {i18n.t('orderPage.orderNumber', { number: order.id })}
        </Text>
        <View style={styles.containerOrderAddress}>
          <Text style={styles.orderAddressTitle}>
            {i18n.t('orderPage.orderAddress')}
          </Text>
          <Text style={styles.orderAddressData}>{order.address}</Text>
        </View>
        <Items orderItems={order?.orderItems} />
        <View style={styles.divider} />
        <View style={styles.containerTotal}>
          <Text style={styles.totalText}>{i18n.t('orderPage.total')}</Text>
          <Text style={styles.totalText}>
            {i18n.t('orderPage.totalPrice', { totalPrice: order.totalPrice })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalText: { color: colors.YELLOW, fontWeight: 'bold', fontSize: 18 },
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16
  },
  divider: {
    borderWidth: 1,
    marginTop: 16,
    marginHorizontal: -18,
    borderColor: colors.GREY
  },
  container: { flex: 1 },
  goBackRow: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 24
  },
  iconArrow: {
    paddingLeft: 12
  },
  textGoBack: { fontWeight: 'bold', fontSize: 18 },
  orderDetailsTitle: {
    fontWeight: 'bold',
    color: colors.RED,
    fontSize: 20,
    marginBottom: 12
  },
  orderNumber: { fontSize: 16, opacity: 0.5, marginBottom: 8 },
  containerOrderDetails: { paddingHorizontal: 18 },
  containerOrderAddress: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18
  },
  orderAddressTitle: { fontWeight: 'bold', fontSize: 14, opacity: 0.5 },
  orderAddressData: { opacity: 0.5, fontSize: 16 }
});

export default OrderDetails;
