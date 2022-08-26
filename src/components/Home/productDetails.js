import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors } from '@config/';
import Autocomplete from 'react-native-autocomplete-input';
import i18n from '@i18n/i18n';
import FastImage from 'react-native-fast-image';

const ProductDetails = ({
  route: {
    params: { product }
  }
}) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50, paddingHorizontal: 24 },
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 12
  },
  productName: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.RED
  },
  descriptionTitle: { marginTop: 12, fontSize: 18, fontWeight: '500' },
  descriptionText: { marginTop: 6, fontSize: 18 }
});

export default ProductDetails;
