import { createSelector } from 'reselect';

export const getMenuOrderStep = (state) => state.order.menuOrderStep;
export const getCurrentFoods = (state) => state.order.currentFoods;
export const getMenuList = (state) => state.order.menuList;
export const getProductList = (state) => state.order.productList;
export const getCartTotalPrice = (state) => state.order.cartTotalPrice;
export const getProcessStatus = (state) => state.order.processStatus.created;
export const getOrders = (state) => state.order.orders.reverse();
export const getOrdersIsLoading = (state) => state.order.ordersIsLoading;
export const getOrderIsLoading = (state) => state.order.orderIsLoading;
export const getOrderLoaded = (state) => state.order.orderLoaded;
export const getOrderIsCreating = (state) => state.order.orderIsCreating;
export const getCart = createSelector(
  [getMenuList, getProductList],
  (menuList, productList) => {
    return menuList.concat(productList);
  }
);
