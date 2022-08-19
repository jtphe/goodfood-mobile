import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '@config/';
import { roundToTwo } from '@helpers/roundToTwo';
import i18n from '@i18n/i18n';

const QuantityStep = ({
  product,
  quantity,
  handleQuantity,
  totalPrice,
  handlePrice,
  addToCart
}) => {
  const _handleQuantity = (type) => {
    if (type === 'add') {
      handleQuantity(quantity + 1);
      handlePrice(roundToTwo(totalPrice + product.price));
      // checker par la suite si y'a assez en stock encore ou limité à 10 par ex
    } else {
      if (quantity === 1) {
        return null;
      } else {
        handleQuantity(quantity - 1);
        handlePrice(roundToTwo(totalPrice - product.price));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.containerQuantity}>
        <TouchableOpacity
          style={styles.containerBtnQuantity}
          onPress={() => {
            _handleQuantity('substract');
          }}
        >
          <Text style={styles.quantityOperator}>{i18n.t('button.minus')}</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.containerBtnQuantity}
          onPress={() => {
            _handleQuantity('add');
          }}
        >
          <Text style={styles.quantityOperator}>{i18n.t('button.plus')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalPrice}>
        {i18n.t('orderPage.quantityPrice', { totalPrice })}
      </Text>
      <Button
        mode="contained"
        onPress={() => addToCart()}
        style={styles.addToCartBtn}
        labelStyle={styles.addToCartBtnText}
        color={colors.BEIGE}
        uppercase={false}
      >
        {i18n.t('orderPage.addToCart').toUpperCase()}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  addToCartBtnText: { color: colors.RED, fontSize: 20, fontWeight: 'bold' },
  addToCartBtn: {
    width: '100%',
    height: 70,
    marginTop: 32,
    justifyContent: 'center',
    borderRadius: 12
  },
  totalPrice: { fontSize: 32, fontWeight: 'bold', color: colors.YELLOW },
  quantityText: { fontSize: 36, marginHorizontal: 24, marginTop: 4 },
  container: { alignItems: 'center' },
  containerQuantity: {
    flexDirection: 'row',
    marginVertical: 42
  },
  quantityOperator: { color: colors.RED, fontSize: 24 },
  containerBtnQuantity: {
    backgroundColor: colors.YELLOW,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  flatList: { alignItems: 'center' },
  productImage: { width: 300, height: 300, borderRadius: 12 }
});

export default QuantityStep;
