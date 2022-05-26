import React, { useMemo } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { colors } from '@config/index';
import { Button } from 'react-native-paper';
import moment from 'moment';
import i18n from '@i18n/i18n';

const OrderItem = ({ navigation, order }) => {
  const pictureSource = useMemo(() => {
    return order.pictureSrc;
  }, [order]);
  const dateOfOrder = useMemo(() => {
    return order.createdAt;
  }, [order]);

  const _priceParser = () => {
    return `${order.totalPrice}€`;
  };

  const _dateParser = () => {
    return moment.unix(dateOfOrder).format('MM dddd YYYY');
  };

  const _seeOrderDetails = () => {
    navigation.navigate(i18n.t('orderPage.detailsTitle'), { order });
  };

  return (
    <View style={styles.container}>
      <Image source={pictureSource} style={styles.orderPicture} />
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
            onPress={() => _seeOrderDetails({ navigation })}
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
