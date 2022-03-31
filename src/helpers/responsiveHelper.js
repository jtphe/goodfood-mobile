/* eslint-disable import/prefer-default-export */
import { Dimensions } from 'react-native';

export const calcHeight = (percentageOfDeviceToTake, maxValue) => {
  const screenHeight = Dimensions.get('window').height;
  const result = Math.round((screenHeight * percentageOfDeviceToTake) / 100);
  return maxValue && result > maxValue ? maxValue : result;
};
