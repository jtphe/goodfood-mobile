/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { emailChecker } from '@helpers/emailChecker';
import {
  checkPasswordLength,
  checkPasswordSame
} from '@helpers/passwordManager';
import { showToast } from '@helpers/showToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterField from '@components/Register/registerField';
import i18n from '@i18n/i18n';
import { colors } from '@config/';
import Icon from 'react-native-vector-icons/MaterialIcons';
import vibrate from '@helpers/vibrate';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorEmail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const _createAccount = () => {
    vibrate();
    if (_checkUserInfos()) {
      const payload = {
        email,
        password
      };
      console.log('payload', payload);
      // Dispatch the register method
    }
  };

  const _checkUserInfos = () => {
    if (
      !emailChecker(email) &&
      !checkPasswordSame(password, confirmPassword) &&
      !checkPasswordLength(password)
    ) {
      showToast(i18n.t('error.emailAndPasswordIncorrect'), true);
      setErrorMail(true);
      setErrorPassword(true);
    } else if (!emailChecker(email)) {
      showToast(i18n.t('error.emailIncorrect'), true);
      setErrorMail(true);
      setErrorPassword(false);
    } else if (!checkPasswordSame(password, confirmPassword)) {
      showToast(i18n.t('error.passwordNotTheSame', true));
      setErrorPassword(true);
      setErrorMail(false);
    } else if (!checkPasswordLength(password)) {
      showToast(i18n.t('error.passwordTooShort', true));
      setErrorPassword(true);
      setErrorMail(false);
    } else {
      setErrorPassword(false);
      setErrorMail(false);
      return true;
    }
  };

  const _returnToLoginScreen = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardAwareScrollView}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBackRow}
          onPress={() => _returnToLoginScreen()}
        >
          <Icon name="arrow-back-ios" size={25} style={styles.iconArrow} />
          <Text style={styles.textGoBack}>{i18n.t('login.screenTitle')}</Text>
        </TouchableOpacity>
        <Image
          source={require('@images/goodfood_logo_G.png')}
          style={styles.logo}
        />
        <View style={styles.wrapperRegisterZone}>
          <Text style={styles.registerText}>
            {i18n.t('register.screenTitle')}
          </Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <RegisterField
              setEmail={(e) => setEmail(e)}
              setPassword={(pwd) => setPassword(pwd)}
              setConfirmPassword={(pwd) => setConfirmPassword(pwd)}
              errorEmail={errorEmail}
              errorPassword={errorPassword}
              createAccount={() => _createAccount()}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAwareScrollView: { flex: 1 },
  container: {
    flex: 1,
    ...ifIphoneX({ paddingTop: 40 }),
    backgroundColor: colors.BEIGE,
    alignItems: 'center'
  },
  goBackRow: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
    ...ifIphoneX({}, { paddingTop: 32 })
  },
  iconArrow: {
    paddingLeft: 30,
    color: colors.YELLOW
  },
  textGoBack: { fontWeight: 'bold', fontSize: 16, color: colors.YELLOW },
  logo: {
    width: 200,
    height: 200,
    marginTop: 30
  },
  wrapperRegisterZone: {
    flexGrow: 2,
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 24
  },
  registerText: {
    paddingBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.RED,
    alignSelf: 'center'
  }
});

export default Register;
