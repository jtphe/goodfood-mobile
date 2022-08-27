import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { colors } from '@config/';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addComment } from '@store/modules/restaurant/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import i18n from '@i18n/i18n';

const AddComment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [starCount, setStartCount] = useState(0);

  const _addComment = () => {
    const payload = {
      description: comment,
      rating: starCount > 0 ? starCount : null
    };
    dispatch(addComment({ payload }));
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.iconClose}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={26} />
          </Pressable>
          <Text style={styles.titleHeader}>
            {i18n.t('restaurant.addComment').toUpperCase()}
          </Text>
        </View>
        <View style={styles.containerPage}>
          <Text style={styles.title}>{i18n.t('restaurant.addRating')}</Text>
          <StarRating
            maxStars={5}
            rating={starCount}
            emptyStar="star-border"
            emptyStarColor={colors.YELLOW}
            fullStar="star"
            fullStarColor={colors.YELLOW}
            iconSet="MaterialIcons"
            starSize={35}
            containerStyle={styles.containerStars}
            selectedStar={(rating) => setStartCount(rating)}
          />
          <Text style={styles.title}>{i18n.t('restaurant.addComment')}</Text>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={(c) => setComment(c)}
            value={comment}
            placeholder={i18n.t('restaurant.addCommentPlaceholder')}
            onEndEditing={() => Keyboard.dismiss()}
          />

          <View style={styles.footer}>
            <Button
              mode="outlined"
              color={colors.RED}
              borderColor={colors.RED}
              onPress={() => navigation.goBack()}
              contentStyle={styles.btnContentStyle}
              style={styles.btnCancel}
            >
              {i18n.t('button.cancel')}
            </Button>
            <Button
              mode="contained"
              color={colors.GREEN}
              onPress={() => _addComment()}
              contentStyle={styles.btnContentStyle}
            >
              {i18n.t('button.add')}
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24
  },
  btnCancel: { borderColor: colors.RED },
  btnContentStyle: { height: 45 },
  containerPage: {
    paddingHorizontal: 24,
    marginTop: 18
  },
  title: { fontSize: 16, fontWeight: '500', marginBottom: 12 },
  containerStars: {
    width: 150,
    marginBottom: 32
  },
  input: {
    textAlignVertical: 'top',
    height: 250,
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: colors.YELLOW,
    padding: 10,
    paddingTop: 14,
    fontSize: 14
  },
  container: { flex: 1 },
  titleHeader: {
    flex: 2,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 60
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  iconClose: { flex: 1, marginLeft: 22 }
});

export default AddComment;
