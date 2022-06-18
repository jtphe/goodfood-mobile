/* eslint-disable default-param-last */
import update from 'immutability-helper';
import { M_RESET_USER_STORE, M_SET_USER } from '@store/modules/user/actions';

const initialState = {
  user: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_USER:
      return update(state, {
        user: {
          $set: action.res.user
        },
        token: {
          $set: action.res.token
        }
      });
    case M_RESET_USER_STORE:
      return initialState;
    default:
      return state;
  }
}
