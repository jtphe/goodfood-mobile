import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  U_LOAD_RESTAURANTS,
  M_SET_RESTAURANTS,
  U_LOAD_COMMENTS,
  M_SET_COMMENTS,
  U_SET_FAVORITE_RESTAURANT
} from '@store/modules/restaurant/actions';
import { getToken } from '@store/modules/user/selectors';
import Config from 'react-native-config';
import fetchService from '@api/fetchService';

function* loadRestaurants() {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants`,
      headers: {
        token
      }
    };
    const restaurants = yield call(fetchService.request, query);
    yield put({ type: M_SET_RESTAURANTS, restaurants });
  } catch (e) {
    console.log('Error while loading restaurants => ', e);
  }
}

function* loadComments({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants/${payload.id}/comments`,
      headers: {
        token
      }
    };
    const comments = yield call(fetchService.request, query);

    yield put({ type: M_SET_COMMENTS, comments });
  } catch (e) {
    console.log('Error while loading comments => ', e);
  }
}

function* setFavoriteRestaurant({ payload }) {
  try {
  } catch (e) {
    console.log('Error while setting favorite restaurant => ', e);
  }
}

export default function* watchRestaurant() {
  yield takeLatest(U_LOAD_RESTAURANTS, loadRestaurants);
  yield takeLatest(U_LOAD_COMMENTS, loadComments);
  yield takeLatest(U_SET_FAVORITE_RESTAURANT, setFavoriteRestaurant);
}
