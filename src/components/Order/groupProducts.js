/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Product from '@components/Order/product';
import i18n from '@i18n/i18n';

const GroupProducts = ({ groupProducts }) => {
  const isMenu = useCallback(() => {
    return groupProducts.type !== 'Custom';
  }, [groupProducts]);

  const returnDetails = () => {
    if (isMenu()) {
      return (
        <View>
          <Text style={styles.titleSection}>{i18n.t('orderPage.menuTitle')}</Text>
          <Text style={styles.item}>{i18n.t('orderPage.itemMenu', {itemType: groupProducts.items.food.name})}</Text>
          <Text style={styles.item}>{i18n.t('orderPage.itemMenu', {itemType: groupProducts.items.snack.name})}</Text>
          <Text style={styles.item}>{i18n.t('orderPage.itemMenu', {itemType: groupProducts.items.drink.name})}</Text>
        </View>
      );
    } else {
      const { snack, drink, food } = groupProducts.items;
      return (
        <View style={styles.containerCustomItems}>
          {food?.length > 0 ? (
            <View>
              <Text style={styles.titleSection}>{i18n.t('orderPage.foodTitle')}</Text>
              <FlatList
                data={food}
                initialNumToRender={food.length}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Product product={item} />}
              />
            </View>
          ) : null}
          {snack?.length > 0 ? (
            <View>
              <Text style={styles.titleSection}>{i18n.t('orderPage.snackTitle')}</Text>
              <FlatList
                data={snack}
                initialNumToRender={snack.length}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Product product={item} />}
              />
            </View>
          ) : null}
          {drink?.length > 0 ? (
            <View>
              <Text style={styles.titleSection}>{i18n.t('orderPage.drinkTitle')}</Text>
              <FlatList
                data={drink}
                initialNumToRender={drink.length}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Product product={item} />}
              />
            </View>
          ) : null}
        </View>
      );
    }
  };

  return <>{returnDetails()}</>;
};

const styles = StyleSheet.create({
  titleSection: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  containerCustomItems: {flex: 1},
  item: {fontSize: 16, opacity: 0.6}
});

export default GroupProducts;
