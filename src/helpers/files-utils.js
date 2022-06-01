import { Alert, Linking, PermissionsAndroid } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import i18n from '@i18n/i18n';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs';

export const requestIOSCameraPermission = async () => {
  check(PERMISSIONS.IOS.CAMERA).then((result) => {
    switch (result) {
      case RESULTS.BLOCKED:
        Alert.alert(i18n.t('camera.needCameraPermissions'), '', [
          {
            text: i18n.t('button.cancel'),
            style: 'cancel'
          },
          {
            text: i18n.t('camera.goToSettings'),
            onPress: () => Linking.openURL('app-settings:')
          }
        ]);
        return false;
      case RESULTS.DENIED:
        request(PERMISSIONS.IOS.CAMERA).then((res) => {
          if (res === 'granted') {
            return true;
          }
        });
        break;
      case RESULTS.UNAVAILABLE:
        Alert.alert(i18n.t('camera.needCameraPermissions'), '', [
          {
            text: i18n.t('button.cancel'),
            style: 'cancel'
          },
          {
            text: i18n.t('camera.goToSettings'),
            onPress: () => Linking.openURL('app-settings:')
          }
        ]);
        return false;
      case RESULTS.GRANTED:
        console.log('oui');
        return true;
      default:
        return false;
    }
  });
};

export const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert('', i18n.t('camera.needCameraPermissionsAndroid'), [
        {
          text: i18n.t('button.ok')
        },
        {
          text: i18n.t('camera.goToSettings'),
          onPress: () => Linking.openSettings()
        }
      ]);
      return false;
    }
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
};
