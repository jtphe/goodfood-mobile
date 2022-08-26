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
export const U_CREATE_ORDER = 'U_CREATE_ORDER';
export const M_SET_ORDER_PROCESS_STATUS = 'M_SET_ORDER_PROCESS_STATUS';
export const M_RESET_ORDER = 'M_RESET_ORDER';
export const M_UPDATE_PROCESS_STATUS = 'M_UPDATE_PROCESS_STATUS';
export const U_LOAD_USER_ORDERS = 'U_LOAD_USER_ORDERS';
export const M_SET_USER_ORDERS = 'M_SET_USER_ORDERS';
export const M_ADD_ORDER_TO_ORDERS = 'M_ADD_ORDER_TO_ORDERS';
export const U_LOAD_ORDER = 'U_LOAD_ORDER';
export const M_SET_ORDER = 'M_SET_ORDER';
export const M_SET_ORDER_IS_CREATING = 'M_SET_ORDER_IS_CREATING';

export const loadOrder = ({ payload }) => ({
  type: U_LOAD_ORDER,
  payload
});

export const loadUserOrders = () => ({
  type: U_LOAD_USER_ORDERS
});

export const cancelOrder = () => ({
  type: M_RESET_ORDER
});

export const updateProcessStatus = ({ payload }) => ({
  type: M_UPDATE_PROCESS_STATUS,
  payload
});

export const createOrder = () => ({
  type: U_CREATE_ORDER
});

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
