/* eslint-disable import/prefer-default-export */
import Toast from 'react-native-root-toast';

/**
 * Show a toast message
 * @param {string} content - The message to display
 * @param {boolean} long - True for long else short
 */
export const showToast = (content, long) => {
  if (long) {
    Toast.show(content, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP + 30,
      shadow: false,
      opacity: 1
    });
  } else {
    Toast.show(content, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP + 30,
      shadow: false,
      opacity: 1
    });
  }
};
