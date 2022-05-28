import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '@config/index';

const Footer = ({
  leftBtnAction,
  leftBtnText,
  rightBtnAction,
  rightBtnText,
  containerStyle
}) => {
  return (
    <View style={containerStyle}>
      <Button
        mode="contained"
        color={colors.RED}
        onPress={() => leftBtnAction()}
        contentStyle={styles.btnContentStyle}
      >
        {leftBtnText}
      </Button>
      <Button
        mode="contained"
        color={colors.YELLOW}
        labelStyle={styles.rightBtnLabel}
        onPress={() => rightBtnAction()}
        contentStyle={styles.btnContentStyle}
      >
        {rightBtnText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContentStyle: { height: 45, width: 150 },
  rightBtnLabel: { color: 'white' }
});

export default Footer;
