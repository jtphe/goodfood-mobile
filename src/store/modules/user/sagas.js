import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  U_SIGN_UP,
  M_SET_USER,
  U_SIGN_IN,
  U_LOAD_USER_FAVORITE_RESTAURANT,
  M_UPDATE_USER_FAVORITE_RESTAURANT,
  U_UPDATE_USER,
  M_UPDATE_USER,
  U_UPDATE_USER_PASSWORD,
  U_UPDATE_PROFILE_PICTURE,
  M_UPDATE_USER_PICTURE
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

function* updateUser({ payload }) {
  try {
    const token = yield select(getToken);
    const user = yield select(getUser);
    const { firstName, lastName, address, postalCode, city } = payload;
    console.log('payload', payload);
    const query = {
      method: 'put',
      url: `${Config.API_URL}users/${user.id}`,
      headers: {
        token
      },
      data: {
        firstName: firstName !== undefined ? firstName : null,
        lastName: lastName !== undefined ? lastName : null,
        address: address !== undefined ? address : null,
        postalCode: postalCode !== undefined ? postalCode : null,
        city: city !== undefined ? city : null
      }
    };
    const res = yield call(fetchService.request, query);
    if (res) {
      yield put({
        type: M_UPDATE_USER,
        address: res.address,
        postalCode: res.postalcode,
        city: res.city,
        firstName: res.firstname,
        lastName: res.lastname
      });

      showToast(i18n.t('accountPage.userUpdated'), true);
    }
  } catch (e) {
    console.log('Error while updating user =>  :>> ', e);
  }
}

function* updateUserPassword({ payload }) {
  try {
    const token = yield select(getToken);
    const { oldPassword, newPassword } = payload;
    const query = {
      method: 'put',
      url: `${Config.API_URL}changepassword`,
      headers: {
        token
      },
      data: {
        oldPassword,
        newPassword
      }
    };

    const res = yield call(fetchService.request, query);
    if (res.status === 200) {
      showToast(i18n.t('accountPage.userUpdated'), true);
    }
  } catch (e) {
    console.log('Error while updating user password => ', e);
  }
}

function* updateUserPicture({ payload }) {
  try {
    const token = yield select(getToken);
    const user = yield select(getUser);
    const { pictureUrl } = payload;

    const query = {
      method: 'put',
      url: `${Config.API_URL}users/${user.id}`,
      headers: {
        token
      },
      data: {
        picture: pictureUrl
      }
    };
    const res = yield call(fetchService.request, query);

    if (res) {
      yield put({ type: M_UPDATE_USER_PICTURE, picture: res.picture });
    }
  } catch (e) {
    console.log('Error while updating user picture => ', e);
  }
}

export default function* watchUser() {
  yield takeLatest(U_UPDATE_USER, updateUser);
  yield takeLatest(U_SIGN_UP, signUp);
  yield takeLatest(U_SIGN_IN, signIn);
  yield takeLatest(U_LOAD_USER_FAVORITE_RESTAURANT, loadUserFavoriteRestaurant);
  yield takeLatest(U_UPDATE_USER_PASSWORD, updateUserPassword);
  yield takeLatest(U_UPDATE_PROFILE_PICTURE, updateUserPicture);
}
