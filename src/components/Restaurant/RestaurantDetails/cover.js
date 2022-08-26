import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Menu from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors } from '@config/';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const Cover = ({
  restaurantImage,
  navigation,
  setFavoriteRestaurant,
  isFavoriteRestaurant,
  openOptionsMenu
}) => {
  return (
    <View>
      <Pressable
        style={styles.containerIconClose}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="close"
          size={19}
          color={colors.RED}
          style={styles.iconClose}
        />
      </Pressable>
      <Pressable
        style={styles.containerIconHeart}
        onPress={() => setFavoriteRestaurant()}
      >
        {isFavoriteRestaurant ? (
          <Icon
            name="heart"
            size={19}
            style={styles.iconHeart}
            color={colors.RED}
          />
        ) : (
          <Icon
            name="hearto"
            size={19}
            style={styles.iconHeart}
            color={colors.RED}
          />
        )}
      </Pressable>
      <Pressable
        style={styles.containerIconOptions}
        onPress={() => openOptionsMenu()}
      >
        <Menu
          name="dots-horizontal"
          size={24}
          color={colors.RED}
          style={styles.iconOptions}
        />
      </Pressable>
      <FastImage
        style={styles.cover}
        source={{
          uri: restaurantImage,
          priority: FastImage.priority.high
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: 250
  },
  iconClose: { marginLeft: 5.5, marginTop: 5 },
  containerIconClose: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30,
    ...ifIphoneX({ top: 40 }, { top: 25 })
  },
  containerIconHeart: {
    position: 'absolute',
    right: 55,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30,
    ...ifIphoneX({ top: 40 }, { top: 25 })
  },
  iconHeart: { marginLeft: 5, marginTop: 6 },
  iconOptions: { marginLeft: 3.5, marginTop: 3 },
  containerIconOptions: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30,
    ...ifIphoneX({ top: 40 }, { top: 25 })
  }
});

export default Cover;
