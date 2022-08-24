/* eslint-disable default-param-last */
import update from 'immutability-helper';
import {
  M_RESET_USER_STORE,
  M_SET_USER,
  M_UPDATE_USER_FAVORITE_RESTAURANT,
  M_UPDATE_USER,
  M_UPDATE_USER_PICTURE
} from '@store/modules/user/actions';

const initialState = {
  user: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_UPDATE_USER_PICTURE:
      return update(state, {
        user: {
          picture: {
            $set: action.picture
          }
        }
      });
    case M_UPDATE_USER:
      return update(state, {
        user: {
          address: {
            $set: action.address
          },
          postalCode: {
            $set: action.postalCode
          },
          city: {
            $set: action.city
          },
          firstname: {
            $set: action.firstName
          },
          lastname: {
            $set: action.lastName
          }
        }
      });
    case M_UPDATE_USER_FAVORITE_RESTAURANT:
      return update(state, {
        user: {
          restaurant: {
            $set: action.restaurant
          }
        }
      });
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
