export const M_RESET_ORDER_STORE = 'M_RESET_ORDER_STORE';
export const U_LOAD_CURRENT_FOOD = 'U_LOAD_CURRENT_FOOD';
export const M_SET_CURRENT_FOODS = 'M_SET_CURRENT_FOODS';
export const M_UPDATE_ORDER_STEP = 'M_UPDATE_ORDER_STEP';
export const M_ADD_MENU_TO_CART = 'M_ADD_MENU_TO_CART';
export const U_LOAD_FOOD_TYPE = 'U_LOAD_FOOD_TYPE';
export const M_ADD_PRODUCT_TO_CART = 'M_ADD_PRODUCT_TO_CART';
export const M_REMOVE_LAST_ITEM_CART = 'M_REMOVE_LAST_ITEM_CART';
export const M_UPDATE_PRODUCT_LIST = 'M_UPDATE_PRODUCT_LIST';
export const M_REMOVE_MENU = 'M_REMOVE_MENU';

export const removeMenu = ({ payload }) => ({
  type: M_REMOVE_MENU,
  payload
});

export const updateProductList = ({ payload }) => ({
  type: M_UPDATE_PRODUCT_LIST,
  payload
});

export const removeLastItemCart = ({ payload }) => ({
  type: M_REMOVE_LAST_ITEM_CART,
  payload
});

export const addProductToCart = ({ payload }) => ({
  type: M_ADD_PRODUCT_TO_CART,
  payload
});

export const loadFoodType = ({ payload }) => ({
  type: U_LOAD_FOOD_TYPE,
  payload
});

export const loadCurrentFood = ({ payload }) => ({
  type: U_LOAD_CURRENT_FOOD,
  payload
});

export const addMenuToCart = ({ payload }) => ({
  type: M_ADD_MENU_TO_CART,
  payload
});