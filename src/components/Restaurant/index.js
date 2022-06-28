import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '@config/';
import i18n from '@i18n/i18n';

const Restaurant = ({ restaurant, selectRestaurant }) => {
  const restaurantAddress = useMemo(() => {
    return restaurant.address;
  }, [restaurant]);
  const restaurantCity = useMemo(() => {
    return restaurant.city;
  }, [restaurant]);
  const restaurantPostalCode = useMemo(() => {
    return restaurant.postalCode;
  }, [restaurant]);

  const _addressParser = () => {
    return `${restaurantAddress.toUpperCase()}, ${restaurantPostalCode} ${restaurantCity.toUpperCase()}`;
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.restaurantDataContainer}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantAddress}>{_addressParser()}</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => selectRestaurant(restaurant)}
        style={styles.selectBtn}
        labelStyle={styles.labelBtn}
        color={colors.BEIGE}
        uppercase={false}
      >
        {i18n.t('restaurant.details')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantAddress: { fontSize: 10 },
  restaurantName: {
    color: colors.RED,
    fontWeight: 'bold',
    fontSize: 14
  },
  restaurantDataContainer: { flex: 1, paddingRight: 4 },
  rowContainer: { flexDirection: 'row', marginVertical: 12 },
  labelBtn: { color: colors.YELLOW, fontSize: 10, marginTop: 12 },
  selectBtn: {
    height: 35,
    borderRadius: 24,
    marginRight: 4
  }
});

export default Restaurant;
