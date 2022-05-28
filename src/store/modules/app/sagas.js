import { put, takeLatest } from 'redux-saga/effects';
import { U_LOG_OUT, M_RESET_APP_STORE } from '@store/modules/app/actions';

function* logout() {
  try {
    yield put({ type: M_RESET_APP_STORE });
  } catch (e) {
    console.log('Error while logging out => ', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_LOG_OUT, logout);
}
