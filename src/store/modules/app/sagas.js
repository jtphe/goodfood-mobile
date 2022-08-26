import { put, takeLatest } from 'redux-saga/effects';
import { U_LOG_OUT, M_RESET_APP_STORE } from '@store/modules/app/actions';
import { M_RESET_USER_STORE } from '@store/modules/user/actions';
import { M_RESET_RESTAURANT_STORE } from '@store/modules/restaurant/actions';
import { M_RESET_ORDER_STORE } from '@store/modules/order/actions';

function* logout({ payload }) {
  try {
    const { navigation } = payload;
    yield put({ type: M_RESET_APP_STORE });
    yield put({ type: M_RESET_USER_STORE });
    yield put({ type: M_RESET_RESTAURANT_STORE });
    yield put({ type: M_RESET_ORDER_STORE });
    navigation.popToTop();
  } catch (e) {
    console.log('Error while logging out => ', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_LOG_OUT, logout);
}
