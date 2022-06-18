import { showToast } from '@helpers/showToast';
import i18n from '@i18n/i18n';

/* eslint-disable import/prefer-default-export */
export const errorHandler = (error) => {
  switch (error) {
    case 'Password length':
      showToast(i18n.t('error.passwordTooShort'), true);
      break;
    case 'Account already exists':
      showToast(i18n.t('error.accountAlreadyExists'), true);
      break;
    default:
      showToast(i18n.t('error.default'), true);
  }
};
