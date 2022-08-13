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
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const Address = ({ setCurrentStep }) => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const _saveUserAddress = () => {
    const payload = {
      address
    };
    console.log('payload :>> ', payload);
    // dispatch(updateUser({ payload }));
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
    alignSelf: 'center'
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
  container: { flex: 1, paddingHorizontal: 12, backgroundColor: 'white' },
  titleHeaderAddress: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width / 8
  },
  headerAddress: {
    flexDirection: 'row',
    paddingVertical: 24
  }
});

export default connect()(Address);
