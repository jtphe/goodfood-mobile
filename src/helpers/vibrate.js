import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { vibrationOptions } from '@config/';

export const vibrate = () => {
  ReactNativeHapticFeedback.trigger('impactHeavy', vibrationOptions);
};

export default vibrate;
