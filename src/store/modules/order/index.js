/* eslint-disable default-param-last */
import { M_RESET_ORDER_STORE } from '@store/modules/app/actions';

const initialState = {
  menuOrderStep: 1
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_RESET_ORDER_STORE:
      return initialState;
    default:
      return state;
  }
}
