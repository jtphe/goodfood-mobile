/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';
import { colors } from '@config/';
import { Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';

const Card = ({
  cardName,
  cardNumber,
  cardExpiration,
  cardCVV,
  setCurrentStep,
  setCardName,
  setCardNumber,
  setCardExpiration,
  setCardCVV
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'MasterCard', value: 1 },
    { label: 'VISA', value: 2 },
    { label: 'Maestro', value: 3 }
  ]);

  const _saveUserCreditCard = () => {
    if (
      cardName.length > 0 &&
      cardNumber.length > 0 &&
      cardExpiration.length > 0 &&
      cardCVV > 0
    ) {
      setCurrentStep(2);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCreditCard}>
        <TouchableOpacity onPress={() => setCurrentStep(2)}>
          <Icon style={styles.iconLeft} name="left" size={26} />
        </TouchableOpacity>
        <Text style={styles.titleHeaderCreditCard}>
          {i18n.t('orderPage.creditCard')}
        </Text>
      </View>
      <Text style={styles.titleAddCreditCard}>
        {i18n.t('orderPage.addCreditCard')}
      </Text>
      <TextInput
        placeholder={i18n.t('orderPage.cardName')}
        style={styles.input}
        placeholderTextColor={colors.DARK_GREY}
        onChangeText={(txt) => {
          setCardName(txt);
        }}
        returnKeyType="done"
        autoCapitalize="none"
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={i18n.t('orderPage.cardType')}
        style={[styles.input, styles.dropdown]}
        placeholderStyle={styles.dropdownPlaceholder}
        listItemLabelStyle={styles.listItemLabelStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        textStyle={styles.dropdownText}
        TickIconComponent={() => (
          <Icon
            style={styles.iconLeft}
            name="check"
            size={20}
            color={colors.YELLOW}
          />
        )}
        ArrowUpIconComponent={() => (
          <Icon
            style={styles.iconLeft}
            name="up"
            size={20}
            color={colors.YELLOW}
          />
        )}
        ArrowDownIconComponent={() => (
          <Icon
            style={styles.iconLeft}
            name="down"
            size={20}
            color={colors.YELLOW}
          />
        )}
      />
      <TextInput
        placeholder={i18n.t('orderPage.cardNumber')}
        style={styles.input}
        placeholderTextColor={colors.DARK_GREY}
        keyboardType="numeric"
        maxLength={16}
        onChangeText={(txt) => {
          setCardNumber(txt);
        }}
        returnKeyType="done"
        autoCapitalize="none"
      />
      <View style={styles.rowExpCVV}>
        <TextInput
          placeholder={i18n.t('orderPage.cardExpiration')}
          style={[styles.input, styles.expCVV]}
          onChangeText={(txt) => {
            if (txt.length === 2 && cardExpiration.slice(-1) !== '/') {
              setCardExpiration(`${txt}/`);
            } else {
              setCardExpiration(txt);
            }
          }}
          autoCapitalize="none"
          maxLength={5}
          placeholderTextColor={colors.DARK_GREY}
          keyboardType="numeric"
          returnKeyType="done"
          value={cardExpiration}
        />
        <TextInput
          placeholder={i18n.t('orderPage.cardCVV')}
          style={[styles.input, styles.expCVV]}
          maxLength={3}
          placeholderTextColor={colors.DARK_GREY}
          keyboardType="numeric"
          onChangeText={(txt) => {
            setCardCVV(txt);
          }}
          autoCapitalize="none"
          returnKeyType="done"
        />
      </View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => _saveUserCreditCard()}
          style={styles.btnSaveCreditCard}
          labelStyle={styles.btnSaveCreditCardText}
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
  rowExpCVV: { flexDirection: 'row', justifyContent: 'space-between' },
  dropDownContainerStyle: {
    borderColor: colors.DARK_GREY
  },
  listItemLabelStyle: { color: colors.DARK_GREY },
  dropdownText: { color: colors.DARK_GREY, fontSize: 16 },
  dropdownPlaceholder: { color: colors.DARK_GREY, fontSize: 16 },
  dropdown: {
    borderWidth: 0,
    borderRadius: 0,
    color: colors.GREY,
    paddingHorizontal: 0
  },
  expCVV: { width: '45%' },
  btnSaveCreditCardText: {
    color: colors.RED,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 4
  },
  btnSaveCreditCard: {
    width: 200,
    height: 40,
    borderRadius: 8,
    marginTop: 24,
    marginLeft: 50,
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
    paddingBottom: 6,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.DARK_GREY,
    fontSize: 16
  },
  titleAddCreditCard: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: colors.RED
  },
  container: { flex: 1, paddingHorizontal: 24, backgroundColor: 'white' },
  titleHeaderCreditCard: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width / 6
  },
  headerCreditCard: {
    flexDirection: 'row',
    paddingVertical: 24
  }
});

export default Card;
