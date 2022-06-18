import { put, takeLatest } from 'redux-saga/effects';
import { U_LOG_OUT, M_RESET_APP_STORE } from '@store/modules/app/actions';
import { M_RESET_USER_STORE } from '@store/modules/user/actions';

function* logout({ payload }) {
  try {
    const { navigation } = payload;
    yield put({ type: M_RESET_APP_STORE });
    yield put({ type: M_RESET_USER_STORE });
    navigation.popToTop();
  } catch (e) {
    console.log('Error while logging out => ', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_LOG_OUT, logout);
}
