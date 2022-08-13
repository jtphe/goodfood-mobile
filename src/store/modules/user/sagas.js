import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  U_SIGN_UP,
  M_SET_USER,
  U_SIGN_IN,
  U_LOAD_USER_FAVORITE_RESTAURANT,
  M_UPDATE_USER_FAVORITE_RESTAURANT
} from '@store/modules/user/actions';
import { errorHandler } from '@helpers/errorHandler';
import { showToast } from '@helpers/showToast';
import { getToken, getUser } from '@store/modules/user/selectors';
import i18n from '@i18n/i18n';
import Config from 'react-native-config';
import fetchService from '@api/fetchService';

function* signUp({ payload }) {
  try {
    const query = {
      method: 'post',
      url: `${Config.API_URL}signup`,
      data: {
        email: payload.email,
        password: payload.password,
        confirmedPassword: payload.confirmedPassword
      }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_USER, res });
    showToast(i18n.t('register.success'), true);
    payload.navigation.navigate('Root');
  } catch (e) {
    errorHandler(e.response?.data.message);
    if (e.response) {
      console.log('Error while signing up => ', e.response.data.message);
    }
  }
}

function* signIn({ payload }) {
  try {
    const query = {
      method: 'post',
      url: `${Config.API_URL}signin`,
      data: {
        email: payload.email,
        password: payload.password
      }
    };
    const res = yield call(fetchService.request, query);

    yield put({ type: M_SET_USER, res });
    payload.navigation.navigate('Root');
  } catch (e) {
    errorHandler(e.response?.data?.message);
    if (e.response) {
      console.log('Error while signing in => ', e.response?.data?.message);
    }
  }
}

// Plus nécessaire car plus besoin de l'appeler car restaurant Object et plus id
function* loadUserFavoriteRestaurant() {
  try {
    const token = yield select(getToken);
    const user = yield select(getUser);

    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants/${user.restaurant.id}`,
      headers: {
        token
      }
    };

    const restaurant = yield call(fetchService.request, query);

    yield put({ type: M_UPDATE_USER_FAVORITE_RESTAURANT, restaurant });
  } catch (e) {
    console.log('Error while loading user favorite restaurant => ', e);
  }
}

export default function* watchUser() {
  yield takeLatest(U_SIGN_UP, signUp);
  yield takeLatest(U_SIGN_IN, signIn);
  yield takeLatest(U_LOAD_USER_FAVORITE_RESTAURANT, loadUserFavoriteRestaurant);
}
