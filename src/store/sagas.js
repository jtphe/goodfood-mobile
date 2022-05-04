import { fork, all } from 'redux-saga/effects';
import watchApp from '@store/modules/app/sagas';

export default function* rootSaga() {
  yield all([fork(watchApp)]);
}
