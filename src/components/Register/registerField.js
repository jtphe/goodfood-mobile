import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import i18n from '@i18n/i18n';
import { colors } from '@config/';

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

export default RegisterField;
