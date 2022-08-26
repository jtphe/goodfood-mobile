import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import Text from '@shared/Text';
import i18n from '@i18n/i18n';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@config/';

const AutoCompleteAndroid = ({
  products,
  query,
  setQuery,
  comp,
  openProductDetails
}) => {
  return (
    <View style={styles.autocompleteContainer}>
      <Autocomplete
        data={
          products?.length === 1 && comp(query, products[0].name)
            ? []
            : products
        }
        value={query}
        defaultValue={query}
        style={styles.inputInvitations}
        containerStyle={styles.autocompleteContainerStyle}
        inputContainerStyle={styles.autocompleteInputContainer}
        listContainerStyle={styles.listContainerStyle}
        placeholder={i18n.t('home.placeholderSearchFood')}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    marginBottom: 50,
    left: 0,
    right: 0,
    bottom: 0
  },
  inputInvitations: {
    color: colors.GREY,
    fontSize: 16,
    height: 45,
    marginLeft: 10
  },
  autocompleteInputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.BORDER
  },
  autocompleteContainerStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10
  },
  listContainerStyle: {
    width: '105%',
    marginBottom: 20,
    marginLeft: -10
  },
  userItem: {
    color: mobileAppColors.GREY,
    fontSize: 16,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  },
  textRole: {
    fontSize: 11,
    padding: 4
  },
  containerRole: {
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 4
  },
  userContainer: { flexDirection: 'row', alignItems: 'center' }
});

export default AutoCompleteAndroid;
