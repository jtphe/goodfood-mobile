import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@config/';
import { connect, useDispatch } from 'react-redux';
import {
  getMenuList,
  getProductList,
  getCartTotalPrice,
  getProcessStatus
} from '@store/modules/order/selectors';
import {
  removeLastItemCart,
  updateProductList,
  removeMenu,
  updateProcessStatus,
  cancelOrder
} from '@store/modules/order/actions';
import {
  getUserAddress,
  getUserPostalCode,
  getUserCity
} from '@store/modules/user/selectors';
import { getCurrentRestaurant } from '@store/modules/restaurant/selectors';
import { createSelector } from 'reselect';
import { roundToTwo } from '@helpers/roundToTwo';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Trash from 'react-native-vector-icons/Feather';
import i18n from '@i18n/i18n';
import Summary from '@components/Order/Cart/summary';
import Address from '@components/Order/Cart/address';
import Card from '@components/Order/Cart/card';
import OrderPlaced from '@components/Order/Cart/orderPlaced';

const mapStateToProps = createSelector(
  [
    getMenuList,
    getProductList,
    getCartTotalPrice,
    getUserAddress,
    getUserPostalCode,
    getUserCity,
    getCurrentRestaurant,
    getProcessStatus
  ],
  (
    menuList,
    productList,
    totalPrice,
    userAddress,
    userPostalCode,
    userCity,
    currentRestaurant,
    processStatus
  ) => {
    return {
      menuList,
      productList,
      totalPrice,
      userAddress,
      userPostalCode,
      userCity,
      currentRestaurant,
      processStatus
    };
  }
);

const Cart = ({
  menuList,
  productList,
  totalPrice,
  userAddress,
  userPostalCode,
  userCity,
  currentRestaurant,
  processStatus
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _validateOrder = () => {
    setCurrentStep(2);
  };

  const _closeModal = () => {
    navigation.goBack();
    const payload = {
      created: false
    };
    dispatch(updateProcessStatus({ payload }));
  };

  if (currentStep === 1) {
    return (
      <View style={styles.container}>
        <Header />
        <View>
          <FlatList
            data={menuList}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={menuList.length}
            style={styles.flatList}
            renderItem={({ item }) => (
              <RowMenu item={item} price={item.price} />
            )}
          />
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={productList.length}
            style={styles.flatList}
            renderItem={({ item }) => (
              <RowProduct
                item={item.product}
                quantity={item.quantity}
                price={item.totalPrice}
              />
            )}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.rowSubtotal}>
            <Text style={styles.subTotalText}>
              {i18n.t('orderPage.subTotal')}
            </Text>
            <Text style={styles.subTotalPrice}>{totalPrice}€</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => _validateOrder()}
            style={styles.btnValidateOrder}
            labelStyle={styles.btnValidateOrderText}
            color={colors.BEIGE}
            uppercase={false}
          >
            {i18n.t('orderPage.validateOrder')}
          </Button>
        </View>
      </View>
    );
  } else if (currentStep === 2) {
    return (
      <Summary
        currentRestaurant={currentRestaurant}
        userAddress={userAddress}
        userPostalCode={userPostalCode}
        userCity={userCity}
        setCurrentStep={(step) => setCurrentStep(step)}
        totalPrice={totalPrice}
        cardName={cardName}
        cardNumber={cardNumber}
        cardExpiration={cardExpiration}
        cardCVV={cardCVV}
      />
    );
  } else if (currentStep === 3) {
    return <Address setCurrentStep={(step) => setCurrentStep(step)} />;
  } else if (currentStep === 4) {
    return (
      <Card
        cardName={cardName}
        cardNumber={cardNumber}
        cardExpiration={cardExpiration}
        cardCVV={cardCVV}
        setCurrentStep={(step) => setCurrentStep(step)}
        setCardName={(name) => setCardName(name)}
        setCardNumber={(number) => setCardNumber(number)}
        setCardExpiration={(date) => setCardExpiration(date)}
        setCardCVV={(cvv) => setCardCVV(cvv)}
      />
    );
  } else {
    return (
      <OrderPlaced
        processStatus={processStatus}
        closeModal={() => _closeModal()}
      />
    );
  }
};

