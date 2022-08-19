import React from 'react';
import Product from '@components/Order/Process/product';
import { FlatList, StyleSheet } from 'react-native';

const OthersStep = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={data?.length}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatList}
      renderItem={({ item }) => (
        <Product item={item} onPress={() => onPress(item)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatList: { alignItems: 'center' }
});

export default OthersStep;
