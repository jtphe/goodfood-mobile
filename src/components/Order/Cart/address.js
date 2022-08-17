import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { colors } from '@config/';
import { TextInput, Button } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import { updateUser } from '@store/modules/user/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const Address = ({ setCurrentStep }) => {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPostalCode, setErrorPostalCode] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const dispatch = useDispatch();

  const _saveUserAddress = () => {
    const addressLength = address.trim().length;
    const postalCodeLength = postalCode.trim().length;
    const cityLength = city.trim().length;

    if (addressLength > 0 && postalCodeLength > 0 && cityLength > 0) {
      const payload = {
        address,
        postalCode,
        city
      };
      dispatch(updateUser({ payload }));
      setCurrentStep(2);
    } else if (
      addressLength === 0 &&
      postalCodeLength === 0 &&
      cityLength === 0
    ) {
      setErrorAddress(true);
      setErrorPostalCode(true);
      setErrorCity(true);
    } else if (
      addressLength > 0 &&
      postalCodeLength === 0 &&
      cityLength === 0
    ) {
      setErrorAddress(false);
      setErrorPostalCode(true);
      setErrorCity(true);
    } else if (
      addressLength === 0 &&
      postalCodeLength > 0 &&
      cityLength === 0
    ) {
      setErrorAddress(true);
      setErrorPostalCode(false);
      setErrorCity(true);
    } else if (
      addressLength === 0 &&
      postalCodeLength === 0 &&
      cityLength > 0
    ) {
      setErrorAddress(true);
      setErrorPostalCode(true);
      setErrorCity(false);
    } else if (addressLength > 0 && postalCodeLength > 0 && cityLength === 0) {
      setErrorAddress(false);
      setErrorPostalCode(false);
      setErrorCity(true);
    } else if (addressLength > 0 && postalCodeLength === 0 && cityLength > 0) {
      setErrorAddress(false);
      setErrorPostalCode(true);
      setErrorCity(false);
    } else if (addressLength === 0 && postalCodeLength > 0 && cityLength > 0) {
      setErrorAddress(true);
      setErrorPostalCode(false);
      setErrorCity(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerAddress}>
        <TouchableOpacity onPress={() => setCurrentStep(2)}>
          <Icon style={styles.iconLeft} name="left" size={26} />
        </TouchableOpacity>
        <Text style={styles.titleHeaderAddress}>
          {i18n.t('orderPage.deliveryAddress')}
        </Text>
      </View>
      <Text style={styles.titleAddAddress}>
        {i18n.t('orderPage.missingDeliveryAddress')}
      </Text>
      <TextInput
        mode="outlined"
        outlineColor={colors.DARK_GREY}
        activeOutlineColor={colors.DARK_GREY}
        selectionColor={colors.DARK_GREY}
        placeholder={i18n.t('accountPage.address')}
        style={styles.input}
        onChangeText={(txt) => {
          setAddress(txt);
        }}
        error={errorAddress}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        outlineColor={colors.DARK_GREY}
        activeOutlineColor={colors.DARK_GREY}
        selectionColor={colors.DARK_GREY}
        placeholder={i18n.t('accountPage.postalCode')}
        style={styles.input}
        keyboardType="numeric"
        maxLength={5}
        onChangeText={(txt) => {
          setPostalCode(txt);
        }}
        error={errorPostalCode}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        outlineColor={colors.DARK_GREY}
        activeOutlineColor={colors.DARK_GREY}
        selectionColor={colors.DARK_GREY}
        placeholder={i18n.t('accountPage.city')}
        style={styles.input}
        onChangeText={(txt) => {
          setCity(txt);
        }}
        error={errorCity}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => _saveUserAddress()}
          style={styles.btnSaveAddress}
          labelStyle={styles.btnSaveAddressText}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('button.save')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnSaveAddressText: {
    color: colors.RED,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 4
  },
  btnSaveAddress: {
    width: 200,
    height: 40,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
    marginLeft: 50
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 50
  },
  input: {
    backgroundColor: 'white',
    color: colors.DARK_GREY
  },
  titleAddAddress: {
    marginTop: 24,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '500',
    color: colors.YELLOW
  },
  container: { flex: 1, paddingHorizontal: 26, backgroundColor: 'white' },
  titleHeaderAddress: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width / 9
  },
  headerAddress: {
    flexDirection: 'row',
    paddingVertical: 24
  }
});

export default connect()(Address);
