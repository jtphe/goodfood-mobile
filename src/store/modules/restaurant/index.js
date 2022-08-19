/* eslint-disable default-param-last */
import update from 'immutability-helper';
import {
  M_RESET_RESTAURANT_STORE,
  M_SET_RESTAURANTS,
  M_SET_COMMENTS,
  M_SET_CURRENT_RESTAURANT,
  M_ADD_COMMENT,
  M_DELETE_COMMENT,
  M_RESET_CURRENT_RESTAURANT
} from '@store/modules/restaurant/actions';

const initialState = {
  restaurants: [],
  currentRestaurant: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_RESET_CURRENT_RESTAURANT:
      return update(state, {
        currentRestaurant: {
          $set: null
        }
      });
    case M_DELETE_COMMENT: {
      const index = state.currentRestaurant.comments?.findIndex(
        (comment) => comment.id === action.id
      );
      return update(state, {
        currentRestaurant: {
          comments: {
            $splice: [[index, 1]]
          },
          avgRating: {
            $set: action.avg
          }
        }
      });
    }
    case M_ADD_COMMENT:
      return update(state, {
        currentRestaurant: {
          comments: {
            $push: [action.comment]
          },
          avgRating: {
            $set: action.comment.avgRating
          }
        }
      });

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
