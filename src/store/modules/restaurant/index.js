/* eslint-disable default-param-last */
import update from 'immutability-helper';
import {
  M_RESET_RESTAURANT_STORE,
  M_SET_RESTAURANTS,
  M_SET_COMMENTS,
  M_SET_CURRENT_RESTAURANT
} from '@store/modules/restaurant/actions';

const initialState = {
  restaurants: [],
  currentRestaurant: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_SET_COMMENTS: {
      return update(state, {
        currentRestaurant: {
          comments: {
            $set: action.comments
          }
        }
      });
    }
    case M_SET_CURRENT_RESTAURANT:
      return update(state, {
        currentRestaurant: {
          $set: action.payload.restaurant
        }
      });
    case M_SET_RESTAURANTS:
      return update(state, {
        restaurants: {
          $set: action.restaurants
        }
      });
    case M_RESET_RESTAURANT_STORE:
      return initialState;
    default:
      return state;
  }
}
