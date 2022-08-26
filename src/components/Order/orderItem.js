import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '@config/index';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import i18n from '@i18n/i18n';

const OrderItem = ({ navigation, order }) => {
  const dateOfOrder = useMemo(() => {
    return order.createdAt;
  }, [order]);

  const _priceParser = () => {
    return `${order.price}€`;
  };

  const _dateParser = () => {
    return moment(dateOfOrder).format('D MMMM YYYY');
  };

  const _seeOrderDetails = () => {
    navigation.navigate(i18n.t('orderPage.detailsTitle'), {
      orderId: order.id
    });
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: 'https://goodfood-s3.s3.eu-west-3.amazonaws.com/Good+Food+logo+RV.png',
          priority: FastImage.priority.high
        }}
        style={styles.orderPicture}
      />
      <View style={styles.dataContainer}>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.menuName}>
            {i18n.t('orderPage.orderNumber', { number: order.id })}
          </Text>
          <Text style={styles.menuPrice}>{_priceParser()}</Text>
          <Text style={styles.menuDate}>{_dateParser()}</Text>
        </View>
        <View style={styles.containerSeeBtn}>
          <Button
            mode="contained"
            onPress={() => _seeOrderDetails()}
            style={styles.seeMoreBtn}
            labelStyle={styles.labelStyleBtn}
            color={colors.BEIGE}
            uppercase={false}
          >
            {i18n.t('orderPage.see')}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyleBtn: { color: colors.YELLOW, fontWeight: 'bold' },
  containerSeeBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flexDirection: 'row', marginBottom: 16 },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    borderBottomWidth: 1,
    borderColor: colors.GREY
  },
  menuDate: { fontWeight: 'bold', fontSize: 12, color: colors.GREY },
  menuPrice: { fontWeight: 'bold', fontSize: 14, color: colors.YELLOW },
  menuName: { fontWeight: 'bold', fontSize: 16, color: colors.RED },
  orderInfoContainer: { flex: 1, paddingTop: 4 },
  orderPicture: { width: 85, height: 85, borderRadius: 12 },
  seeMoreBtn: {
    marginRight: 4,
    borderRadius: 24
  }
});

export default OrderItem;
