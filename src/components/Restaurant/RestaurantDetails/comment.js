import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@config/';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

const Comment = ({ comment, deleteComment, user }) => {
  const canDeleteComment = useMemo(() => {
    return comment.user.id === user.id;
  }, [user, comment]);

  const link = 'https://s3.eu-west-3.amazonaws.com/atolia-assets/avatar.png';
  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: comment.user.picture || link }}
        style={styles.userPicture}
      />
      <View style={styles.containerData}>
        <View style={styles.containerLeft}>
          <Text style={styles.description}>{comment.description}</Text>
          <View style={styles.containerUser}>
            <Text style={styles.username}>{comment.user.email}</Text>
            {comment.rating !== null ? (
              <StarRating
                disabled={true}
                maxStars={5}
                rating={comment.rating}
                emptyStar="star-border"
                emptyStarColor={colors.YELLOW}
                fullStar="star"
                fullStarColor={colors.YELLOW}
                iconSet="MaterialIcons"
                starSize={20}
                containerStyle={styles.containerStars}
              />
            ) : null}
          </View>
        </View>
        {canDeleteComment ? (
          <Pressable
            style={styles.pressable}
            onPress={() => deleteComment(comment.id)}
          >
            <Icon
              name="close"
              size={19}
              color={colors.RED}
              style={styles.iconClose}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: { flex: 1 },
  pressable: { marginLeft: 42, paddingTop: 12 },
  containerUser: { flexDirection: 'row' },
  containerData: { flex: 1, flexDirection: 'row', paddingLeft: 12 },
  username: {
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 6,
    marginRight: 6
  },
  description: { marginBottom: 4 },
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY
  },
  userPicture: { width: 45, height: 45, borderRadius: 36 },
  containerStars: {
    width: 100,
    marginTop: 4
  }
});

export default Comment;
