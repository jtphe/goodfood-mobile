import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '@config/';
import Category from '@components/Home/category';
import i18n from 'i18n-js';
import foodCategories from '@utils/foodCategories';

const Search = ({ navigation }) => {
  const _startOrderProcess = (item) => {
    console.log('item', item);
    if (item.name === i18n.t('categories.menu')) {
      // Process menu
      navigation.navigate(i18n.t('orderPage.orderProcessTitle'));
    } else {
      // Process product itself
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('search.title')}</Text>
      <>
        <Text style={styles.subtitle}>{i18n.t('search.subtitle')}</Text>
        <View style={styles.containerFlatlist}>
          <FlatList
            data={foodCategories}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={foodCategories.length}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Category
                category={item}
                styleContainer={styles.styleContainer}
                styleCategory={styles.styleCategory}
                onPress={() => _startOrderProcess(item)}
              />
            )}
          />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlatlist: { alignItems: 'center' },
  styleContainer: { margin: 10 },
  styleCategory: { width: 130, height: 130 },
  container: {
    flex: 1,
    ...ifIphoneX({ paddingTop: calcHeight(7) }, { paddingTop: calcHeight(3) }),
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  title: { alignSelf: 'center', fontSize: 24, fontWeight: 'bold' },
  subtitle: {
    color: colors.YELLOW,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 50,
    marginBottom: 25
  }
});

export default Search;
