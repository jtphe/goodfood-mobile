/* eslint-disable no-useless-return */
/* eslint-disable global-require */
import React, { useState } from 'react';
import InputFields from '@components/Profile/inputFields';
import DialogLogout from '@components/Profile/dialogLogout';
import i18n from 'i18n-js';
import ImageCropPicker from 'react-native-image-crop-picker';
import { logout } from '@store/modules/app/actions';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '@config/index';
import { Button } from 'react-native-paper';
import { useDispatch, connect } from 'react-redux';
import {
  requestIOSCameraPermission,
  requestAndroidCameraPermission
} from '@helpers/files-utils';
import { createSelector } from 'reselect';
import { getUser } from '@store/modules/user/selectors';

const mapStateToProps = createSelector([getUser], (user) => {
  return { user };
});

const Profile = ({ navigation, user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const _updateProfilePicture = async () => {
    if (canAccessCamera()) {
      _openCamera();
    }
  };

  const canAccessCamera = async () => {
    if (Platform.OS === 'ios') {
      if (await !requestIOSCameraPermission()) return;
    } else {
      let canOpenCamera;
      await requestAndroidCameraPermission().then((res) => {
        canOpenCamera = res;
      });
      if (!canOpenCamera) return;
    }
  };

  const _openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true
    }).then((image) => {
      const picture = {
        uri: image.path,
        fileName: image.filename,
        type: image.mime,
        fileSize: image.size
      };
      console.log('picture =>', picture);
      // dispatch(updateProfilePicture({ payload: camPicture }));
    });
  };

  const _openPasswordEditModal = () => {
    navigation.navigate(i18n.t('accountPage.passwordEditScreenTitle'));
  };

  const _logout = () => {
    const payload = {
      navigation
    };
    dispatch(logout({ payload }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>
          {user.firstname} {user.lastname}
        </Text>
        <TouchableOpacity onPress={() => _updateProfilePicture()}>
          <Image
            source={require('@images/goodfood_logo_G.png')}
            style={styles.orderPicture}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerPersonalInfo}>
        <View style={styles.containerPersonalInfosTitle}>
          <Text style={styles.personalInfoTitle}>
            {i18n.t('accountPage.personalInfoTitle')}
          </Text>
        </View>
        <View>
          <InputFields
            firstname={user.firstname}
            lastname={user.lastname}
            address={user.address}
          />
        </View>
      </View>
      <View style={styles.containerConnectionInfo}>
        <View style={styles.containerPersonalInfosTitle}>
          <Text style={styles.personalInfoTitle}>
            {i18n.t('accountPage.connectionInfoTitle')}
          </Text>
          <TouchableOpacity
            style={styles.containerEdition}
            onPress={() => _openPasswordEditModal()}
          >
            <Text>{i18n.t('accountPage.edit')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerConnectionRow}>
          <Text style={styles.titleConnectionInfo}>
            {i18n.t('accountPage.email')}
          </Text>
          <Text>{user.email}</Text>
        </View>
        <View style={styles.containerConnectionRow}>
          <Text style={styles.titleConnectionInfo}>
            {i18n.t('accountPage.password')}
          </Text>
          <Text>************</Text>
        </View>
      </View>
      <Button
        mode="contained"
        color={colors.RED}
        uppercase={false}
        onPress={() => setVisible(true)}
        style={styles.btnLogout}
      >
        {i18n.t('accountPage.logout')}
      </Button>
      <DialogLogout
        visible={visible}
        setVisible={(value) => setVisible(value)}
        logout={() => _logout()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    ...ifIphoneX({ paddingTop: calcHeight(7) }, { paddingTop: calcHeight(3) }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.BEIGE,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  orderPicture: {
    width: 85,
    height: 85,
    borderRadius: 46,
    borderWidth: 4,
    borderColor: colors.YELLOW
  },
  userName: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 24
  },
  containerPersonalInfosTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 8,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  personalInfoTitle: { fontWeight: 'bold', fontSize: 14 },
  containerPersonalInfo: { marginBottom: 8 },
  containerConnectionInfo: {},
  containerConnectionRow: {
    paddingLeft: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  titleConnectionInfo: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  containerEdition: { marginRight: 12 },
  btnLogout: { width: 200, marginTop: 32, alignSelf: 'center' }
});

export default connect(mapStateToProps)(Profile);
