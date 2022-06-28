/* eslint-disable global-require */
import React, { useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList
} from 'react-native';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import { useDispatch, connect } from 'react-redux';
import {
  setFavoriteRestaurant,
  loadComments
} from '@store/modules/restaurant/actions';
import { getCurrentRestaurant } from '@store/modules/restaurant/selectors';
import { createSelector } from 'reselect';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector(
  [getCurrentRestaurant],
  (currentRestaurant) => {
    return { currentRestaurant };
  }
);

const RestaurantDetails = ({ navigation, currentRestaurant }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      id: currentRestaurant.id
    };
    dispatch(loadComments({ payload }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restaurantName = useMemo(() => {
    return currentRestaurant.name;
  }, [currentRestaurant]);
  const restaurantAddress = useMemo(() => {
    return currentRestaurant.address;
  }, [currentRestaurant]);
  const restaurantCity = useMemo(() => {
    return currentRestaurant.city;
  }, [currentRestaurant]);
  const restaurantPostalCode = useMemo(() => {
    return currentRestaurant.postalCode;
  }, [currentRestaurant]);
  const restaurantDescription = useMemo(() => {
    return currentRestaurant.description;
  }, [currentRestaurant]);
  const restaurantComments = useMemo(() => {
    return currentRestaurant.comments;
  }, [currentRestaurant]);

  const _addressParser = () => {
    return `${restaurantAddress.toUpperCase()}, ${restaurantPostalCode} ${restaurantCity.toUpperCase()}`;
  };

  const _renderImageSource = () => {
    switch (restaurantCity) {
      case 'Paris':
        return require('@images/good_food_paris.jpeg');
      case 'Bruxelles':
        return require('@images/good_food_bruxelles.jpeg');
      case 'Luxembourg':
        return require('@images/good_food_luxembourg.jpeg');
      default:
        return require('@images/good_food_paris.jpeg');
    }
  };

  const _order = () => {};

  const _setFavoriteRestaurant = () => {
    const payload = {
      id: currentRestaurant.id
    };
    dispatch(setFavoriteRestaurant({ payload }));
  };

  const _parserComments = () => {
    return `${i18n.t('restaurant.comments')} (${restaurantComments?.length})`;
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.containerIconClose}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="close"
            size={19}
            color={colors.RED}
            style={styles.iconClose}
          />
        </Pressable>
        <Pressable
          style={styles.containerIconHeart}
          onPress={() => _setFavoriteRestaurant()}
        >
          <Icon
            name="hearto"
            size={19}
            style={styles.iconHeart}
            color={colors.RED}
          />
        </Pressable>
        <Image style={styles.cover} source={_renderImageSource()} />
      </View>
      <View style={styles.content}>
        <View style={styles.containerRestaurantName}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <Text style={styles.restaurantAddress}>{_addressParser()}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => _order()}
          style={styles.orderBtn}
          labelStyle={styles.orderTxt}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('button.order')}
        </Button>
      </View>
      <View style={styles.containerOther}>
        <Text style={styles.restaurantDescription}>
          {restaurantDescription}
        </Text>
        <Text style={styles.comments}>{_parserComments()}</Text>
        <FlatList
          data={restaurantComments}
          initialNumToRender={restaurantComments?.length}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
          ListEmptyComponent={<Text>{i18n.t('restaurant.emptyComments')}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comments: { marginTop: 24, fontSize: 16, fontWeight: 'bold' },
  restaurantDescription: { color: colors.YELLOW, fontSize: 13, marginTop: 20 },
  containerOther: { paddingHorizontal: 18 },
  restaurantAddress: { fontWeight: '500', marginTop: 6 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: colors.RED },
  content: { flexDirection: 'row', marginTop: 20, paddingHorizontal: 18 },
  orderTxt: { color: colors.YELLOW, fontSize: 14 },
  orderBtn: {
    height: 35,
    borderRadius: 12,
    marginRight: 4
  },
  containerRestaurantName: {
    flex: 1,
    paddingRight: 12
  },
  iconClose: { marginLeft: 5.5, marginTop: 5 },
  containerIconClose: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30
  },
  containerIconHeart: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30
  },
  iconHeart: { marginLeft: 5, marginTop: 6 },
  cover: { width: '100%', height: 200 },
  container: { flex: 1 }
});

export default connect(mapStateToProps)(RestaurantDetails);
