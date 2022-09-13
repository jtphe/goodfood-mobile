import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  U_LOAD_CURRENT_FOOD,
  M_SET_CURRENT_FOODS,
  M_UPDATE_ORDER_STEP,
  U_LOAD_FOOD_TYPE,
  U_CREATE_ORDER,
  M_SET_ORDER_PROCESS_STATUS,
  M_RESET_ORDER,
  U_LOAD_USER_ORDERS,
  M_SET_USER_ORDERS,
  M_ADD_ORDER_TO_ORDERS,
  U_LOAD_ORDER,
  M_SET_ORDER,
  M_SET_ORDER_IS_CREATING
} from '@store/modules/order/actions';
import {
  getToken,
  getUserFavoriteRestaurant,
  getUser
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
    const user = yield select(getUser);
    const menuList = yield select(getMenuList);
    const productList = yield select(getProductList);
    const restaurant = yield select(getUserFavoriteRestaurant);
    const currentRestaurant = yield select(getCurrentRestaurant);
    const price = yield select(getCartTotalPrice);
    const restaurantId = currentRestaurant
      ? currentRestaurant.id
      : restaurant.id;
    const isHomeDelivery = !currentRestaurant;

    yield put({ type: M_SET_ORDER_IS_CREATING, value: true });

    const query = {
      method: 'post',
      url: `${Config.API_URL}restaurants/${restaurantId}/orders`,
      headers: {
        token
      },
      data: {
        address: !isHomeDelivery ? currentRestaurant.address : user.address,
        postalCode: !isHomeDelivery
          ? currentRestaurant.postalcode
          : user.postalcode,
        city: !isHomeDelivery ? currentRestaurant.city : user.city,
        products: productList,
        menus: menuList,
        price,
        type: isHomeDelivery ? 1 : 2,
        payment: 'Paid'
      }
    };

    const orderCreated = yield call(fetchService.request, query);

    if (orderCreated) {
      yield put({ type: M_SET_ORDER_PROCESS_STATUS, created: true });
      yield put({ type: M_RESET_ORDER });
      yield put({ type: M_ADD_ORDER_TO_ORDERS, orderCreated });
      yield put({ type: M_SET_ORDER_IS_CREATING, value: false });
    }
  } catch (e) {
    yield put({ type: M_SET_ORDER_PROCESS_STATUS, created: false });
    console.log('Error while creating order => ', e);
  }
}

function* loadUserOrders() {
  try {
    const token = yield select(getToken);
    const user = yield select(getUser);

    const query = {
      method: 'get',
      url: `${Config.API_URL}users/${user.id}/orders`,
      headers: {
        token
      }
    };
    const orders = yield call(fetchService.request, query);

    yield put({
      type: M_SET_USER_ORDERS,
      orders: orders
        .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
        .reverse()
    });
  } catch (e) {
    console.log('Error while loading user orders => ', e);
  }
}

function* loadOrder({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}orders/${payload.orderId}`,
      headers: {
        token
      }
    };
    const order = yield call(fetchService.request, query);

    yield put({ type: M_SET_ORDER, order });
  } catch (e) {
    console.log('Error while loading order => ', e);
  }
}

export default function* watchOrder() {
  yield takeLatest(U_LOAD_USER_ORDERS, loadUserOrders);
  yield takeLatest(U_LOAD_CURRENT_FOOD, loadCurrentFood);
  yield takeLatest(U_LOAD_FOOD_TYPE, loadFoodType);
  yield takeLatest(U_CREATE_ORDER, createOrder);
  yield takeLatest(U_LOAD_ORDER, loadOrder);
}
