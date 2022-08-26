import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors } from '@config/';
import Autocomplete from 'react-native-autocomplete-input';
import i18n from '@i18n/i18n';
import FastImage from 'react-native-fast-image';

const AutoCompleteIos = ({
  products,
  query,
  setQuery,
  comp,
  openProductDetails
}) => {
  return (
    <Autocomplete
      data={
        products?.length === 1 && comp(query, products[0].name) ? [] : products
      }
      value={query}
      defaultValue={query}
      style={styles.inputInvitations}
      inputContainerStyle={styles.autocompleteInputContainer}
      listContainerStyle={styles.listContainerStyle}
      placeholder={i18n.t('home.placeholderSearchFood')}
      placeholderTextColor={colors.GREY}
      keyboardShouldPersistTaps={true}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => setQuery(text)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => openProductDetails(item)}>
          <View style={styles.productRow}>
            <FastImage
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      flatListProps={{
        style: {
          borderWith: 0,
          marginVertical: 12,
          paddingVertical: 8
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  productImage: { width: 70, height: 70, borderRadius: 12, marginRight: 12 },
  inputInvitations: {
    fontSize: 16,
    height: 45,
    marginLeft: 10
  },
  autocompleteInputContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.YELLOW,
    minHeight: 50
  },
  listContainerStyle: {
    borderWith: 0,
    marginHorizontal: 24,
    marginTop: 12
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  productName: { fontSize: 16, fontWeight: '600' }
});

export default AutoCompleteIos;
