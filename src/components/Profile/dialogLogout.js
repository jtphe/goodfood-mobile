import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dialog, Button, Portal } from 'react-native-paper';
import { colors } from '@config/';
import i18n from '@i18n/i18n';

const DialogLogout = ({ visible, setVisible, logout }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>
          <Text>{i18n.t('accountPage.logout')}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>{i18n.t('accountPage.dialogLogoutContent')}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.containerButton}>
          <Button
            color="white"
            uppercase={false}
            onPress={() => logout()}
            style={styles.logoutBtn}
          >
            {i18n.t('button.logout')}
          </Button>
          <Button
            color="black"
            uppercase={false}
            style={styles.cancelBtn}
            onPress={() => setVisible(false)}
          >
            {i18n.t('button.cancel')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerButton: { flexDirection: 'column', marginHorizontal: 14 },
  logoutBtn: {
    backgroundColor: colors.RED,
    width: '100%'
  },
  cancelBtn: {
    opacity: 0.6,
    borderWidth: 1,
    borderColor: colors.GREY,
    marginTop: 12,
    width: '100%'
  }
});

export default DialogLogout;
