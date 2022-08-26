import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Category from '@components/Home/category';
import foodTypes from '@utils/foodTypes';

const StepOne = ({ foodTypeSelected }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodTypes}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={foodTypes.length}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => (
          <Category
            category={item}
            styleContainer={styles.styleContainer}
            styleCategory={styles.styleCategory}
            onPress={() => foodTypeSelected(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: { alignItems: 'center' },
  container: { marginTop: 36 },
  styleContainer: { margin: 10 },
  styleCategory: { width: 160, height: 160 }
});

export default StepOne;
