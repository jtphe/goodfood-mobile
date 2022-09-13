import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '@config/';
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
      {products?.length > 0 ? (
        <Text style={styles.titleSection}>{i18n.t('orderPage.foodTitle')}</Text>
      ) : null}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={products.length}
        style={styles.flatList}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {i18n.t('orderPage.itemMenu', {
              itemType: item.name
            })}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu: {
    marginBottom: 12,
    paddingBottom: 6,
    marginLeft: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.DARK_GREY
  },
  titleSection: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12
  },
  containerCustomItems: { flex: 1 },
  item: { fontSize: 16, opacity: 0.6 }
});

export default Items;