const RowMenu = ({ item, price }) => {
  const dispatch = useDispatch();
  const _removeMenu = () => {
    const payload = {
      menu: item
    };
    dispatch(removeMenu({ payload }));
  };

  return (
    <View style={styles.containerRowMenu}>
      <Text style={styles.menuName}>1 menu</Text>
      <Text style={styles.menuPrice}>{price}€</Text>
      <TouchableOpacity onPress={() => _removeMenu()}>
        <Trash
          style={styles.iconClose}
          name="trash-2"
          size={22}
          color={colors.RED}
        />
      </TouchableOpacity>
    </View>
  );
};

const RowProduct = ({ item, quantity, price }) => {
  const [quantityToDisplay, setQuantityToDisplay] = useState(quantity);
  const [priceToDisplay, setPriceToDisplay] = useState(price);
  const dispatch = useDispatch();

  const _handleQuantity = (type) => {
    if (type === 'add') {
      setQuantityToDisplay(quantityToDisplay + 1);
      setPriceToDisplay(roundToTwo(priceToDisplay + item.price));
      const payload = {
        type,
        item
      };
      dispatch(updateProductList({ payload }));
    } else {
      if (quantityToDisplay === 1) {
        const payload = {
          product: item,
          price
        };
        dispatch(removeLastItemCart({ payload }));
      } else {
        setQuantityToDisplay(quantityToDisplay - 1);
        setPriceToDisplay(roundToTwo(priceToDisplay - item.price));
        const payload = {
          type,
          item
        };
        dispatch(updateProductList({ payload }));
      }
    }
  };

  return (
    <View style={styles.containerRowProduct}>
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.rowQuantity}>
        <View style={styles.containerQuantity}>
          <TouchableOpacity
            style={styles.containerBtnQuantity}
            onPress={() => {
              _handleQuantity('substract');
            }}
          >
            <Text style={styles.quantityOperator}>
              {i18n.t('button.minus')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantityToDisplay}</Text>
          <TouchableOpacity
            style={styles.containerBtnQuantity}
            onPress={() => {
              _handleQuantity('add');
            }}
          >
            <Text style={styles.quantityOperator}>{i18n.t('button.plus')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{priceToDisplay}€</Text>
      </View>
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _cancelOrder = () => {
    dispatch(cancelOrder());
    navigation.goBack();
  };

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          style={styles.iconClose}
          name="close"
          size={26}
          color={colors.RED}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{i18n.t('orderPage.yourCart')}</Text>
      <TouchableOpacity onPress={() => _cancelOrder()}>
        <Text style={styles.cancelOrder}>{i18n.t('button.cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelOrder: {
    color: colors.RED,
    marginRight: 18,
    fontSize: 16,
    fontWeight: '600'
  },
  subTotalPrice: { fontWeight: 'bold', fontSize: 16 },
  subTotalText: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  rowSubtotal: { flexDirection: 'row' },
  footer: {
    width: '100%',
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    bottom: 0,
    marginBottom: 50,
    paddingHorizontal: 12,
    paddingTop: 12
  },
  btnValidateOrderText: {
    color: colors.RED,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 4
  },
  btnValidateOrder: {
    width: 200,
    height: 40,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center'
  },
  container: { flex: 1, backgroundColor: 'white' },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    paddingRight: 12
  },
  menuName: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    paddingRight: 12
  },
  containerRowMenu: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  containerRowProduct: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  rowQuantity: { flexDirection: 'row', paddingTop: 12 },
  containerQuantity: {
    flex: 1,
    flexDirection: 'row'
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    marginTop: 4,
    fontWeight: 'bold'
  },
  quantityOperator: { color: colors.RED, fontSize: 14 },
  containerBtnQuantity: {
    backgroundColor: colors.YELLOW,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  flatList: {},
  headerTitle: { flex: 1, fontSize: 18, fontWeight: 'bold', marginLeft: 110 },
  iconClose: { paddingLeft: 12 },
  containerHeader: {
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  }
});

export default connect(mapStateToProps)(Cart);
