import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import GroupProducts from '@components/Order/groupProducts';

const Items = ({ orderItems }) => {
  return (
    <View>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={orderItems.length}
        style={styles.flatList}
        renderItem={({ item }) => <GroupProducts groupProducts={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {}
});

export default Items;
