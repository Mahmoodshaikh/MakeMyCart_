import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Store/CategoriesSlice';
import { fetchCategoryData } from '../Store/selectedCategorySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../Store/Store';
import ProductsScreen from './ProductsScreen';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { categories, isLoading, error } = useSelector((state) => state?.categories);


  const [modalVisible, setModalVisible] = useState(true);
  const [storedUsername1, SetStoredUsername1] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryData1, setcategoryData1] = useState<string>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const getUser = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      SetStoredUsername1(storedUsername);
    };
    getUser();
  }, []);


  const handleCategoryPress = (category: string) => {
    dispatch(fetchCategoryData(category));
    setModalVisible(false);
    setCategory(category);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {category && (
        <ProductsScreen />
      )}
      {!category && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}>
            <View style={styles.modalContent}>
              <Text style={styles.welcomeText}>Welcome, {storedUsername1}!</Text>
              <Text style={styles.featuredText}>FEATURED PRODUCTS</Text>
              <FlatList
                data={categories}
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                    <View style={styles.modalCategoryItem}>
                      <Text style={styles.modalCategoryText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E9FF',

  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  featuredText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FC6736',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalCategoryItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#9F70FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 40,
    marginRight: 10,
    height: '40%',
  },
  modalCategoryText: {
    marginTop: 24,
    fontSize: 24,
    color: '#000000',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
  },
  strikeThroughtextStyle: {
    textDecorationLine: 'line-through',
    color: '#C3ACD0',
  },
  DiscountPercentage: {
    color: '#C2D9FF',
  },
});

export default HomeScreen;
