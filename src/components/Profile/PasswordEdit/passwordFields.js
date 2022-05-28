import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '@config/index';
import i18n from '@i18n/i18n';

const PasswordFields = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.currentPassword')}
      </Text>
      <TextInput
        mode="outlined"
        activeOutlineColor={colors.YELLOW}
        outlineColor={colors.GREY}
        placeholder="•••••••••••••••"
        style={styles.input}
        value={currentPassword}
        onChangeText={(txt) => {
          setCurrentPassword(txt);
        }}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.newPassword')}
      </Text>
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder="•••••••••••••••"
        style={styles.input}
        value={newPassword}
        onChangeText={(txt) => {
          setNewPassword(txt);
        }}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Text style={styles.titlePlaceholder}>
        {i18n.t('accountPage.confirmNewPassword')}
      </Text>
      <TextInput
        mode="outlined"
        outlineColor={colors.GREY}
        activeOutlineColor={colors.YELLOW}
        placeholder="•••••••••••••••"
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={(txt) => {
          setConfirmNewPassword(txt);
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

export default PasswordFields;
