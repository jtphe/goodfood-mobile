/* eslint-disable global-require */
import React from 'react';
import OrderItem from '@components/Order/orderItem';
import CartBanner from '@shared/cartBanner';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import i18n from '@i18n/i18n';

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
            food: { id: 1, name: 'Burger NRV' },
            snack: { id: 2, name: 'Frites' },
            drink: { id: 76, name: 'Eau' }
          }
        },
        {
          id: 2,
          type: 'Custom',
          price: 9,
          items: {
            food: [
              { id: 1, name: 'Burger NRV', quantity: 2 },
              { id: 43, name: 'MaxiTacos', quantity: 1 },
              { id: 34, name: 'Chickendwich', quantity: 3 }
            ],
            snack: [
              { id: 2, name: 'Frites', quantity: 4 },
              { id: 3, name: 'Nuggets', quantity: 2 }
            ],
            drink: [{ id: 76, name: 'Eau', quantity: 6 }]
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
            food: [
              { id: 1, name: 'Burger NRV', quantity: 1 },
              { id: 43, name: 'MaxiTacos', quantity: 3 },
              { id: 34, name: 'Chickendwich', quantity: 2 }
            ],
            snack: [
              { id: 2, name: 'Frites', quantity: 3 },
              { id: 3, name: 'Nuggets', quantity: 1 }
            ],
            drink: [{ id: 76, name: 'Eau', quantity: 3 }]
          }
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('orderPage.mainTitle')}</Text>
      <View style={styles.containerContent}>
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
      </View>
      <CartBanner />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Order;
