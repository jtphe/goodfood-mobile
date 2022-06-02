import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import { Button } from 'react-native-paper';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '@config/';
import Icon from 'react-native-vector-icons/Fontisto';
import IconArrow from 'react-native-vector-icons/MaterialIcons';
import IconSearch from 'react-native-vector-icons/Feather';
import i18n from '@i18n/i18n';
import Category from '@components/Home/category';
import PropTypes from 'prop-types';
import foodCategories from '@utils/foodCategories';

/**
 * Home component
 * @param {Object} navigation - Props used to navigate between screens
 */
const Home = ({ navigation }) => {
  console.log('navigation', navigation);

  const [deliveryBtnMode, setDeliveryBtnMode] = useState('contained');
  const [takeAwayBtnMode, setTakeAwayBtnMode] = useState('text');
  const [searchFoodText, setSearchFoodText] = useState('');

  const _switchDeliveryMode = () => {
    if (deliveryBtnMode === 'contained') {
      setDeliveryBtnMode('text');
      setTakeAwayBtnMode('contained');
    } else if (takeAwayBtnMode === 'contained') {
      setTakeAwayBtnMode('text');
      setDeliveryBtnMode('contained');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDeliveriesButton}>
        <Button
          mode={deliveryBtnMode}
          onPress={() => _switchDeliveryMode()}
          style={styles.deliveryBtn}
          labelStyle={{ color: colors.YELLOW }}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('home.btnDelivery')}
        </Button>
        <Button
          mode={takeAwayBtnMode}
          onPress={() => _switchDeliveryMode()}
          style={styles.deliveryBtn}
          labelStyle={{ color: colors.YELLOW }}
          color={colors.BEIGE}
          uppercase={false}
        >
          {i18n.t('home.btnTakeaway')}
        </Button>
      </View>
      <TouchableOpacity style={styles.containerLocation}>
        <Icon name="shopping-store" size={18} style={styles.iconMap} />
        <Text>Mon resto favoris</Text>
        <IconArrow
          name="keyboard-arrow-down"
          size={18}
          style={styles.iconArrowDown}
        />
      </TouchableOpacity>
      <View style={styles.containerSearchInput}>
        <IconSearch name="search" size={18} color={colors.YELLOW} />
        <TextInput
          placeholder={i18n.t('home.placeholderSearchFood')}
          value={searchFoodText}
          onChangeText={(text) => setSearchFoodText(text)}
          style={styles.textInput}
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={foodCategories}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={foodCategories.length}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesFlatList}
        renderItem={({ item }) => <Category category={item} />}
      />
      <View style={styles.containerPeckish}>
        <Text style={styles.titlePeckish}>{i18n.t('home.peckishTitle')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPeckish: { paddingHorizontal: 24 },
  titlePeckish: { fontSize: 24, fontWeight: 'bold' },
  categoriesFlatList: {
    paddingHorizontal: 24,
    marginTop: 36
  },
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
  containerLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  iconMap: { marginRight: 6 },
  iconArrowDown: { marginLeft: 6 },
  containerSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.YELLOW,
    minHeight: 50
  },
  textInput: { flex: 1, paddingLeft: 4 }
});

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
