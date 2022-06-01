import React, { useMemo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Category = ({ category }) => {
  const pictureSource = useMemo(() => {
    return category.pictureSrc;
  }, [category]);

  const _openCategoryPage = () => {
    console.log('category.name', category.name);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => _openCategoryPage()}
    >
      <Image source={pictureSource} style={styles.category} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginRight: 13 },
  category: { width: 85, height: 85, borderRadius: 12 }
});

export default Category;
