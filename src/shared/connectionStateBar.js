import React, { useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, StatusBar } from 'react-native';
import { getNetworkState } from '@store/modules/app/selectors';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { colors } from '@config/';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { calcHeight } from '@helpers/responsiveHelper';
import * as Animatable from 'react-native-animatable';
import i18n from '@i18n/i18n';
import PropTypes from 'prop-types';

const mapStateToProps = createSelector(getNetworkState, (networkState) => {
  return { networkState };
});

/**
 * ConnectionStateBar component
 * @param {String} networkState - The network state
 */
const ConnectionStateBar = ({ networkState }) => {
  const networkBar = useRef();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    if (networkState === 'disconnected') {
      networkBar.current.transitionTo({ backgroundColor: colors.RED }, 800);
      networkBar.current.fadeInDown(1000);
    } else {
      networkBar.current.transitionTo({ backgroundColor: colors.GREEN }, 500);
      setTimeout(() => {
        if (networkBar.current) {
          networkBar.current.fadeOutUp(2000);
        }
      }, 2000);
    }
  }, [networkState]);

  const parseConnectionText = () => {
    return networkState === 'disconnected'
      ? i18n.t('connection.disconnected')
      : i18n.t('connection.connected');
  };

  return (
    <Animatable.View ref={networkBar} style={styles.networkBar}>
      <Text style={styles.textStyle}>{parseConnectionText()}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  networkBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    ...ifIphoneX(
      { height: 70, paddingTop: calcHeight(5) },
      { height: 60, paddingTop: calcHeight(3) }
    ),
    width: Dimensions.get('window').width,
    opacity: 0
  },
  textStyle: {
    fontWeight: '500',
    color: 'white'
  }
});

ConnectionStateBar.propTypes = {
  networkState: PropTypes.string
};

export default connect(mapStateToProps)(ConnectionStateBar);
