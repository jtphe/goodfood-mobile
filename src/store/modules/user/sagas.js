import { takeLatest, call, put } from 'redux-saga/effects';
import { U_SIGN_UP, M_SET_USER, U_SIGN_IN } from '@store/modules/user/actions';
import { errorHandler } from '@helpers/errorHandler';
import { showToast } from '@helpers/showToast';
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
    showToast(i18n.t('register.success'));
    payload.navigation.navigate('Root');
  } catch (e) {
    errorHandler(e.response.data.message);
    console.log('Error while signing up => ', e.response.data.message);
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
    console.log('res', res);
    yield put({ type: M_SET_USER, res });
    payload.navigation.navigate('Root');
  } catch (e) {
    errorHandler(e.response.data.message);
    console.log('Error while signing up => ', e.response.data.message);
  }
}

export default function* watchUser() {
  yield takeLatest(U_SIGN_UP, signUp);
  yield takeLatest(U_SIGN_IN, signIn);
}
