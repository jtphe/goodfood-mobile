import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@i18n/i18n';
import PasswordFields from '@components/Profile/PasswordEdit/passwordFields';
import Footer from '@shared/footer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@config/';
import { showToast } from '@helpers/showToast';
import { RootSiblingParent } from 'react-native-root-siblings';
import { connect, useDispatch } from 'react-redux';
import { updateUserPassword } from '@store/modules/user/actions';

const PasswordEdit = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();

  const _updatePassword = () => {
    if (
      currentPassword !== '' &&
      newPassword !== '' &&
      confirmNewPassword !== ''
    ) {
      if (newPassword === confirmNewPassword) {
        if (newPassword.length >= 8) {
          const payload = {
            oldPassword: currentPassword,
            newPassword
          };
          dispatch(updateUserPassword({ payload }));
          setNewPassword('');
          setCurrentPassword('');
          setConfirmNewPassword('');
          navigation.goBack();
        } else {
          showToast(i18n.t('accountPage.error3'), true);
        }
      } else {
        showToast(i18n.t('accountPage.error2'), true);
      }
    } else {
      showToast(i18n.t('accountPage.error1'), true);
    }
  };

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {i18n.t('accountPage.passwordEditScreenTitle')}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="close"
              size={20}
              style={styles.closeIcon}
              color={colors.RED}
            />
          </TouchableOpacity>
        </View>
        <PasswordFields
          currentPassword={currentPassword}
          setCurrentPassword={(pwd) => setCurrentPassword(pwd)}
          newPassword={newPassword}
          setNewPassword={(pwd) => setNewPassword(pwd)}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={(pwd) => setConfirmNewPassword(pwd)}
        />
        <Footer
          leftBtnAction={() => navigation.goBack()}
          leftBtnText={i18n.t('button.cancel')}
          rightBtnAction={() => _updatePassword()}
          rightBtnText={i18n.t('button.save')}
          containerStyle={styles.containerFooter}
        />
      </View>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeIcon: { marginTop: 2 },
  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    marginBottom: 58
  }
});

export default connect()(PasswordEdit);
