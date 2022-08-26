import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import i18n from '@i18n/i18n';

const Items = ({ products, menus }) => {
  return (
    <View>
      {menus?.length > 0 ? (
        <Text style={styles.titleSection}>{i18n.t('orderPage.menuTitle')}</Text>
      ) : null}
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={menus.length}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.containerMenu}>
            <Text style={styles.item}>
              {i18n.t('orderPage.itemMenu', {
                itemType: item.food.name
              })}
            </Text>
            <Text style={styles.item}>
              {i18n.t('orderPage.itemMenu', {
                itemType: item.snack.name
              })}
            </Text>
            <Text style={styles.item}>
              {i18n.t('orderPage.itemMenu', {
                itemType: item.drink.name
              })}
            </Text>
          </View>
        )}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={products.length}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.titleSection}>
              {i18n.t('orderPage.foodTitle')}
            </Text>
            <Text style={styles.item}>
              {i18n.t('orderPage.itemMenu', {
                itemType: item.name
              })}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu: { marginBottom: 6 },
  titleSection: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6
  },
  containerCustomItems: { flex: 1 },
  item: { fontSize: 16, opacity: 0.6 }
});

export default Items;
