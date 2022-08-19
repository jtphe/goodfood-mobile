import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  U_LOAD_CURRENT_FOOD,
  M_SET_CURRENT_FOODS,
  M_UPDATE_ORDER_STEP,
  U_LOAD_FOOD_TYPE,
  U_CREATE_ORDER,
  M_SET_ORDER_PROCESS_STATUS,
  M_RESET_ORDER
} from '@store/modules/order/actions';
import {
  getToken,
  getUserFavoriteRestaurant
} from '@store/modules/user/selectors';
import {
  getMenuList,
  getProductList,
  getCartTotalPrice
} from '@store/modules/order/selectors';
import { getCurrentRestaurant } from '@store/modules/restaurant/selectors';
import Config from 'react-native-config';
import fetchService from '@api/fetchService';

function* loadCurrentFood({ payload }) {
  try {
    const token = yield select(getToken);
    const userRestaurant = yield select(getUserFavoriteRestaurant);
    const finalRestaurant = payload.restaurant || userRestaurant;

    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants/${finalRestaurant.id}/products`,
      headers: {
        token
      }
    };
    const foods = yield call(fetchService.request, query);
    const filteredFoods = foods.filter((f) => f.productType === payload.typeId);

    yield put({
      type: M_SET_CURRENT_FOODS,
      foods: filteredFoods
    });
    yield put({ type: M_UPDATE_ORDER_STEP, step: payload.typeId + 1 });
  } catch (e) {
    console.log('Error while loading current foods => ', e);
  }
}

function* loadFoodType({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants/${payload.restaurant.id}/type/${payload.type}`,
      headers: {
        token
      }
    };
    const foods = yield call(fetchService.request, query);

    yield put({ type: M_SET_CURRENT_FOODS, foods });
  } catch (e) {
    console.log('Error while loading food type => ', e);
  }
}

function* createOrder() {
  try {
    const token = yield select(getToken);
    const menuList = yield select(getMenuList);
    const productList = yield select(getProductList);
    const restaurant = yield select(getUserFavoriteRestaurant);
    const currentRestaurant = yield select(getCurrentRestaurant);
    const price = yield select(getCartTotalPrice);
    const restaurantId = currentRestaurant
      ? currentRestaurant.id
      : restaurant.id;

    const query = {
      method: 'post',
      url: `${Config.API_URL}restaurants/${restaurantId}/orders`,
      headers: {
        token
      },
      data: {
        products: productList,
        menus: menuList,
        price,
        type: 2, // a voir ce que c'est
        payment: 'Paid'
      }
    };
    const orderCreated = yield call(fetchService.request, query);
    if (orderCreated.message === 'Order Created') {
      yield put({ type: M_SET_ORDER_PROCESS_STATUS, created: true });
      yield put({ type: M_RESET_ORDER });
    }
  } catch (e) {
    yield put({ type: M_SET_ORDER_PROCESS_STATUS, created: false });
    console.log('Error while creating order => ', e);
  }
}

export default function* watchOrder() {
  yield takeLatest(U_LOAD_CURRENT_FOOD, loadCurrentFood);
  yield takeLatest(U_LOAD_FOOD_TYPE, loadFoodType);
  yield takeLatest(U_CREATE_ORDER, createOrder);
}
