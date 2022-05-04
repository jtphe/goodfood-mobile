/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '@config/';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

/**
 * RegisterField component
 * @param {Function} setEmail - Set the user email
 * @param {Function} setPassword - Set the user password
 * @param {Function} setConfirmPassword - Set the user confirm password
 * @param {Boolean} errorMail - If the user enter a wrong email address
 * @param {Boolean} errorPassword - If the user enter a too short password
 * @param {Function} createAccount - Create the user account
 */
const RegisterField = ({
  setEmail,
  setPassword,
  setConfirmPassword,
  errorEmail,
  errorPassword,
  createAccount
}) => {
  return (
    <View style={styles.containerTextInput}>
      <TextInput
        mode="outlined"
        label={i18n.t('register.email')}
        outlineColor={colors.YELLOW}
        activeOutlineColor={colors.YELLOW}
        selectionColor={colors.YELLOW}
        placeholder={i18n.t('login.email')}
        style={styles.input}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        error={errorEmail}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        label={i18n.t('register.password')}
        outlineColor={colors.YELLOW}
        activeOutlineColor={colors.YELLOW}
        selectionColor={colors.YELLOW}
        secureTextEntry
        placeholder={i18n.t('login.password')}
        style={[styles.input, styles.inputPassword]}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        error={errorPassword}
        returnKeyType="next"
      />
      <TextInput
        mode="outlined"
        label={i18n.t('register.confirmPassword')}
        outlineColor={colors.YELLOW}
        activeOutlineColor={colors.YELLOW}
        selectionColor={colors.YELLOW}
        secureTextEntry
        placeholder={i18n.t('login.password')}
        style={[styles.input, styles.inputPassword]}
        onChangeText={(txt) => {
          setConfirmPassword(txt);
        }}
        error={errorPassword}
        returnKeyType="done"
      />
      <Button
        mode="contained"
        color={colors.RED}
        onPress={() => createAccount()}
        style={styles.btnCreateAccount}
        contentStyle={styles.btnCreateAccountContentStyle}
      >
        {i18n.t('register.createAccount')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTextInput: { flex: 1 },
  input: {
    backgroundColor: colors.BEIGE
  },
  inputPassword: { marginTop: 16 },
  btnCreateAccount: { marginTop: 24, marginHorizontal: 40 },
  btnCreateAccountContentStyle: { height: 50 }
});

RegisterField.propTypes = {
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  setConfirmPassword: PropTypes.func,
  errorMail: PropTypes.bool,
  errorPassword: PropTypes.bool,
  createAccount: PropTypes.func
};

export default RegisterField;
