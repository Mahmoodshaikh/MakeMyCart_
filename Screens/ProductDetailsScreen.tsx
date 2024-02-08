import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  ProductDetailsScreen: {
    productId: number;
    ProductTitle: string;
    productDescription: string;
    ProductImages: string[];
  };
};

type ProductDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'ProductDetailsScreen'>;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { productId, ProductTitle, productDescription, ProductImages } = route.params;

  const getProductById = (productId: number) => {
    return {
      id: productId,
      name: ProductTitle,
      description: productDescription,
      images: ProductImages
    };
  };


  const product = getProductById(productId);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={true}>
        {product.images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              onLoadStart={() => setLoading(true)}
              onLoad={() => setLoading(false)}
            />
            {loading && <ActivityIndicator style={styles.loader} />}
          </View>
        ))}
      </Swiper>
      <Text style={styles.title}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenWidth * 0.5,
    marginTop: 0,
    marginBottom: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  image: {
    width: screenWidth * 0.99,
    height: screenWidth * 0.85,
    resizeMode: 'cover',
    borderRadius: 4,
    marginTop: 0
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default ProductDetailsScreen;
