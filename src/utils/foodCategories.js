/* eslint-disable global-require */
import i18n from '@i18n/i18n';

const foodCategories = [
  {
    id: 1,
    pictureSrc: require('@images/category_burger.png'),
    name: i18n.t('categories.burger')
  },
  {
    id: 2,
    pictureSrc: require('@images/category_tacos.png'),
    name: i18n.t('categories.tacos')
  },
  {
    id: 3,
    pictureSrc: require('@images/category_pizza.png'),
    name: i18n.t('categories.pizza')
  },
  {
    id: 4,
    pictureSrc: require('@images/category_sandwich.png'),
    name: i18n.t('categories.sandwich')
  }
];

export default foodCategories;
