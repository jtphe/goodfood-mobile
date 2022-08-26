import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { colors } from '@config/';
import { connect, useDispatch } from 'react-redux';
import {
  getUserFavoriteRestaurant,
  getUser
} from '@store/modules/user/selectors';
import { getProducts } from '@store/modules/restaurant/selectors';
import { loadUserRestaurantProducts } from '@store/modules/restaurant/actions';
import { createSelector } from 'reselect';
import { showToast } from '@helpers/showToast';
import { useNavigation } from '@react-navigation/native';
import { loadFoodType } from '@store/modules/order/actions';
import i18n from '@i18n/i18n';
import Category from '@components/Home/category';
import foodCategories from '@utils/foodCategories';
import peckishList from '@utils/peckishList';
import Autocomplete from '@shared/Autocomplete';

const mapStateToProps = createSelector(
  [getUserFavoriteRestaurant, getUser, getProducts],
  (userRestaurant, user, products) => {
    return { userRestaurant, user, products };
  }
);

const DeliveryScreen = ({ userRestaurant, user, products }) => {
  const [searchFoodText, setSearchFoodText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _filterProducts = () => {
    if (searchFoodText === '') {
      return [];
    }

    const regex = new RegExp(`${searchFoodText.trim()}`, 'i');
    return products.filter((product) => product.name.search(regex) >= 0);
  };

  const productsToDisplay = useMemo(() => {
    return _filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFoodText]);

  const noProductFound = useMemo(() => {
    return productsToDisplay.length === 0 && searchFoodText.length > 0;
  }, [productsToDisplay, searchFoodText]);

  const isSearching = useMemo(() => {
    return searchFoodText.length > 0;
  }, [searchFoodText]);

  useEffect(() => {
    dispatch(loadUserRestaurantProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _startOrderProcess = (item) => {
    const { name, id, type } = item;

    if (userRestaurant === null) {
      showToast(i18n.t('search.noAddress'), true);
      return null;
    }

    if (name === i18n.t('categories.menu')) {
      navigation.navigate(i18n.t('orderPage.orderProcessTitle'), {
        restaurant: userRestaurant,
        user
      });
    } else {
      if (type === 'peckish') {
        navigation.navigate(i18n.t('orderPage.orderProcessProductTitle'), {
          food: item,
          processType: 'product',
          step: 2
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
          processType: 'product'
        });
      }
    }
  };

  const _openProductDetails = (product) => {
    console.log('product', product);
    navigation.navigate(i18n.t('homePage.productDetails'), { product });
  };

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Autocomplete
        products={productsToDisplay}
        query={searchFoodText}
        setQuery={(p) => setSearchFoodText(p)}
        comp={(a, b) => comp(a, b)}
        openProductDetails={(product) => _openProductDetails(product)}
      />
      {noProductFound ? (
        <View style={styles.containerNoProductFound}>
          <Text style={styles.textNoProductFound}>
            {i18n.t('home.noProductFound')}
          </Text>
        </View>
      ) : null}
      {isSearching ? null : (
        <>
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
            <Text style={styles.titlePeckish}>
              {i18n.t('home.peckishTitle')}
            </Text>
          </View>
          <FlatList
            data={peckishList}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={peckishList.length}
            numColumns={2}
            style={styles.peckishFlatList}
            renderItem={({ item }) => (
              <Category
                category={item}
                styleContainer={styles.styleContainerPeckish}
                styleCategory={styles.stylePeckish}
                onPress={() => _startOrderProcess(item)}
              />
            )}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textNoProductFound: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.YELLOW
  },
  containerNoProductFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  containerSearchedFood: {
    flex: 1
  },
  contentContainerStyle: { flexGrow: 1 },
  peckishFlatList: { paddingHorizontal: 24, marginTop: 24 },
  stylePeckish: { width: 160, height: 160 },
  styleContainerPeckish: { marginRight: 24, marginBottom: 24 },
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
