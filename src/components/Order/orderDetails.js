import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@config/';
import { connect, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getOrderLoaded,
  getOrderIsLoading
} from '@store/modules/order/selectors';
import { loadOrder } from '@store/modules/order/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '@i18n/i18n';
import Items from '@components/Order/items';
import moment from 'moment';
import * as Progress from 'react-native-progress';

const mapStateToProps = createSelector(
  [getOrderLoaded, getOrderIsLoading],
  (orderLoaded, orderIsLoading) => {
    return { order: orderLoaded, orderIsLoading };
  }
);

const OrderDetails = ({ navigation, route, order, orderIsLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      orderId: route.params.orderId
    };
    dispatch(loadOrder({ payload }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderDateParser = () => {
    return moment(order.createdAt).format('D MMMM YYYY');
  };

  const orderAddressParsed = () => {
    return `${order.address}, ${order.postalCode} ${order.city}`;
  };

  const _returnStatusColor = () => {
    switch (order.statut) {
      case 0:
        return { color: colors.YELLOW };
      case 1:
        return { color: colors.LIGHT_GREEN };
      case 2:
        return { color: colors.GREEN };
    }
  };

  const _returnStatusText = () => {
    switch (order.statut) {
      case 0:
        return i18n.t('orderPage.status.preparation');
      case 1:
        return i18n.t('orderPage.status.delivering');
      case 2:
        return i18n.t('orderPage.status.delivered');
    }
  };

  if (orderIsLoading) {
    return (
      <View style={styles.containerLoader}>
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
          <Text style={styles.orderAddressData}>{orderAddressParsed()}</Text>
        </View>
        <View style={styles.containerStatus}>
          <Text style={styles.statut}>{i18n.t('orderPage.status.status')}</Text>
          <Text style={[styles.statut, _returnStatusColor()]}>
            {_returnStatusText()}
          </Text>
        </View>
        <Items products={order.products} menus={order.menus} />
        <View style={styles.divider} />
        <View style={styles.containerTotal}>
          <Text style={styles.totalText}>{i18n.t('orderPage.total')}</Text>
          <Text style={styles.totalText}>
            {i18n.t('orderPage.totalPrice', { totalPrice: order.price })}
          </Text>
        </View>
        <View style={styles.orderDateContainer}>
          <Text style={styles.orderDateText}>
            {i18n.t('orderPage.orderDate', { date: orderDateParser() })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStatus: { flexDirection: 'row' },
  statut: { fontSize: 16, fontWeight: 'bold' },
  containerLoader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  orderDateText: { color: colors.YELLOW, fontSize: 14 },
  orderDateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 32
  },
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
  containerOrderDetails: { flex: 1, paddingHorizontal: 18 },
  containerOrderAddress: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18
  },
  orderAddressTitle: { fontWeight: 'bold', fontSize: 14, opacity: 0.5 },
  orderAddressData: { opacity: 0.5, fontSize: 16 }
});

export default connect(mapStateToProps)(OrderDetails);
