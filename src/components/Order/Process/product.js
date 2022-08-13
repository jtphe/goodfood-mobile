import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Product = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  productImage: { width: 200, height: 200, borderRadius: 46 }
});

export default Product;
