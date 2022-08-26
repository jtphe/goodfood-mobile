/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '@config/';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

/**
 * LoginField component
 * @param {Function} setEmail - Set the user email
 * @param {Function} setPassword - Set the user password
 * @param {Function} login - Start the connection to Good Food
 * @param {Boolean} errorMail - If the user enter a wrong email address
 * @param {Boolean} errorPassword - If the user enter a too short password
 */
const LoginField = ({
  email,
  password,
  setEmail,
  setPassword,
  login,
  errorEmail,
  errorPassword
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const _returnRightIcon = () => {
    if (showPassword) {
      return 'eye-off';
    }
    return 'eye';
  };

  return (
    <View>
      <TextInput
        value={email}
        mode="outlined"
        label={i18n.t('login.email')}
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
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        value={password}
        mode="outlined"
        label={i18n.t('login.password')}
        outlineColor={colors.YELLOW}
        activeOutlineColor={colors.YELLOW}
        selectionColor={colors.YELLOW}
        secureTextEntry={showPassword}
        right={
          <TextInput.Icon
            color={colors.YELLOW}
            name={_returnRightIcon()}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        placeholder={i18n.t('login.password')}
        style={[styles.input, styles.inputPassword]}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        error={errorPassword}
        returnKeyType="done"
      />
      <Button
        mode="contained"
        color={colors.RED}
        onPress={() => login()}
        style={styles.btnConnection}
        contentStyle={styles.btnConnectionContentStyle}
      >
        {i18n.t('login.connection')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.BEIGE
  },
  inputPassword: { marginTop: 16 },
  btnConnection: { marginTop: 24, marginHorizontal: 60 },
  btnConnectionContentStyle: { height: 50 }
});

LoginField.propTypes = {
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  login: PropTypes.func,
  errorMail: PropTypes.bool,
  errorPassword: PropTypes.bool
};

export default LoginField;
