/* eslint-disable default-param-last */
import { M_RESET_ORDER_STORE } from '@store/modules/app/actions';
import {
  M_SET_CURRENT_FOODS,
  M_UPDATE_ORDER_STEP,
  M_ADD_MENU_TO_CART,
  M_ADD_PRODUCT_TO_CART,
  M_REMOVE_LAST_ITEM_CART,
  M_UPDATE_PRODUCT_LIST,
  M_REMOVE_MENU,
  M_SET_ORDER_PROCESS_STATUS,
  M_RESET_ORDER,
  M_UPDATE_PROCESS_STATUS,
  M_SET_USER_ORDERS,
  M_ADD_ORDER_TO_ORDERS
} from '@store/modules/order/actions';
import update from 'immutability-helper';
import { roundToTwo } from '@helpers/roundToTwo';

const initialState = {
  menuOrderStep: 1,
  currentFoods: null,
  menuList: [],
  productList: [],
  cartTotalPrice: 0,
  processStatus: {
    created: false
  },
  orders: [],
  ordersIsLoading: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_ADD_ORDER_TO_ORDERS:
      return update(state, {
        orders: {
          $push: [action.orderCreated]
        }
      });
    case M_SET_USER_ORDERS:
      return update(state, {
        orders: {
          $set: action.orders
        },
        ordersIsLoading: {
          $set: false
        }
      });
    case M_UPDATE_PROCESS_STATUS: {
      return update(state, {
        processStatus: {
          created: {
            $set: action.payload.created
          }
        }
      });
    }
    case M_RESET_ORDER: {
      return update(state, {
        menuList: {
          $set: []
        },
        productList: {
          $set: []
        },
        cartTotalPrice: {
          $set: 0
        }
      });
    }
    case M_SET_ORDER_PROCESS_STATUS: {
      return update(state, {
        processStatus: {
          created: {
            $set: action.created
          }
        }
      });
    }
    case M_REMOVE_MENU: {
      const menuIndex = state.menuList.findIndex(
        (menu) => menu.id === action.payload.menu.id
      );
      return update(state, {
        menuList: {
          $splice: [[menuIndex, 1]]
        },
        cartTotalPrice: {
          $set: roundToTwo(state.cartTotalPrice - action.payload.menu.price)
        }
      });
    }
    case M_UPDATE_PRODUCT_LIST: {
      const productIndex = state.productList.findIndex(
        (product) => product.id === action.payload.item.id
      );
      if (action.payload.type === 'add') {
        return update(state, {
          productList: {
            [productIndex]: {
              quantity: {
                $set: state.productList[productIndex].quantity + 1
              },
              totalPrice: {
                $set: roundToTwo(
                  state.productList[productIndex].totalPrice +
                    action.payload.item.price
                )
              }
            }
          },
          cartTotalPrice: {
            $set: roundToTwo(state.cartTotalPrice + action.payload.item.price)
          }
        });
      } else {
        return update(state, {
          productList: {
            [productIndex]: {
              quantity: {
                $set: state.productList[productIndex].quantity - 1
              },
              totalPrice: {
                $set: roundToTwo(
                  state.productList[productIndex].totalPrice -
                    action.payload.item.price
                )
              }
            }
          },
          cartTotalPrice: {
            $set: roundToTwo(state.cartTotalPrice - action.payload.item.price)
          }
        });
      }
    }
    case M_REMOVE_LAST_ITEM_CART: {
      const indexToRemove = state.productList.findIndex(
        (product) => product.id === action.payload.product.id
      );
      return update(state, {
        productList: {
          $splice: [[indexToRemove, 1]]
        },
        cartTotalPrice: {
          $set: state.cartTotalPrice - action.payload.price
        }
      });
    }
    case M_ADD_PRODUCT_TO_CART:
      return update(state, {
        productList: {
          $push: [action.payload]
        },
        cartTotalPrice: {
          $set: roundToTwo(state.cartTotalPrice + action.payload.totalPrice)
        }
      });
    case M_ADD_MENU_TO_CART: {
      const menu = { ...action.payload.menu };
      menu.id = state.menuList.length + 1;
      return update(state, {
        menuList: {
          $push: [menu]
        },
        cartTotalPrice: {
          $set: roundToTwo(state.cartTotalPrice + action.payload.menu.price)
        }
      });
    }
    case M_UPDATE_ORDER_STEP:
      return update(state, {
        menuOrderStep: {
          $set: action.step
        }
      });
    case M_SET_CURRENT_FOODS:
      return update(state, {
        currentFoods: {
          $set: action.foods
        }
      });
    case M_RESET_ORDER_STORE:
      return initialState;
    default:
      return state;
  }
}
