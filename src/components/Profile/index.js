/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import InputFields from '@components/Profile/inputFields';
import DialogLogout from '@components/Profile/dialogLogout';
import i18n from '@i18n/i18n';
import FastImage from 'react-native-fast-image';
import CartBanner from '@shared/cartBanner';
import { launchImageLibrary } from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { logout } from '@store/modules/app/actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { calcHeight } from '@helpers/responsiveHelper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { avatarUrl, awsConfig, colors } from '@config/index';
import { Button } from 'react-native-paper';
import { useDispatch, connect } from 'react-redux';
import {
  requestIOSCameraPermission,
  requestAndroidCameraPermission
} from '@helpers/files-utils';
import { createSelector } from 'reselect';
import { getUser } from '@store/modules/user/selectors';
import { updateProfilePicture } from '@store/modules/user/actions';

const mapStateToProps = createSelector([getUser], (user) => {
  return { user };
});

const Profile = ({ navigation, user }) => {
  const [visible, setVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    launchImageLibrary({}).then((image) => {
      const imageSelected = image.assets[0];
      const file = {
        uri: imageSelected.uri,
        name: imageSelected.fileName,
        type: imageSelected.type
      };
      // const params = {
      //   Bucket: 'STRING_VALUE' /* required */,
      //   Key: 'STRING_VALUE' /* required */,
      //   BypassGovernanceRetention: true || false,
      //   ExpectedBucketOwner: 'STRING_VALUE',
      //   MFA: 'STRING_VALUE',
      //   RequestPayer: requester,
      //   VersionId: 'STRING_VALUE'
      // };
      // s3.deleteObject(params, function (err, data) {
      //   if (err) console.log(err, err.stack); // an error occurred
      //   else console.log(data); // successful response
      // });
      RNS3.put(file, awsConfig)
        .then((response) => {
          const payload = { pictureUrl: response.body.postResponse.location };
          dispatch(updateProfilePicture({ payload }));
        })
        .progress((e) => {
          if (e.percent !== 1) {
            setIsUploading(true);
          }
          if (e.percent === 1) {
            setIsUploading(false);
          }
        });
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

  const _openFavoriteRestaurantModal = () => {
    navigation.navigate(i18n.t('restaurant.list'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>
          {user.firstname} {user.lastname}
        </Text>
        <TouchableOpacity onPress={() => _updateProfilePicture()}>
          {!isUploading ? (
            <FastImage
              source={{
                uri: user.picture ? user.picture : avatarUrl,
                priority: FastImage.priority.high
              }}
              style={styles.orderPicture}
            />
          ) : (
            <View style={[styles.orderPicture, styles.loader]}>
              <ActivityIndicator size="large" color={colors.YELLOW} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>
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
              postalCode={user.postalcode}
              city={user.city}
            />
          </View>
        </View>
        <View style={styles.containerPersonalInfo}>
          <View style={styles.containerPersonalInfosTitle}>
            <Text style={styles.personalInfoTitle}>
              {i18n.t('accountPage.favoriteRestaurant')}
            </Text>
          </View>
          <View style={styles.containerConnectionRow}>
            <TouchableOpacity onPress={() => _openFavoriteRestaurantModal()}>
              <Text style={styles.updateFavoriteRestaurant}>
                {i18n.t('accountPage.updateFavoriteRestaurant')}
              </Text>
            </TouchableOpacity>
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
      </ScrollView>
      <CartBanner />
      <DialogLogout
        visible={visible}
        setVisible={(value) => setVisible(value)}
        logout={() => _logout()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    paddingTop: 2
  },
  updateFavoriteRestaurant: { fontWeight: '500' },
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
  btnLogout: {
    width: 200,
    marginTop: 32,
    alignSelf: 'center',
    marginBottom: 100
  }
});

export default connect(mapStateToProps)(Profile);
