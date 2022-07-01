import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  loadRestaurants,
  setCurrentRestaurant
} from '@store/modules/restaurant/actions';
import { createSelector } from 'reselect';
import { getRestaurants } from '@store/modules/restaurant/selectors';
import { colors } from '@config/';
import * as Progress from 'react-native-progress';
import Restaurant from '@components/Restaurant';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector([getRestaurants], (restaurants) => {
  return { restaurants };
});

const TakeawayScreen = ({ restaurants, navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurants());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _selectRestaurant = (restaurant) => {
    const payload = {
      restaurant
    };
    dispatch(setCurrentRestaurant({ payload }));
    navigation.navigate(i18n.t('restaurant.detailsTitle'));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{i18n.t('restaurant.findRestaurants')}</Text>
      {restaurants.length === 0 ? (
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
          initialNumToRender={restaurants.length}
          style={styles.restaurantsList}
          renderItem={({ item }) => (
            <Restaurant
              restaurant={item}
              selectRestaurant={(restaurant) => _selectRestaurant(restaurant)}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 30 },
  container: {
    paddingHorizontal: 24,
    marginTop: 24
  },
  containerLoader: { alignSelf: 'center', marginTop: 100 },
  restaurantsList: { marginBottom: 32 }
});

export default connect(mapStateToProps)(TakeawayScreen);
