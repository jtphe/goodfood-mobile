import i18n from '@i18n/i18n';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '@config/';

const FinalStep = ({
  food,
  snack,
  drink,
  restaurant,
  isTakeawayOrder,
  userAddress,
  totalPrice,
  addToCart
}) => {
  const _renderPrice = () => {
    return `${totalPrice}€`;
  };
  return (
    <>
      <View style={styles.containerOrderAddress}>
        <Text style={styles.orderAddressTitle}>
          {i18n.t('orderPage.orderAddress')}
        </Text>
        <Text style={styles.orderAddressData}>
          {isTakeawayOrder ? restaurant.address : userAddress}
        </Text>
      </View>
      <View style={styles.containerRecap}>
        <Row product={food} />
        <Row product={snack} />
        <Row product={drink} />
      </View>
      <View style={styles.totalRow}>
        <Text style={[styles.price, styles.priceTotal]}>
          {i18n.t('orderPage.total')}
        </Text>
        <Text style={styles.price}>{_renderPrice()}</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => addToCart()}
        style={styles.btnAddToCart}
        labelStyle={{ color: colors.RED }}
        color={colors.BEIGE}
        uppercase={false}
      >
        {i18n.t('orderPage.addToCart')}
      </Button>
    </>
  );
};

const Row = ({ product }) => {
  const quantityParser = () => {
    return `1x ${product.name}`;
  };

  return (
    <View style={styles.rowContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.containerQuantity}>
        <Text style={styles.quantity}>{quantityParser()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddToCart: {
    width: 170,
    marginTop: 100,
    alignSelf: 'center'
  },
  productImage: { width: 50, height: 50, borderRadius: 12 },
  containerQuantity: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center'
  },
  quantity: { fontSize: 18, fontWeight: 800 },
  priceTotal: { flex: 1 },
  price: { fontSize: 18, fontWeight: 'bold', color: colors.YELLOW },
  containerOrderAddress: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18
  },
  orderAddressTitle: { fontWeight: 'bold', fontSize: 16, opacity: 0.5 },
  orderAddressData: { opacity: 0.5, fontSize: 14, fontWeight: '600' },
  containerRecap: {
    paddingBottom: 32,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 12
  },
  totalRow: {
    flexDirection: 'row'
  }
});

export default FinalStep;
