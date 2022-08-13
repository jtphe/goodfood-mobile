import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  loadRestaurants,
  setFavoriteRestaurant
} from '@store/modules/restaurant/actions';
import { getUserFavoriteRestaurant } from '@store/modules/user/selectors';
import { getRestaurants } from '@store/modules/restaurant/selectors';
import { useDispatch, connect } from 'react-redux';
import { loadUserFavoriteRestaurant } from '@store/modules/user/actions';
import { createSelector } from 'reselect';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector(
  [getRestaurants, getUserFavoriteRestaurant],
  (restaurants, userFavoriteRestaurant) => {
    return { restaurants, userFavoriteRestaurant };
  }
);

const RestaurantList = ({ restaurants, userFavoriteRestaurant }) => {
  const dispatch = useDispatch();
  const [currentFavoriteRestaurant, setCurrentFavoriteRestaurant] = useState(
    userFavoriteRestaurant
  );

  useEffect(() => {
    dispatch(loadRestaurants());
    if (currentFavoriteRestaurant !== null) {
      dispatch(loadUserFavoriteRestaurant());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _setRestaurantFavorite = (restaurant) => {
    setCurrentFavoriteRestaurant(restaurant);
    const payload = {
      restaurant,
      mode: 'set'
    };
    dispatch(setFavoriteRestaurant({ payload }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {currentFavoriteRestaurant === null ? (
        <View style={styles.containerNoRestaurant}>
          <Text style={styles.textNoRestaurant}>
            {i18n.t('restaurant.noRestaurant')}
          </Text>
        </View>
      ) : (
        <View style={styles.containerFavoriteRestaurant}>
          <View style={styles.rowFavoriteRestaurant}>
            <Icon
              name="star"
              color={colors.YELLOW}
              size={20}
              style={styles.iconStar}
            />
            <Text style={styles.textFavoriteRestaurantName}>
              {currentFavoriteRestaurant.name.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.textFavoriteRestaurantAddress}>
            {currentFavoriteRestaurant.address},{' '}
            {currentFavoriteRestaurant.city}
          </Text>
        </View>
      )}
      {restaurants?.length === 0 ? (
        <View style={styles.containerLoader}>
          <Progress.Circle
            size={60}
            indeterminate={true}
            borderWidth={2}
            color={colors.YELLOW}
          />
        </View>
      ) : (
        <FlatList
          data={restaurants}
          nestedScrollEnabled
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={restaurants?.length}
          style={styles.restaurantsList}
          contentContainerStyle={styles.restaurantsListContentContainer}
          renderItem={({ item }) => (
            <Restaurant
              restaurant={item}
              setRestaurantFavorite={(restaurant) =>
                _setRestaurantFavorite(restaurant)
              }
              currentFavoriteRestaurant={currentFavoriteRestaurant}
            />
          )}
        />
      )}
    </View>
  );
};

const Restaurant = ({
  restaurant,
  setRestaurantFavorite,
  currentFavoriteRestaurant
}) => {
  if (restaurant.id === currentFavoriteRestaurant?.id) {
    return null;
  }
  return (
    <View style={styles.containerRestaurantRow}>
      <View style={styles.containerRestaurantData}>
        <Text style={styles.restaurantName}>
          {restaurant.name.toUpperCase()}
        </Text>
        <Text>
          {restaurant.address}, {restaurant.city}
        </Text>
      </View>
      <View style={styles.containerBtnChoose}>
        <Button
          mode="contained"
          onPress={() => setRestaurantFavorite(restaurant)}
          style={styles.chooseBtn}
          labelStyle={{ color: colors.YELLOW }}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('button.choose')}
        </Button>
      </View>
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          style={styles.iconClose}
          name="close"
          size={26}
          color={colors.RED}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {i18n.t('restaurant.restaurantChoice')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantsListContentContainer: { paddingBottom: 50 },
  containerBtnChoose: { flex: 1, paddingRight: 12 },
  restaurantName: { fontWeight: 'bold' },
  containerRestaurantData: { flex: 2, paddingRight: 12 },
  containerRestaurantRow: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.GREY
  },
  textFavoriteRestaurantAddress: { paddingLeft: 28 },
  textFavoriteRestaurantName: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 8
  },
  iconStar: { paddingTop: 1 },
  rowFavoriteRestaurant: { flexDirection: 'row' },
  containerFavoriteRestaurant: { paddingLeft: 12, paddingTop: 24 },
  textNoRestaurant: { fontSize: 16, color: colors.YELLOW, fontWeight: '600' },
  containerNoRestaurant: { paddingTop: 24, paddingHorizontal: 12 },
  chooseBtn: {
    borderRadius: 12
  },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: 'bold', marginLeft: 70 },
  iconClose: { paddingLeft: 12 },
  containerHeader: {
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  containerLoader: { alignSelf: 'center', marginTop: 100 },
  restaurantsList: { flex: 1, marginTop: 24 }
});

export default connect(mapStateToProps)(RestaurantList);
