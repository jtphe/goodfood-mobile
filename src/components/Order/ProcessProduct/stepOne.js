import React from 'react';
import Product from '@components/Order/Process/product';
import { FlatList, StyleSheet } from 'react-native';

const StepOne = ({ currentFoods, onPress }) => {
  return (
    <FlatList
      data={currentFoods}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={currentFoods?.length}
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

export default StepOne;
