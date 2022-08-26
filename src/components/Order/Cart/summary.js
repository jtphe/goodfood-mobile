import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createOrder } from '@store/modules/order/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const Summary = ({
  currentRestaurant,
  userAddress,
  userPostalCode,
  userCity,
  setCurrentStep,
  totalPrice,
  cardName,
  cardNumber,
  cardExpiration,
  cardCVV
}) => {
  const userAddressParsed = useMemo(() => {
    return `${userAddress}, ${userPostalCode} ${userCity}`;
  }, [userAddress, userPostalCode, userCity]);
  const isCardValid = useMemo(() => {
    return cardName && cardNumber && cardExpiration && cardCVV;
  }, [cardName, cardNumber, cardExpiration, cardCVV]);
  const dispatch = useDispatch();

  const _payOrder = () => {
    // ajouter isCardValid dans le if
    if (userAddressParsed.length > 0) {
      setCurrentStep(5);
      dispatch(createOrder());
    }
  };

  const _parsedAddress = () => {
    return `${currentRestaurant.address}, ${currentRestaurant.postalcode} ${currentRestaurant.city}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSummary}>
        <TouchableOpacity onPress={() => setCurrentStep(1)}>
          <Icon style={styles.iconLeft} name="left" size={26} />
        </TouchableOpacity>
        <Text style={styles.titleHeaderSummary}>
          {i18n.t('orderPage.summary')}
        </Text>
      </View>
      <View style={styles.containerDelivery}>
        {currentRestaurant === null ? (
          userAddress ? (
            <View>
              <Text style={styles.titleHomeDelivery}>
                {i18n.t('orderPage.homeDelivery')}
              </Text>
              <Text style={styles.userAddress}>{userAddressParsed}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.titleHomeDelivery}>
                {i18n.t('orderPage.homeDelivery')}
              </Text>
              <TouchableOpacity
                style={styles.touchableAddDeliveryAddress}
                onPress={() => setCurrentStep(3)}
              >
                <Text style={styles.addDeliveryAddressText}>
                  {i18n.t('orderPage.addDeliveryAddress')}
                </Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View>
            <Text style={styles.titleHomeDelivery}>
              {i18n.t('home.btnTakeaway')}
            </Text>
            <Text style={styles.userAddress}>{currentRestaurant.name}</Text>
            <Text style={styles.userAddress}>{_parsedAddress()}</Text>
          </View>
        )}
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.totalText}>{i18n.t('orderPage.total')}</Text>
        <Text style={styles.totalPrice}>{totalPrice}€</Text>
      </View>
      <View style={styles.containerPayementMethod}>
        <Text style={styles.titlePaymentMethod}>
          {i18n.t('orderPage.paymentMethod')}
        </Text>
        {!cardNumber ? (
          <TouchableOpacity
            style={styles.touchableAddPaymentMethod}
            onPress={() => setCurrentStep(4)}
          >
            <Text style={{ color: colors.DARK_GREY }}>
              {i18n.t('orderPage.addPaymentMethod')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.containerCardNumber}>
            <Text style={styles.cardNumber}>
              {`*************${cardNumber.slice(-3)}`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => _payOrder()}
          style={styles.btnPayOrder}
          labelStyle={styles.btnPayOrderText}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('orderPage.payOrder')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardNumber: { fontSize: 16, opacity: 0.5 },
  containerCardNumber: {
    borderWidth: 1,
    borderColor: colors.DARK_GREY,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  userAddress: {
    fontWeight: '600',
    fontSize: 16,
    opacity: 0.5
  },
  touchableAddPaymentMethod: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderColor: colors.DARK_GREY,
    borderRadius: 6
  },
  titlePaymentMethod: {
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.RED
  },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: colors.YELLOW },
  totalText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.YELLOW
  },
  addDeliveryAddressText: { color: colors.DARK_GREY },
  touchableAddDeliveryAddress: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderColor: colors.DARK_GREY,
    borderRadius: 6
  },
  titleHomeDelivery: {
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.RED
  },
  containerPayementMethod: {
    marginTop: 12
  },
  containerTotal: {
    flexDirection: 'row',
    paddingVertical: 24
  },
  containerDelivery: { marginTop: 32 },
  container: { flex: 1, paddingHorizontal: 26, backgroundColor: 'white' },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 50
  },
  btnPayOrderText: {
    color: colors.RED,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 4
  },
  btnPayOrder: {
    width: 200,
    height: 40,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
    marginLeft: 45
  },
  titleHeaderSummary: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width / 7
  },
  headerSummary: {
    flexDirection: 'row',
    paddingVertical: 24
  }
});

export default Summary;
