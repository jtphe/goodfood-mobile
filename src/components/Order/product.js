import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '@i18n/i18n';

const Product = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {i18n.t('orderPage.itemCustom', {
          quantity: product.quantity,
          productName: product.name
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  item: { fontSize: 16, opacity: 0.6 }
});

export default Product;
