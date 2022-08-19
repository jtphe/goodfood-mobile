import React, { useMemo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Category = ({ category, styleContainer, styleCategory, onPress }) => {
  const pictureSource = useMemo(() => {
    return category.pictureSrc;
  }, [category]);

  return (
    <TouchableOpacity style={styleContainer} onPress={onPress}>
      <Image source={pictureSource} style={[styleCategory, styles.category]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: { borderRadius: 12 }
});

export default Category;
