import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '@config/';
import { connect, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getUser } from '@store/modules/user/selectors';
import { showToast } from '@helpers/showToast';
import { loadFoodType } from '@store/modules/order/actions';
import Category from '@components/Home/category';
import CartBanner from '@shared/cartBanner';
import i18n from '@i18n/i18n';
import foodCategories from '@utils/foodCategories';
import foodTypes from '@utils/foodTypes';

const mapStateToProps = createSelector([getUser], (user) => {
  return { user };
});

const Search = ({ navigation, route, user }) => {
  const dispatch = useDispatch();

  const _startOrderProcess = (item) => {
    const fromTakeaway = route.params?.restaurant;
    const { name, id } = item;

    if (fromTakeaway === undefined && user.restaurant === null) {
      showToast(i18n.t('search.noAddress'), true);
      return null;
    }

    if (name === i18n.t('categories.menu')) {
      navigation.navigate(i18n.t('orderPage.orderProcessTitle'), {
        foodTypes,
        restaurant: route.params?.restaurant || user.restaurant,
        user
      });
    } else {
      // If the user choose just a product
      let payload = {};
      if (name === i18n.t('categories.snacks')) {
        payload = {
          restaurant: route.params?.restaurant || user.restaurant,
          type: 5
        };
      } else if (name === i18n.t('categories.drink')) {
        payload = {
          restaurant: route.params?.restaurant || user.restaurant,
          type: 6
        };
      } else {
        payload = {
          restaurant: route.params?.restaurant || user.restaurant,
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
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('search.title')}</Text>
      <>
        <Text style={styles.subtitle}>{i18n.t('search.subtitle')}</Text>
        <View style={styles.containerFlatlist}>
          <FlatList
            data={foodCategories}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={foodCategories.length}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Category
                category={item}
                styleContainer={styles.styleContainer}
                styleCategory={styles.styleCategory}
                onPress={() => _startOrderProcess(item)}
              />
            )}
          />
        </View>
      </>
      <CartBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlatlist: { flex: 1, alignItems: 'center' },
  styleContainer: { margin: 10 },
  styleCategory: { width: 130, height: 130 },
  container: {
    flex: 1,
    ...ifIphoneX({ paddingTop: calcHeight(7) }, { paddingTop: calcHeight(3) }),
    backgroundColor: 'white'
  },
  title: { alignSelf: 'center', fontSize: 24, fontWeight: 'bold' },
  subtitle: {
    color: colors.YELLOW,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 50,
    marginBottom: 25,
    paddingHorizontal: 24
  }
});

export default connect(mapStateToProps)(Search);
