/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AllProductsDetails } from '../Store/ProductSlice';
import { useNavigation } from '@react-navigation/native';
import { addToCart, selectCartItems } from '../Store/CartSlice';
import { starImgFilled, starImgCorner } from '../Src/APIs/productsAPI';

interface Product {
  discountPercentage: number;
  price: number;
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  images: string;
}

interface RootState {
  product: {
    isLoading: boolean;
    productsData: Product[];
    error: string;
  };
}

const ProductsScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const { isLoading, productsData, error } = useSelector(
    (state: RootState) => state.product,
  );
  const cartItems = useSelector(selectCartItems);
  const [addedToCartItems, setAddedToCartItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(AllProductsDetails());
  }, [dispatch]);

  const handleProductPress = (
    productId: number,
    ProductTitle: string,
    productDescription: string,
    ProductImages: string,
  ) => {
    navigation.navigate('ProductDetailsScreen', {
      productId,
      ProductTitle,
      productDescription,
      ProductImages,
    });
  };

  const addToCartHandler = (
    productId: number,
    ProductTitle: string,
    productDescription: string,
    ProductImages: string,
    ProductPrice: number,
    ProductDiscountPercentage: number,
    ProductRating: number,
  ) => {
    dispatch(
      addToCart({
        productId,
        ProductTitle,
        productDescription,
        ProductImages,
        ProductPrice,
        ProductDiscountPercentage,
        ProductRating,
      }),
    );
    setAddedToCartItems([...addedToCartItems, productId]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleProductPress(
                item.id,
                item.title,
                item.description,
                item.images,
              )
            }>
            <View style={styles.productItem}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.productImage}
              />
              <View style={styles.productContainer}>
                <Text style={styles.productName}>{item.title}</Text>
              </View>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productName}>
                Price: ${item.price}{' '}
                <Text style={styles.strikeThroughtextStyle}>
                  $
                  {Math.floor(
                    item.price + (item.price * item.discountPercentage) / 100,
                  )}
                </Text>{' '}
                <Text style={styles.DiscountPercentage}>
                  {item.discountPercentage}% off
                </Text>
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.productRating}>Rating: {item.rating}</Text>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Image
                    key={index}
                    style={styles.starImage}
                    source={
                      item.rating >= 4.5
                        ? { uri: starImgFilled }
                        : index < Math.floor(item.rating)
                          ? { uri: starImgFilled }
                          : { uri: starImgCorner }
                    }
                  />
                ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  addToCartHandler(
                    item.id,
                    item.title,
                    item.description,
                    item.images,
                    item.price,
                    item.discountPercentage,
                    item.rating,
                  )
                }
                style={styles.addToCartButton}
                disabled={addedToCartItems.includes(item.id)}>
                {addedToCartItems.includes(item.id) ? (
                  <Text style={styles.addedToCartButtonText}>
                    Added to Cart
                  </Text>
                ) : (
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
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
  productItem: {
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: '#6962AD',
    padding: 20,
    borderRadius: 10,
    width: '96%',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ffffff',
  },
  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  strikeThroughtextStyle: {
    textDecorationLine: 'line-through',
    color: '#C3ACD0',
  },
  DiscountPercentage: {
    color: '#C2D9FF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  starImage: {
    width: '8%',
    height: '118%',
    marginLeft: 4,
  },
  productRating: {
    fontSize: 18,
    marginLeft: 5,
    color: '#ffffff',
  },
  productDescription: {
    fontSize: 16,
    color: '#ffffff',
  },
  addToCartButton: {
    backgroundColor: '#362497',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addedToCartButtonText: {
    fontSize: 18,
    color: '#888888',
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
