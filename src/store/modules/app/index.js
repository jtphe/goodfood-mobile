import update from 'immutability-helper';
import { M_UPDATE_NETWORK_STATE } from '@store/modules/app/actions';

const initialState = {
  name: 'goodfood-mobile',
  socket: null,
  networkState: 'connected'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_UPDATE_NETWORK_STATE:
      return update(state, {
        networkState: {
          $set: action.payload.connectionState
        }
      });
    default:
      return state;
  }
}
