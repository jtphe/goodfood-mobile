import { createSelector } from 'reselect';

export const getMenuOrderStep = (state) => state.order.menuOrderStep;
export const getCurrentFoods = (state) => state.order.currentFoods;
export const getMenuList = (state) => state.order.menuList;
export const getProductList = (state) => state.order.productList;
export const getCartTotalPrice = (state) => state.order.cartTotalPrice;
export const getProcessStatus = (state) => state.order.processStatus.created;
export const getCart = createSelector(
  [getMenuList, getProductList],
  (menuList, productList) => {
    return menuList.concat(productList);
  }
);
