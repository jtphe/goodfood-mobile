import React, { useEffect, useState } from 'react';
import OrderItem from '@components/Order/orderItem';
import CartBanner from '@shared/cartBanner';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getOrders, getOrdersIsLoading } from '@store/modules/order/selectors';
import { loadUserOrders } from '@store/modules/order/actions';
import { colors } from '@config/';
import * as Progress from 'react-native-progress';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector(
  [getOrders, getOrdersIsLoading],
  (orders, ordersIsLoading) => {
    return { orders, ordersIsLoading };
  }
);

const Order = ({ navigation, orders, ordersIsLoading }) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(loadUserOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _reloadUserOrders = () => {
    setIsFetching(true);
    dispatch(loadUserOrders());
    setIsFetching(false);
  };

  if (ordersIsLoading) {
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
      <Text style={styles.title}>{i18n.t('orderPage.mainTitle')}</Text>
      <View style={styles.containerContent}>
        <Text style={styles.oldOrdersTitle}>
          {i18n.t('orderPage.oldOrdersTitle')}
        </Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={orders.length}
          style={styles.oldOrdersFlatList}
          renderItem={({ item }) => (
            <OrderItem navigation={navigation} order={item} />
          )}
          ListEmptyComponent={
            <View>
              <Text style={styles.noOrderLoaded}>
                {i18n.t('orderPage.noOrderLoaded')}
              </Text>
            </View>
          }
          onRefresh={() => _reloadUserOrders()}
          refreshing={isFetching}
        />
      </View>
      <CartBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  oldOrdersFlatList: { marginBottom: 150 },
  noOrderLoaded: { color: colors.YELLOW, fontSize: 16 },
  containerLoader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  containerContent: { paddingLeft: 24 },
  container: {
    flex: 1,
    ...ifIphoneX({ paddingTop: calcHeight(7) }, { paddingTop: calcHeight(3) }),
    backgroundColor: 'white'
  },
  title: { alignSelf: 'center', fontSize: 24, fontWeight: 'bold' },
  oldOrdersTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 25
  }
});

export default connect(mapStateToProps)(Order);
