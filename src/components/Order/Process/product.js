import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Product = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <FastImage
        source={{ uri: item.image, priority: FastImage.priority.high }}
        style={styles.productImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  productImage: { width: 200, height: 200, borderRadius: 46 }
});

export default Product;
