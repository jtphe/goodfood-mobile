import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const Category = ({ category, styleContainer, styleCategory, onPress }) => {
  const pictureSource = useMemo(() => {
    return category.pictureSrc;
  }, [category]);

  return (
    <TouchableOpacity style={styleContainer} onPress={onPress}>
      <FastImage
        source={{ uri: pictureSource }}
        style={[styleCategory, styles.category]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: { borderRadius: 12 }
});

export default Category;
