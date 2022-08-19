import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '@config/';
import { createSelector } from 'reselect';
import { getCart, getCartTotalPrice } from '@store/modules/order/selectors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector(
  [getCart, getCartTotalPrice],
  (cart, cartTotalPrice) => {
    return { cart, cartTotalPrice };
  }
);

const CartBanner = ({ cart, cartTotalPrice }) => {
  const navigation = useNavigation();
  const _displayCart = () => {
    navigation.navigate(i18n.t('order.yourCart'));
  };

  if (cart?.length > 0) {
    return (
      <Pressable style={styles.container} onPress={() => _displayCart()}>
        <Icon
          name="prescription"
          size={26}
          color={colors.RED}
          style={styles.icon}
        />
        <Text style={styles.textDisplay}>
          {i18n.t('orderPage.displayCart')}
        </Text>
        <Text style={styles.textPrice}>{cartTotalPrice}€</Text>
      </Pressable>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  textPrice: { fontSize: 18, paddingTop: 4 },
  textDisplay: { flex: 2, fontSize: 18, paddingTop: 4 },
  icon: { flex: 1, marginLeft: 12 },
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.YELLOW
  }
});

export default connect(mapStateToProps)(CartBanner);
