import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ foodType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{foodType.name.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Header;
