import React, { useMemo, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import { useDispatch, connect } from 'react-redux';
import {
  setFavoriteRestaurant,
  loadComments,
  deleteComment
} from '@store/modules/restaurant/actions';
import { getCurrentRestaurant } from '@store/modules/restaurant/selectors';
import { getUserFavoriteRestaurant } from '@store/modules/user/selectors';
import { createSelector } from 'reselect';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import Comment from '@components/Restaurant/RestaurantDetails/comment';
import Cover from '@components/Restaurant/RestaurantDetails/cover';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from '@i18n/i18n';
import vibrate from '@helpers/vibrate';
import StarRating from 'react-native-star-rating';

const mapStateToProps = createSelector(
  [getCurrentRestaurant, getUserFavoriteRestaurant],
  (currentRestaurant, favoriteRestaurant) => {
    return { currentRestaurant, favoriteRestaurant };
  }
);

const RestaurantDetails = ({
  navigation,
  currentRestaurant,
  favoriteRestaurant
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    const payload = {
      id: currentRestaurant.id
    };
    dispatch(loadComments({ payload }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentRestaurant.id === favoriteRestaurant?.id) {
      setIsFavoriteRestaurant(true);
    }
  }, [favoriteRestaurant, currentRestaurant]);

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
    return currentRestaurant.postalcode;
  }, [currentRestaurant]);
  const restaurantDescription = useMemo(() => {
    return currentRestaurant.description;
  }, [currentRestaurant]);
  const restaurantComments = useMemo(() => {
    return currentRestaurant.comments;
  }, [currentRestaurant]);
  const averageRating = useMemo(() => {
    return currentRestaurant.avgRating;
  }, [currentRestaurant]);
  const [isFavoriteRestaurant, setIsFavoriteRestaurant] = useState(false);

  const _addressParser = () => {
    return `${restaurantAddress.toUpperCase()}, ${restaurantPostalCode} ${restaurantCity.toUpperCase()}`;
  };

  const _order = () => {
    navigation.navigate(i18n.t('searchPage.screenTitle'), {
      restaurant: currentRestaurant
    });
  };

  const _setFavoriteRestaurant = () => {
    setIsFavoriteRestaurant(!isFavoriteRestaurant);
    const payload = {
      restaurant: currentRestaurant,
      mode: isFavoriteRestaurant ? 'remove' : 'set'
    };
    dispatch(setFavoriteRestaurant({ payload }));
  };

  const _parserComments = () => {
    return `${i18n.t('restaurant.comments')} (${restaurantComments?.length})`;
  };

  const _openOptionsMenu = () => {
    ref.current?.open();
  };

  const _deleteComment = (id) => {
    const payload = {
      id
    };
    dispatch(deleteComment({ payload }));
  };

  return (
    <ScrollView style={styles.container}>
      <Cover
        restaurantCity={restaurantCity}
        navigation={navigation}
        setFavoriteRestaurant={() => _setFavoriteRestaurant()}
        isFavoriteRestaurant={isFavoriteRestaurant}
        openOptionsMenu={() => _openOptionsMenu()}
      />
      <View style={styles.content}>
        <View style={styles.containerRestaurantName}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {averageRating !== null ? (
            <View style={styles.containerRowAverage}>
              <Text>{averageRating}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                halfStarEnabled={true}
                halfStar="star-half"
                rating={averageRating}
                emptyStar="star-border"
                emptyStarColor={colors.YELLOW}
                fullStar="star"
                fullStarColor={colors.YELLOW}
                iconSet="MaterialIcons"
                starSize={16}
                containerStyle={styles.containerStars}
              />
            </View>
          ) : null}
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
          renderItem={({ item }) => (
            <Comment
              comment={item}
              deleteComment={(id) => _deleteComment(id)}
            />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={
            <Text style={styles.noComments}>
              {i18n.t('restaurant.emptyComments')}
            </Text>
          }
        />
      </View>
      <Menu ref={ref} renderer={renderers.SlideInMenu}>
        <MenuTrigger />
        <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
          <MenuOption
            customStyles={{
              optionWrapper: styles.menuOption
            }}
            onSelect={() => {
              vibrate('impactLight');
              navigation.navigate(i18n.t('restaurant.addComment'));
            }}
          >
            <Icon size={26} color={colors.YELLOW} name="comment-edit-outline" />
            <Text style={styles.textMenuOptions}>
              {i18n.t('restaurant.addComment')}
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerRowAverage: { flexDirection: 'row', paddingTop: 8 },
  containerStars: {
    width: 100,
    marginLeft: 6
  },
  contentContainerStyle: { marginTop: 24, marginBottom: 30 },
  textMenuOptions: { marginLeft: 12, fontSize: 18 },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 16
  },
  menuOptions: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 90
  },
  noComments: { marginTop: 12 },
  comments: { marginTop: 24, fontSize: 16, fontWeight: 'bold' },
  restaurantDescription: {
    color: colors.YELLOW,
    fontSize: 14,
    marginTop: 20,
    textAlign: 'justify'
  },
  containerOther: { paddingHorizontal: 18 },
  restaurantAddress: { fontWeight: '500', marginTop: 6 },
  restaurantName: { fontSize: 18, fontWeight: 'bold', color: colors.RED },
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
  container: {
    flex: 1
  }
});

export default connect(mapStateToProps)(RestaurantDetails);
