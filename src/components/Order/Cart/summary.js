import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const Summary = ({
  currentRestaurant,
  userAddress,
  setCurrentStep,
  totalPrice
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSummary}>
        <TouchableOpacity onPress={() => setCurrentStep(1)}>
          <Icon style={styles.iconLeft} name="left" size={26} />
        </TouchableOpacity>
        <Text style={styles.titleHeaderSummary}>Récapitulatif</Text>
      </View>
      <View style={styles.containerDelivery}>
        {currentRestaurant === null ? (
          userAddress ? (
            <View>
              <Text>Livraison</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.titleHomeDelivery}>Livraison à domicile</Text>
              <TouchableOpacity
                style={styles.touchableAddDeliveryAddress}
                onPress={() => setCurrentStep(3)}
              >
                <Text style={styles.addDeliveryAddressText}>
                  + Ajouter une addresse de livraison
                </Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View>
            <Text>A emporter</Text>
          </View>
        )}
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{totalPrice}€</Text>
      </View>
      <View style={styles.containerPayementMethod}>
        <Text style={styles.titlePaymentMethod}>Moyen de paiement</Text>
        <TouchableOpacity
          style={styles.touchableAddPaymentMethod}
          onPress={() => setCurrentStep(4)}
        >
          <Text style={{ color: colors.DARK_GREY }}>
            + Ajouter un moyen de paiement
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => console.log('oui')}
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
  container: { flex: 1, paddingHorizontal: 12, backgroundColor: 'white' },
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
    alignSelf: 'center'
  },
  titleHeaderSummary: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width / 4 - 5
  },
  headerSummary: {
    flexDirection: 'row',
    paddingVertical: 24
  }
});

export default Summary;
