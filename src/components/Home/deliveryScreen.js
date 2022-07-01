import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { colors } from '@config/';
import { Searchbar } from 'react-native-paper';
import i18n from '@i18n/i18n';
import Category from '@components/Home/category';
import foodCategories from '@utils/foodCategories';

const DeliveryScreen = () => {
  const [searchFoodText, setSearchFoodText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder={i18n.t('home.placeholderSearchFood')}
        value={searchFoodText}
        onChangeText={(text) => setSearchFoodText(text)}
        style={styles.containerSearchInput}
        inputStyle={styles.searchInput}
        returnKeyType="search"
        selectionColor={colors.YELLOW}
      />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  iconMap: { marginRight: 6 },
  iconArrowDown: { marginLeft: 6 },
  searchInput: { fontSize: 16 },
  containerSearchInput: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.YELLOW,
    minHeight: 50
  },
  containerPeckish: { marginTop: 24, paddingHorizontal: 24 },
  titlePeckish: { fontSize: 24, fontWeight: 'bold' },
  categoriesFlatList: {
    paddingHorizontal: 24,
    marginTop: 36
  }
});

export default DeliveryScreen;
