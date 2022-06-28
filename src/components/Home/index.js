import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '@config/';
import DeliveryScreen from '@components/Home/deliveryScreen';
import TakeawayScreen from '@components/Home/takeawayScreen';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

/**
 * Home component
 * @param {Object} navigation - Props used to navigate between screens
 */
const Home = ({ navigation }) => {
  const [deliveryBtnMode, setDeliveryBtnMode] = useState('contained');
  const [takeAwayBtnMode, setTakeAwayBtnMode] = useState('text');
  const [deliveryType, setDeliveryType] = useState('delivery');

  const _switchDeliveryMode = (type) => {
    if (deliveryType !== type) {
      if (deliveryBtnMode === 'contained') {
        setDeliveryBtnMode('text');
        setTakeAwayBtnMode('contained');
        setDeliveryType('takeaway');
      } else if (takeAwayBtnMode === 'contained') {
        setTakeAwayBtnMode('text');
        setDeliveryBtnMode('contained');
        setDeliveryType('delivery');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDeliveriesButton}>
        <Button
          mode={deliveryBtnMode}
          onPress={() => _switchDeliveryMode('delivery')}
          style={styles.deliveryBtn}
          labelStyle={{ color: colors.YELLOW }}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('home.btnDelivery')}
        </Button>
        <Button
          mode={takeAwayBtnMode}
          onPress={() => _switchDeliveryMode('takeaway')}
          style={styles.deliveryBtn}
          labelStyle={{ color: colors.YELLOW }}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('home.btnTakeaway')}
        </Button>
      </View>
      {deliveryType === 'delivery' ? (
        <DeliveryScreen />
      ) : (
        <TakeawayScreen navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...ifIphoneX({ paddingTop: calcHeight(7) }, { paddingTop: calcHeight(3) })
  },
  containerDeliveriesButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  deliveryBtn: {
    marginRight: 4,
    borderRadius: 24
  },
  textInput: { flex: 1, paddingLeft: 4 }
});

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
