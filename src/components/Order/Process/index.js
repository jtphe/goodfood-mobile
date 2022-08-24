/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { colors } from '@config/';
import { loadCurrentFood, addMenuToCart } from '@store/modules/order/actions';
import { getCurrentFoods } from '@store/modules/order/selectors';
import { createSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import Header from '@components/Order/Process/header';
import StepOne from '@components/Order/Process/stepOne';
import FinalStep from '@components/Order/Process/finalStep';
import OthersStep from '@components/Order/Process/othersStep';
import i18n from '@i18n/i18n';

const mapStateToProps = createSelector([getCurrentFoods], (currentFoods) => {
  return { currentFoods };
});

const OrderProcess = ({
  route: {
    params: { foodTypes, restaurant, user }
  },
  currentFoods
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [foodType, setFoodType] = useState(null);
  const [food, setFood] = useState(null);
  const [snack, setSnack] = useState(null);
  const [drink, setDrink] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isTakeawayOrder = useMemo(() => {
    return !!restaurant;
  }, [restaurant]);

  const _renderRightSubtitle = () => {
    switch (currentStep) {
      case 1:
        return i18n.t('orderPage.stepOne');
      case 2: {
        let typeToDisplay = '';
        if (foodType === 1) {
          typeToDisplay = i18n.t('orderPage.orderBurger');
        } else if (foodType === 2) {
          typeToDisplay = i18n.t('orderPage.orderTacos');
        } else if (foodType === 3) {
          typeToDisplay = i18n.t('orderPage.orderPizza');
        } else {
          typeToDisplay = i18n.t('orderPage.orderSandwich');
        }
        return i18n.t('orderPage.chooseFoodType', { foodType: typeToDisplay });
      }
      case 3:
        return i18n.t('orderPage.chooseSnack');
      case 4:
        return i18n.t('orderPage.chooseDrink');
      case 5:
        return i18n.t('orderPage.recap');
      default:
        return i18n.t('orderPage.stepOne');
    }
  };

  const _setFoodType = (type) => {
    setFoodType(type.id);
    const payload = {
      typeId: type.id,
      restaurant
    };
    dispatch(loadCurrentFood({ payload }));
    setCurrentStep(currentStep + 1);
  };

  const _handleProductPressed = (item) => {
    let payload = {};

    setTotalPrice(totalPrice + item.price);
    if (currentStep === 2) {
      setFood(item);
      payload = {
        typeId: 5
      };
    } else if (currentStep === 3) {
      setSnack(item);
      payload = {
        typeId: 6
      };
    } else if (currentStep === 4) {
      setDrink(item);
      payload = {
        typeId: 7
      };
    }
    setCurrentStep(currentStep + 1);
    dispatch(loadCurrentFood({ payload }));
  };

  const _addToCart = () => {
    const menu = {
      price: totalPrice,
      food: food.id,
      snack: snack.id,
      drink: drink.id
    };
    const payload = { menu };
    dispatch(addMenuToCart({ payload }));
    navigation.goBack();
  };

  const _renderRightContent = () => {
    if (currentStep === 1) {
      return (
        <StepOne
          foodTypes={foodTypes}
          foodTypeSelected={(foodSelected) => _setFoodType(foodSelected)}
        />
      );
    } else if (currentStep === 5) {
      return (
        <FinalStep
          food={food}
          snack={snack}
          drink={drink}
          restaurant={restaurant}
          isTakeawayOrder={isTakeawayOrder}
          userAddress={user.address}
          totalPrice={totalPrice}
          addToCart={() => _addToCart()}
        />
      );
    } else {
      return (
        <OthersStep
          data={currentFoods}
          step={currentStep}
          onPress={(item) => _handleProductPressed(item)}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header step={currentStep} />
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

export default connect(mapStateToProps)(OrderProcess);
