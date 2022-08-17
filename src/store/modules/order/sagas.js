import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  U_LOAD_CURRENT_FOOD,
  M_SET_CURRENT_FOODS,
  M_UPDATE_ORDER_STEP,
  U_LOAD_FOOD_TYPE,
  U_CREATE_ORDER
} from '@store/modules/order/actions';
import {
  getToken,
  getUserFavoriteRestaurant
} from '@store/modules/user/selectors';
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
    const query = {
      method: 'get',
      url: `${Config.API_URL}order/`,
      headers: {
        token
      }
    };
    const foods = yield call(fetchService.request, query);
  } catch (e) {
    console.log('Error while creating order => ', e);
  }
}

export default function* watchOrder() {
  yield takeLatest(U_LOAD_CURRENT_FOOD, loadCurrentFood);
  yield takeLatest(U_LOAD_FOOD_TYPE, loadFoodType);
  yield takeLatest(U_CREATE_ORDER, createOrder);
}
