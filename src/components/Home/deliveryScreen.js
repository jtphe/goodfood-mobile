import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { colors } from '@config/';
import { Searchbar } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import {
  getUserFavoriteRestaurant,
  getUser
} from '@store/modules/user/selectors';
import { createSelector } from 'reselect';
import { showToast } from '@helpers/showToast';
import { useNavigation } from '@react-navigation/native';
import { loadFoodType } from '@store/modules/order/actions';
import foodTypes from '@utils/foodTypes';
import i18n from '@i18n/i18n';
import Category from '@components/Home/category';
import foodCategories from '@utils/foodCategories';

const mapStateToProps = createSelector(
  [getUserFavoriteRestaurant, getUser],
  (userRestaurant, user) => {
    return { userRestaurant, user };
  }
);

const DeliveryScreen = ({ userRestaurant, user }) => {
  const [searchFoodText, setSearchFoodText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _startOrderProcess = (item) => {
    const { name, id } = item;

    if (userRestaurant === null) {
      showToast(i18n.t('search.noAddress'), true);
      return null;
    }

    if (name === i18n.t('categories.menu')) {
      navigation.navigate(i18n.t('orderPage.orderProcessTitle'), {
        foodTypes,
        restaurant: userRestaurant,
        user
      });
    } else {
      // If the user choose just a product
      let payload = {};
      if (name === i18n.t('categories.snacks')) {
        payload = {
          restaurant: userRestaurant,
          type: 5
        };
      } else if (name === i18n.t('categories.drink')) {
        payload = {
          restaurant: userRestaurant,
          type: 6
        };
      } else {
        payload = {
          restaurant: userRestaurant,
          type: id
        };
      }
      dispatch(loadFoodType({ payload }));
      navigation.navigate(i18n.t('orderPage.orderProcessProductTitle'), {
        foodType: item,
        user,
        processType: 'product'
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder={i18n.t('home.placeholderSearchFood')}
        value={searchFoodText}
        onChangeText={(text) => setSearchFoodText(text)}
        style={styles.containerSearchInput}
        inputStyle={styles.searchInput}
        returnKeyType="search"
        selectionColor={colors.YELLOW}
      />
      <FlatList
        data={foodCategories}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={foodCategories.length}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesFlatList}
        renderItem={({ item }) => (
          <Category
            category={item}
            styleContainer={styles.styleContainer}
            styleCategory={styles.styleCategory}
            onPress={() => _startOrderProcess(item)}
          />
        )}
      />
      <View style={styles.containerPeckish}>
        <Text style={styles.titlePeckish}>{i18n.t('home.peckishTitle')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  styleContainer: { marginRight: 13 },
  styleCategory: { width: 85, height: 85 },
  container: { flex: 1 },
  containerLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  iconMap: { marginRight: 6 },
  iconArrowDown: { marginLeft: 6 },
  searchInput: { fontSize: 16 },
  containerSearchInput: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.YELLOW,
    minHeight: 50
  },
  containerPeckish: { marginTop: 24, paddingHorizontal: 24 },
  titlePeckish: { fontSize: 24, fontWeight: 'bold' },
  categoriesFlatList: {
    paddingHorizontal: 24,
    marginTop: 36
  }
});

export default connect(mapStateToProps)(DeliveryScreen);
