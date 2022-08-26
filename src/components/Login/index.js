/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { emailChecker } from '@helpers/emailChecker';
import { checkPasswordLength } from '@helpers/passwordManager';
import { showToast } from '@helpers/showToast';
import { Button } from 'react-native-paper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '@config/';
import { useDispatch, connect } from 'react-redux';
import { updateNetworkState } from '@store/modules/app/actions';
import { signIn } from '@store/modules/user/actions';
import { createSelector } from 'reselect';
import { getToken } from '@store/modules/user/selectors';
import PropTypes from 'prop-types';
import LoginField from '@components/Login/loginField';
import i18n from '@i18n/i18n';
import vibrate from '@helpers/vibrate';
import NetInfo from '@react-native-community/netinfo';
import ConnectionStateBar from '@shared/connectionStateBar';
import moment from 'moment';
import 'moment/min/locales';

const mapStateToProps = createSelector([getToken], (token) => {
  return {
    isLoggedIn: token !== null
  };
});

const locale = i18n.currentLocale().split('-')[0];
if (locale === 'fr') {
  moment.locale('fr');
} else {
  moment.locale('en');
}

/**
 * Login component
 * @param {Object} navigation - Props used to navigate between screens
 */
const Login = ({ navigation, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    NetInfo.addEventListener((networkState) => {
      const { isConnected } = networkState;
      const payload = {
        connectionState: isConnected ? 'connected' : 'disconnected'
      };
      dispatch(updateNetworkState(payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _login = () => {
    vibrate();
    if (_checkCredentials()) {
      const payload = {
        email,
        password,
        navigation
      };
      dispatch(signIn({ payload }));
      setEmail('');
      setPassword('');
    }
  };

  const _checkCredentials = () => {
    if (!emailChecker(email) && !checkPasswordLength(password)) {
      showToast(i18n.t('error.emailAndPasswordIncorrect'), true);
      setErrorMail(true);
      setErrorPassword(true);
    } else if (!emailChecker(email)) {
      showToast(i18n.t('error.emailIncorrect'), true);
      setErrorMail(true);
      setErrorPassword(false);
    } else if (!checkPasswordLength(password)) {
      showToast(i18n.t('error.passwordTooShort', true));
      setErrorPassword(true);
      setErrorMail(false);
    }
    if (emailChecker(email) && checkPasswordLength(password)) {
      setErrorPassword(false);
      setErrorMail(false);
      return true;
    }
  };

  if (isLoggedIn) {
    navigation.navigate('Root');
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardAwareScrollView}
    >
      <View style={styles.container}>
        <ConnectionStateBar />
        <Image
          source={require('@images/goodfood_logo_G.png')}
          style={styles.logo}
        />
        <View style={styles.wrapperLoginZone}>
          <Text style={styles.welcomeText}>{i18n.t('login.welcome')}</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LoginField
              email={email}
              password={password}
              setEmail={(e) => setEmail(e)}
              setPassword={(pwd) => setPassword(pwd)}
              login={() => _login()}
              errorEmail={errorEmail}
              errorPassword={errorPassword}
            />
          </TouchableWithoutFeedback>
          <View style={styles.noAccountZone}>
            <Text style={styles.noAccountText}>
              {i18n.t('login.noAccount')}
            </Text>
            <Button
              mode="text"
              color={colors.RED}
              onPress={() => navigation.push(i18n.t('register.screenTitle'))}
              style={styles.btnRegister}
            >
              {i18n.t('login.register')}
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAwareScrollView: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BEIGE
  },
  logo: {
    width: 200,
    height: 200,
    ...ifIphoneX({ marginTop: calcHeight(15) }, { marginTop: calcHeight(10) })
  },
  wrapperLoginZone: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 24
  },
  welcomeText: {
    paddingBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.RED,
    alignSelf: 'center'
  },
  noAccountZone: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 34,
    paddingTop: 24
  },
  noAccountText: { fontSize: 16, color: colors.YELLOW },
  btnRegister: { marginTop: 12 }
});

Login.propTypes = {
  navigation: PropTypes.object
};

export default connect(mapStateToProps)(Login);
