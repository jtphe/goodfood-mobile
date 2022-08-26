import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '@config/index';
import { connect, useDispatch } from 'react-redux';
import { updateUser } from '@store/modules/user/actions';
import i18n from '@i18n/i18n';

const InputFields = ({ firstname, lastname, address, postalCode, city }) => {
  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [userAddress, setUserAddress] = useState(address);
  const [userPostalCode, setUserPostalCode] = useState(postalCode);
  const [userCity, setUserCity] = useState(city);
  const dispatch = useDispatch();

  const _updateUserName = (type) => {
    let payload = {};
    switch (type) {
      case 'firstname':
        payload = { firstName };
        break;
      case 'lastname':
        payload = { lastName };
        break;
      case 'address':
        payload = { address: userAddress };
        break;
      case 'postalCode':
        payload = { postalCode: userPostalCode };
        break;
      case 'city':
        payload = { city: userCity };
        break;
      default:
        return null;
    }
    dispatch(updateUser({ payload }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.firstName')}
      </Text>
      <TextInput
        mode="outlined"
        activeOutlineColor={colors.YELLOW}
        outlineColor={colors.GREY}
        placeholder={i18n.t('accountPage.firstNamePlaceholder')}
        style={styles.input}
        value={firstName}
        onChangeText={(txt) => {
          setFirstName(txt);
        }}
        onSubmitEditing={() => _updateUserName('firstname')}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.lastName')}
      </Text>
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder={i18n.t('accountPage.lastNamePlaceholder')}
        style={styles.input}
        value={lastName}
        onChangeText={(txt) => {
          setLastName(txt);
        }}
        onSubmitEditing={() => _updateUserName('lastname')}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.address')}
      </Text>
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder={i18n.t('accountPage.addressPlaceholder')}
        style={styles.input}
        value={userAddress}
        onChangeText={(txt) => {
          setUserAddress(txt);
        }}
        onSubmitEditing={() => _updateUserName('address')}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder={i18n.t('accountPage.postalCodePlaceholder')}
        style={styles.input}
        value={userPostalCode}
        onChangeText={(txt) => {
          setUserPostalCode(txt);
        }}
        onSubmitEditing={() => _updateUserName('postalCode')}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder={i18n.t('accountPage.cityPlaceholder')}
        style={styles.input}
        value={userCity}
        onChangeText={(txt) => {
          setUserCity(txt);
        }}
        onSubmitEditing={() => _updateUserName('city')}
        autoCapitalize="none"
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, marginTop: 8 },
  input: { height: 40, backgroundColor: 'white' },
  titlePlaceholder: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 12,
    paddingLeft: 2
  }
});

export default connect()(InputFields);
