/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { colors } from '@config/';
import { addProductToCart } from '@store/modules/order/actions';
import { getCurrentFoods } from '@store/modules/order/selectors';
import { createSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import Header from '@components/Order/ProcessProduct/header';
import StepOne from '@components/Order/ProcessProduct/stepOne';
import QuantityStep from '@components/Order/ProcessProduct/quantityStep';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector([getCurrentFoods], (currentFoods) => {
  return { currentFoods };
});

const OrderProcessProduct = ({
  route: {
    params: { foodType, step, food }
  },
  currentFoods
}) => {
  const [currentStep, setCurrentStep] = useState(step || 1);
  const [product, setProduct] = useState(food || null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(food?.price || 0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _renderRightSubtitle = () => {
    switch (currentStep) {
      case 1: {
        let typeToDisplay = '';
        if (foodType.id === 1) {
          typeToDisplay = i18n.t('orderPage.orderBurger');
        } else if (foodType.id === 2) {
          typeToDisplay = i18n.t('orderPage.orderTacos');
        } else if (foodType.id === 3) {
          typeToDisplay = i18n.t('orderPage.orderPizza');
        } else if (foodType.id === 4) {
          typeToDisplay = i18n.t('orderPage.orderSandwich');
        } else if (foodType.id === 6) {
          typeToDisplay = i18n.t('orderPage.orderSnacks');
        } else {
          typeToDisplay = i18n.t('orderPage.orderDrink');
        }
        return i18n.t('orderPage.chooseFoodType', { foodType: typeToDisplay });
      }
      case 2:
        return '';
      default:
        return i18n.t('orderPage.stepOne');
    }
  };

  const _productChosen = (productChosen) => {
    setCurrentStep(currentStep + 1);
    setProduct(productChosen);
    setTotalPrice(productChosen.price);
  };

  const _addToCart = () => {
    const payload = {
      product,
      id: product.id,
      quantity,
      totalPrice
    };
    dispatch(addProductToCart({ payload }));
    navigation.goBack();
  };

  const _renderRightContent = () => {
    if (currentStep === 1) {
      return (
        <StepOne
          currentFoods={currentFoods}
          onPress={(item) => _productChosen(item)}
        />
      );
    } else {
      return (
        <QuantityStep
          product={product}
          quantity={quantity}
          handleQuantity={(q) => setQuantity(q)}
          totalPrice={totalPrice}
          handlePrice={(price) => setTotalPrice(price)}
          addToCart={() => _addToCart()}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header foodType={foodType || food} />
      <Text style={styles.subtitle}>{_renderRightSubtitle()}</Text>
      <View>{_renderRightContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  subtitle: {
    alignSelf: 'center',
    color: colors.YELLOW,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 36
  }
});

export default connect(mapStateToProps)(OrderProcessProduct);
