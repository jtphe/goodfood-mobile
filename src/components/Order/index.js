/* eslint-disable global-require */
import React from 'react';
import OrderItem from '@components/Order/orderItem';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import i18n from 'i18n-js';

const Order = ({ navigation }) => {
  const fictionalDataOrders = [
    {
      id: 1,
      totalPrice: 23.99,
      createdAt: 1652343561,
      pictureSrc: require('@images/goodfood_logo_G.png'),
      address: '12 rue du Puit, 67000 Strasbourg',
      orderItems: [
        {
          id: 1,
          type: 'Menu Burger',
          price: 14.99,
          items: {
            food: 1,
            snack: 2,
            drink: 3
          }
        },
        {
          id: 2,
          type: 'Custom',
          price: 9,
          items: {
            food: [1, 4, 6],
            snack: [2, 3, 4],
            drink: [2, 3]
          }
        }
      ]
    },
    {
      id: 2,
      totalPrice: 9,
      createdAt: 1652343561,
      address: '12 rue du Puit, 67000 Strasbourg',
      pictureSrc: require('@images/goodfood_logo_G.png'),
      orderItems: [
        {
          id: 3,
          type: 'Custom',
          price: 9,
          items: {
            food: [1, 2, 4],
            snack: [2, 5, 6],
            drink: [2, 3]
          }
        }
      ]
    }
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('orderPage.mainTitle')}</Text>
      <>
        <Text style={styles.oldOrdersTitle}>
          {i18n.t('orderPage.oldOrdersTitle')}
        </Text>
        <FlatList
          data={fictionalDataOrders}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={fictionalDataOrders.length}
          style={styles.oldOrdersFlatList}
          renderItem={({ item }) => (
            <OrderItem navigation={navigation} order={item} />
          )}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX({ marginTop: calcHeight(7) }, { marginTop: calcHeight(3) }),
    paddingLeft: 24
  },
  title: { alignSelf: 'center', fontSize: 24, fontWeight: 'bold' },
  oldOrdersTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 25
  }
});

export default Order;
