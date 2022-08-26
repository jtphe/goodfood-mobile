import i18n from '@i18n/i18n';

const foodCategories = [
  {
    id: 1,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_burger.png',
    name: i18n.t('categories.burger')
  },
  {
    id: 2,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_tacos.png',
    name: i18n.t('categories.tacos')
  },
  {
    id: 3,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_pizza.png',
    name: i18n.t('categories.pizza')
  },
  {
    id: 4,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_sandwich.png',
    name: i18n.t('categories.sandwich')
  },
  {
    id: 5,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_menu.png',
    name: i18n.t('categories.menu')
  },
  {
    id: 6,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_snacks.png',
    name: i18n.t('categories.snacks')
  },
  {
    id: 7,
    pictureSrc:
      'https://goodfood-s3.s3.eu-west-3.amazonaws.com/category_drink.png',
    name: i18n.t('categories.drink')
  }
];

export default foodCategories;
