import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Home component
 * @param {Object} navigation - Props used to navigate between screens
 */
const Home = ({ navigation }) => {
  console.log('navigation', navigation);

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
