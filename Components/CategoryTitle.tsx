import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Genie</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default CategoryTitle;
