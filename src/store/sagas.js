import { fork, all } from 'redux-saga/effects';
import watchApp from '@store/modules/app/sagas';
import watchUser from '@store/modules/user/sagas';
import watchRestaurant from '@store/modules/restaurant/sagas';
import watchOrder from '@store/modules/order/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchApp),
    fork(watchUser),
    fork(watchRestaurant),
    fork(watchOrder)
  ]);
}
