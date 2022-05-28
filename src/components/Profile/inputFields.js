import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '@config/index';
import i18n from '@i18n/i18n';

const InputFields = ({ firstname, lastname, address }) => {
  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [userAddress, setUserAddress] = useState(address);
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

export default InputFields;
